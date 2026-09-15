// Uploads the 6 generic, type-level category images (see
// IMAGE-ATTRIBUTIONS.md for sourcing/licensing) to the `product-images`
// storage bucket, then links each imported product's `images` field by
// subcategory. Requires an authenticated admin session (RLS blocks the
// public anon key from writing to storage or the products table).
//
// Usage:
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=yourpassword \
//     node scripts/catalog-import/upload-category-images.mjs
//
// Expects the resized source images (1600px max width, JPEG q82) in
// scripts/catalog-import/category-images/<file>.jpg
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(DIR, "..", "..");
const IMG_DIR = path.join(DIR, "category-images");

function parseEnv(filePath) {
  const text = readFileSync(filePath, "utf8");
  const out = {};
  for (const line of text.split("\n")) {
    const m = line.match(/^([A-Z_]+)="?([^"]*)"?\s*$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

const env = parseEnv(path.join(REPO_ROOT, ".env"));
const SUPABASE_URL = env.SUPABASE_URL;
const ANON_KEY = env.SUPABASE_PUBLISHABLE_KEY;

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) {
  console.error("Missing ADMIN_EMAIL / ADMIN_PASSWORD env vars");
  process.exit(1);
}

async function signIn() {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Sign-in failed:", data.error_description || data.msg || res.status);
    process.exit(1);
  }
  return data.access_token;
}

const IMAGES = [
  "chest-press-machine.jpg",
  "lat-pulldown-machine.jpg",
  "shoulder-press-machine.jpg",
  "leg-press-machine.jpg",
  "weight-machine.jpg",
  "elliptical-machine.jpg",
];

const SUBCATEGORY_IMAGE = {
  "Chest Press Machines": "categories/chest-press-machine.jpg",
  "Lat Pulldown Machines": "categories/lat-pulldown-machine.jpg",
  "Shoulder Press Machines": "categories/shoulder-press-machine.jpg",
  "Leg Press Machines": "categories/leg-press-machine.jpg",
  "Weight Machines": "categories/weight-machine.jpg",
  Ellipticals: "categories/elliptical-machine.jpg",
  "Cross Trainers": "categories/elliptical-machine.jpg",
};

async function main() {
  const accessToken = await signIn();
  console.error("Signed in OK.");

  for (const file of IMAGES) {
    const bytes = readFileSync(path.join(IMG_DIR, file));
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/product-images/categories/${file}`, {
      method: "POST",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "image/jpeg",
        "x-upsert": "true",
      },
      body: bytes,
    });
    console.error(res.ok ? `Uploaded categories/${file}` : `Upload FAILED for ${file}: ${res.status}`);
  }

  for (const [subcategory, imagePath] of Object.entries(SUBCATEGORY_IMAGE)) {
    const filter = `subcategory=eq.${encodeURIComponent(subcategory)}`;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products?${filter}`, {
      method: "PATCH",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ images: [imagePath] }),
    });
    console.error(res.ok ? `Linked "${subcategory}" -> ${imagePath}` : `Link FAILED for ${subcategory}: ${res.status}`);
  }

  console.error("All done.");
}

main();
