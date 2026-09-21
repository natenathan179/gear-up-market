// Generates public/sitemap.xml from the site's own route data so it never
// drifts from what's actually deployed. Run as part of the build (see
// package.json "build" script) — output lands in public/ before Vite copies
// public/ into the final asset output.
//
// Product slugs come from Supabase directly rather than catalog.ts's static
// `listings` array: that array is leftover sample/seed data from before the
// catalog moved to Supabase, never rendered by the app, and had drifted
// completely from the live inventory — every /equipment/<slug> URL it
// produced 404'd, and they were the only equipment pages in the sitemap at
// all (the app's real ~140 live products weren't in it).
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { categories, brands, guides, locations, solutions } from "@/data/catalog";
import { blogPosts } from "@/data/blog";
import { SITE_URL } from "@/lib/seo";

async function fetchProductSlugs(): Promise<string[]> {
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    console.error("Missing Supabase env vars — sitemap will omit product pages.");
    return [];
  }
  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await supabase.from("products").select("slug");
  if (error || !data) {
    console.error("Failed to fetch product slugs for sitemap:", error?.message);
    return [];
  }
  return data.map((row) => row.slug as string);
}

const staticPaths = [
  "/",
  "/shop-equipment",
  "/used-gym-equipment",
  "/commercial-gym-equipment",
  "/home-gym-equipment",
  "/cardio-equipment",
  "/strength-equipment",
  "/free-weights",
  "/gym-accessories",
  "/brands",
  "/blog",
  "/fitness-equipment-guide",
  "/sell-your-equipment",
  "/about",
  "/reviews",
  "/faq",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/returns-and-refunds",
  "/shipping-information",
];

async function main() {
  const paths = new Set<string>(staticPaths);

  for (const c of categories) paths.add(`/${c.slug}`);
  for (const b of brands) paths.add(`/brands/${b.slug}`);
  for (const g of guides) paths.add(`/fitness-equipment-guide/${g.slug}`);
  for (const l of locations) paths.add(`/gym-equipment-for-sale/${l.slug}`);
  for (const s of solutions) paths.add(`/commercial-gym-equipment/${s.slug}`);
  for (const p of blogPosts) paths.add(`/blog/${p.slug}`);

  const productSlugs = await fetchProductSlugs();
  for (const slug of productSlugs) paths.add(`/equipment/${slug}`);

  const urls = [...paths].sort();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join("\n")}
</urlset>
`;

  const outPath = resolve(import.meta.dirname, "..", "public", "sitemap.xml");
  writeFileSync(outPath, xml);
  console.log(`Wrote ${urls.length} URLs to ${outPath} (${productSlugs.length} live products)`);
}

main();
