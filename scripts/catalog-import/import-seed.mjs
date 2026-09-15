// Inserts scripts/catalog-import/strength-machines.seed.json into the
// `products` table using an authenticated admin session (RLS requires the
// `authenticated` role for insert; the public anon key alone cannot write).
//
// Usage:
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=yourpassword \
//     node scripts/catalog-import/import-seed.mjs
//
// Credentials are read from environment variables only — never hardcode
// them here or commit them anywhere.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(DIR, "..", "..");

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
    console.error("Sign-in failed:", data.error_description || data.msg || data.error || res.status);
    process.exit(1);
  }
  return data.access_token;
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

async function main() {
  const accessToken = await signIn();
  console.error("Signed in OK.");

  const products = JSON.parse(readFileSync(path.join(DIR, "strength-machines.seed.json"), "utf8"));
  const rows = products.map(({ meta_description, image_alt, ...rest }) => rest);

  const batches = chunk(rows, 20);
  let inserted = 0;
  let failed = 0;

  for (const [idx, batch] of batches.entries()) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
      method: "POST",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal,resolution=merge-duplicates",
      },
      body: JSON.stringify(batch),
    });
    if (res.ok) {
      inserted += batch.length;
      console.error(`Batch ${idx + 1}/${batches.length}: inserted ${batch.length}`);
    } else {
      failed += batch.length;
      const errText = await res.text();
      console.error(`Batch ${idx + 1}/${batches.length} FAILED (${res.status}):`, errText.slice(0, 500));
    }
  }

  console.error(`\nDone. Inserted: ${inserted}, Failed: ${failed}`);
}

main();
