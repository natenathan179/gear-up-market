import type { ProductSummary } from "@/lib/product-utils";
import { allTypes, departments, unbrandedSlugs } from "@/lib/taxonomy";

/**
 * Used Gym Equipment Price Index — summary statistics computed live from the
 * marketplace's own listings. Everything here is derived from asking prices
 * currently on the site, so the page stays accurate as inventory changes and
 * never states a figure we can't back with listings.
 */

// Listings priced per pound/each (plates, dumbbells, small kettlebells) carry
// unit prices like $1 that would drag every median toward zero.
const MIN_PRICE = 25;

/** Smallest group we publish a median for — one listing isn't a "price". */
export const MIN_GROUP_SIZE = 3;

export interface PriceStats {
  key: string;
  label: string;
  href?: string | undefined;
  count: number;
  median: number;
  low: number;
  high: number;
}

export interface PriceIndex {
  totalListings: number;
  overallMedian: number;
  byDepartment: PriceStats[];
  byType: PriceStats[];
  byBrand: PriceStats[];
  commercialMedian: number | null;
  homeMedian: number | null;
}

function median(sorted: number[]): number {
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2;
}

function stats(key: string, label: string, prices: number[], href?: string): PriceStats {
  const sorted = [...prices].sort((a, b) => a - b);
  return {
    key,
    label,
    href,
    count: sorted.length,
    median: Math.round(median(sorted)),
    low: Math.round(sorted[0]!),
    high: Math.round(sorted[sorted.length - 1]!),
  };
}

function grouped(
  items: ProductSummary[],
  keyOf: (p: ProductSummary) => string | null,
  describe: (key: string, sample: ProductSummary) => { label: string; href?: string | undefined },
): PriceStats[] {
  const groups = new Map<string, ProductSummary[]>();
  for (const p of items) {
    const k = keyOf(p);
    if (!k) continue;
    const list = groups.get(k);
    if (list) list.push(p);
    else groups.set(k, [p]);
  }
  return [...groups.entries()]
    .filter(([, list]) => list.length >= MIN_GROUP_SIZE)
    .map(([k, list]) => {
      const { label, href } = describe(k, list[0]!);
      return stats(
        k,
        label,
        list.map((p) => p.price),
        href,
      );
    })
    .sort((a, b) => b.count - a.count || b.median - a.median);
}

export function buildPriceIndex(products: ProductSummary[]): PriceIndex {
  const items = products.filter(
    (p) => p.department !== "supplements" && p.category !== "supplements" && p.price >= MIN_PRICE,
  );
  const prices = items.map((p) => p.price).sort((a, b) => a - b);

  const typeName = new Map(allTypes.map((t) => [`${t.department}/${t.slug}`, t]));
  const deptName = new Map(departments.map((d) => [d.slug, d.name]));

  const byUsage = (usage: string) => {
    const list = items
      .filter((p) => p.usage === usage)
      .map((p) => p.price)
      .sort((a, b) => a - b);
    return list.length >= MIN_GROUP_SIZE ? Math.round(median(list)) : null;
  };

  return {
    totalListings: items.length,
    overallMedian: prices.length ? Math.round(median(prices)) : 0,
    byDepartment: grouped(
      items,
      (p) => p.department,
      (k) => ({ label: deptName.get(k as never) ?? k, href: `/${k}` }),
    ),
    byType: grouped(
      items,
      (p) => (p.department && p.typeSlug ? `${p.department}/${p.typeSlug}` : null),
      (k) => {
        const t = typeName.get(k);
        return { label: t?.name ?? k, href: t ? `/${k}` : undefined };
      },
    ),
    byBrand: grouped(
      items,
      (p) => (unbrandedSlugs.has(p.brandSlug) ? null : p.brand.toLowerCase()),
      (_k, sample) => ({ label: sample.brand, href: `/brands/${sample.brandSlug}` }),
    ),
    commercialMedian: byUsage("Commercial"),
    homeMedian: byUsage("Home"),
  };
}

export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
