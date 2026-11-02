import { brandBySlug, brands as editorialBrands, type Brand } from "@/data/catalog";
import type { ProductSummary } from "@/lib/product-utils";
import { allTypes, unbrandedSlugs, type EquipmentType } from "@/lib/taxonomy";

// The hand-written brand profiles in data/catalog.ts only cover eight
// manufacturers, but the live inventory carries 50+. Every brand with stock
// gets a page; the editorial profile is layered on where one exists, and a
// profile generated from that brand's actual inventory fills in otherwise.

export interface BrandEntry {
  slug: string;
  name: string;
  count: number;
  /** Equipment types this brand has in stock, most listings first. */
  types: { type: EquipmentType; count: number }[];
  profile: Brand;
  editorial: boolean;
}

function generatedProfile(
  slug: string,
  name: string,
  items: ProductSummary[],
  types: BrandEntry["types"],
): Brand {
  const commercial = items.filter((p) => p.usage === "Commercial").length;
  const bestFor: Brand["bestFor"] =
    commercial === items.length ? "Commercial" : commercial === 0 ? "Home" : "Both";
  const typeList = types
    .slice(0, 3)
    .map((t) => t.type.short.toLowerCase())
    .join(", ");
  return {
    slug,
    name,
    intro: `Browse ${items.length} new and used ${name} ${items.length === 1 ? "listing" : "listings"} from verified sellers${typeList ? `, including ${typeList}` : ""}. Compare condition, price and location, then enquire or request a freight quote directly from the listing.`,
    popularModels: [],
    bestFor,
    bestForNote:
      bestFor === "Commercial"
        ? `Every ${name} listing currently on the marketplace is commercial-grade equipment built for multi-user facilities.`
        : bestFor === "Home"
          ? `${name} listings on the marketplace are built for home and garage gyms.`
          : `${name} listings span both commercial-grade and home equipment.`,
    faqs: [
      {
        q: `Is used ${name} equipment worth buying?`,
        a: `Used commercial strength and cardio equipment is built to run for years in busy facilities, so a well-maintained ${name} unit typically costs a fraction of new while offering the same frame and build quality. Check the listing's condition grade and photos, and ask the seller about service history before you buy.`,
      },
      {
        q: `How is ${name} equipment shipped?`,
        a: `Most ${name} machines ship by freight on a pallet or crated, with curbside, liftgate or inside delivery available depending on the seller. Request a quote from the listing and the seller will confirm freight cost and lead time to your address.`,
      },
    ],
  };
}

export function buildBrandDirectory(products: ProductSummary[]): BrandEntry[] {
  const bySlug = new Map<string, ProductSummary[]>();
  for (const p of products) {
    if (unbrandedSlugs.has(p.brandSlug)) continue;
    const list = bySlug.get(p.brandSlug) ?? [];
    list.push(p);
    bySlug.set(p.brandSlug, list);
  }
  const typeIndex = new Map(allTypes.map((t) => [`${t.department}/${t.slug}`, t]));

  const entries: BrandEntry[] = [];
  const seen = new Set<string>();
  const add = (slug: string, items: ProductSummary[]) => {
    seen.add(slug);
    const typeCounts = new Map<string, number>();
    for (const p of items) {
      const k = `${p.department}/${p.typeSlug}`;
      typeCounts.set(k, (typeCounts.get(k) ?? 0) + 1);
    }
    const types = [...typeCounts.entries()]
      .map(([k, count]) => ({ type: typeIndex.get(k)!, count }))
      .filter((t) => t.type)
      .sort((a, b) => b.count - a.count);
    const editorial = brandBySlug(slug);
    const name = editorial?.name ?? items[0]?.brand ?? slug;
    entries.push({
      slug,
      name,
      count: items.length,
      types,
      profile: editorial ?? generatedProfile(slug, name, items, types),
      editorial: Boolean(editorial),
    });
  };
  for (const [slug, items] of bySlug) add(slug, items);
  // Editorial brands keep their page even while out of stock.
  for (const b of editorialBrands) if (!seen.has(b.slug)) add(b.slug, []);
  return entries.sort((a, b) => a.name.localeCompare(b.name));
}

export function findBrand(products: ProductSummary[], slug: string): BrandEntry | undefined {
  return buildBrandDirectory(products).find((b) => b.slug === slug);
}
