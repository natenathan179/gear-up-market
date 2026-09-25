// Generates a Google Merchant Center product feed (tab-delimited text
// format) from the live Supabase catalog — the same source of truth the
// site itself renders from, so the feed never drifts from what a shopper
// actually sees on the product page.
//
// Output: public/google-merchant-feed.txt, served at
// https://gymequipmentmarketplace.com/google-merchant-feed.txt once
// deployed. That's the URL to enter under Merchant Center > Products >
// Feeds > add feed > Scheduled fetch, so it's picked up automatically on
// whatever schedule you set there rather than needing a manual re-upload
// every time the catalog changes.
//
// Column reference: https://support.google.com/merchants/answer/7052112
//
// Image URLs: today every listing's photos are Lovable-hosted assets, which
// resolve to a stable absolute URL (resolveLovableAssetPath) with no
// expiry. Any photo uploaded straight to the private Supabase Storage
// bucket instead would resolve to a signed URL valid for only 7 days (the
// same signing the product pages themselves use — see SIGNED_URL_TTL in
// src/lib/product-utils.ts). Google re-fetches feed images periodically;
// as long as this script reruns (via `bun run build`) at least that often,
// regenerated links stay ahead of expiry. A site that goes a full week
// without a rebuild would have stale image links until the next deploy.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import {
  PRODUCT_BUCKET,
  SIGNED_URL_TTL,
  parseSpecs,
  resizedImageUrl,
  resolveImagePaths,
  type ProductRow,
} from "@/lib/product-utils";
import { categoryBySlug } from "@/data/catalog";
import { canonicalUrl } from "@/lib/seo";

const MERCHANT_FEED_COLUMNS = [
  "id",
  "title",
  "description",
  "link",
  "image_link",
  "additional_image_link",
  "availability",
  "price",
  "condition",
  "brand",
  "mpn",
  "product_type",
  "google_product_category",
] as const;

// Google's text feed format is TSV, so any tab/newline inside a value would
// silently misalign every column after it — flatten to single-line, single-
// spaced text instead of just stripping tabs.
function tsvSafe(value: string): string {
  return value.replace(/[\t\r\n]+/g, " ").trim();
}

function toAvailability(available: boolean): "in_stock" | "out_of_stock" {
  return available ? "in_stock" : "out_of_stock";
}

// Google only accepts new/used/refurbished. The catalog's finer-grained
// used conditions (Excellent/Very Good/Good) all describe pre-owned
// equipment, so they collapse to "used" for Merchant Center's purposes —
// the actual condition detail still lives in the listing's own description.
function toMerchantCondition(condition: Database["public"]["Enums"]["product_condition"]): string {
  if (condition === "New") return "new";
  if (condition === "Refurbished") return "refurbished";
  return "used";
}

async function fetchAllProducts(): Promise<ProductRow[]> {
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    console.error("Missing Supabase env vars — merchant feed will be empty.");
    return [];
  }
  const supabase = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.from("products").select("*").order("slug");
  if (error || !data) {
    console.error("Failed to fetch products for merchant feed:", error?.message);
    return [];
  }

  // Storage paths need signing before they're publicly fetchable by Google;
  // URLs that are already absolute (Lovable-hosted assets) pass through.
  const allPaths = data.flatMap((row) => row.images ?? []);
  const storagePaths = [...new Set(allPaths)].filter(
    (p) => p && !p.startsWith("http") && !p.startsWith("/"),
  );
  const signed = new Map<string, string>();
  if (storagePaths.length > 0) {
    const { data: signedUrls } = await supabase.storage
      .from(PRODUCT_BUCKET)
      .createSignedUrls(storagePaths, SIGNED_URL_TTL);
    for (const entry of signedUrls ?? []) {
      if (entry.path && entry.signedUrl) signed.set(entry.path, entry.signedUrl);
    }
  }

  // Stash resolved image URLs back onto each row so the row-to-feed mapping
  // below doesn't need the signed map threaded through separately.
  // resolveImagePaths handles both cases: signing storage paths and
  // rewriting Lovable-hosted asset paths to their absolute preview-host
  // URL — the same resolution the product pages themselves render.
  return data.map((row) => ({
    ...row,
    images: resolveImagePaths(row.images ?? [], signed),
  }));
}

function productType(row: ProductRow): string {
  const category = categoryBySlug(row.category);
  return tsvSafe(`${category?.name ?? row.category} > ${row.subcategory}`);
}

function rowToFeedLine(row: ProductRow): string {
  const images = row.images.filter(Boolean).map((url) => resizedImageUrl(url, 1600));
  const [primaryImage, ...rest] = images;
  const specsSummary = parseSpecs(row.specs)
    .map((s) => `${s.label}: ${s.value}`)
    .join(". ");
  // row.description already ends in its own punctuation, so joining with
  // ". " (rather than a bare space) would double up the period.
  const description = [row.description.trim().replace(/\.+$/, ""), specsSummary]
    .filter(Boolean)
    .join(". ");

  const fields: Record<(typeof MERCHANT_FEED_COLUMNS)[number], string> = {
    // Google caps `id` at 50 characters and requires it to stay stable
    // across feed updates — several slugs (e.g. long brand + machine-type
    // combinations) already exceed that, and slug length only grows as
    // more descriptive titles get added. The row's own UUID is short,
    // permanent and guaranteed unique, so it isn't subject to either
    // problem; the human-readable slug still drives the actual page URL
    // below via `link`.
    id: row.id,
    // Google truncates/rejects title beyond 150 chars and description
    // beyond 5000 — clip defensively rather than let occasional long
    // titles or spec-heavy descriptions get silently mangled on upload.
    title: tsvSafe(row.title).slice(0, 150),
    description: tsvSafe(description).slice(0, 5000),
    link: canonicalUrl(`/equipment/${row.slug}`),
    image_link: primaryImage ?? "",
    additional_image_link: rest.slice(0, 10).join(","),
    availability: toAvailability(row.available),
    price: `${row.price.toFixed(2)} USD`,
    condition: toMerchantCondition(row.condition),
    brand: tsvSafe(row.brand),
    mpn: tsvSafe(row.model),
    product_type: productType(row),
    google_product_category: "Sporting Goods > Exercise & Fitness",
  };

  return MERCHANT_FEED_COLUMNS.map((col) => fields[col]).join("\t");
}

async function main() {
  const products = await fetchAllProducts();
  const withImages = products.filter((p) => p.images.some(Boolean));
  const withoutImages = products.length - withImages.length;

  const lines = [MERCHANT_FEED_COLUMNS.join("\t"), ...withImages.map(rowToFeedLine)];
  const outPath = resolve(import.meta.dirname, "..", "public", "google-merchant-feed.txt");
  writeFileSync(outPath, lines.join("\n") + "\n");

  console.log(`Wrote ${withImages.length} products to ${outPath}`);
  if (withoutImages > 0) {
    console.log(
      `Skipped ${withoutImages} product(s) with no resolvable image — Merchant Center requires image_link.`,
    );
  }
}

main();
