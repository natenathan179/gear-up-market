// Generates public/sitemap.xml from the site's own route data so it never
// drifts from what's actually deployed. Run as part of the build (see
// package.json "build" script) — output lands in public/ before Vite copies
// public/ into the final asset output.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { categories, brands, guides, locations, listings, solutions } from "@/data/catalog";
import { blogPosts } from "@/data/blog";
import { SITE_URL } from "@/lib/seo";

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

const paths = new Set<string>(staticPaths);

for (const c of categories) paths.add(`/${c.slug}`);
for (const b of brands) paths.add(`/brands/${b.slug}`);
for (const g of guides) paths.add(`/fitness-equipment-guide/${g.slug}`);
for (const l of locations) paths.add(`/gym-equipment-for-sale/${l.slug}`);
for (const s of solutions) paths.add(`/commercial-gym-equipment/${s.slug}`);
for (const p of blogPosts) paths.add(`/blog/${p.slug}`);
for (const p of listings) paths.add(`/equipment/${p.slug}`);

const urls = [...paths].sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join("\n")}
</urlset>
`;

const outPath = resolve(import.meta.dirname, "..", "public", "sitemap.xml");
writeFileSync(outPath, xml);
console.log(`Wrote ${urls.length} URLs to ${outPath}`);
