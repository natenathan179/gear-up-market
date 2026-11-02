import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Breadcrumbs,
  FaqList,
  PageHeader,
  SectionHeading,
  faqSchema,
} from "@/components/site/Bits";
import { EquipmentBrowser } from "@/components/site/EquipmentBrowser";
import { categories, guides, type Category } from "@/data/catalog";
import { canonicalUrl, hreflangLinks } from "@/lib/seo";
import { countries, type CountryCode } from "@/lib/region";
import { useRegion } from "@/lib/region-context";
import { productsQueryOptions } from "@/lib/queries";
import {
  departmentBySlug,
  equipmentDepartments,
  matchesCollection,
  usageForCollection,
  type Department,
} from "@/lib/taxonomy";
import { buildBrandDirectory } from "@/lib/brands";

// Equipment-type links with live counts. On a usage collection (Home /
// Commercial) every department is shown, and each link carries the usage
// filter through to the type page.
function TypeLinks({
  department,
  usage,
  prefix,
  heading,
}: {
  heading?: boolean;
  department: Department;
  usage?: "Commercial" | "Home" | undefined;
  prefix: string;
}) {
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  const counts = new Map<string, number>();
  for (const p of products) {
    if (p.department !== department.slug || (usage && p.usage !== usage)) continue;
    counts.set(p.typeSlug, (counts.get(p.typeSlug) ?? 0) + 1);
  }
  const types = department.types.filter((t) => counts.has(t.slug));
  if (types.length === 0) return null;
  const list = (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {types.map((t) => (
        <li key={t.slug}>
          <Link
            to={`${prefix}/${department.slug}/${t.slug}` as never}
            search={(usage ? { usage } : {}) as never}
            className="flex items-center justify-between gap-2 border border-border px-3 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            <span>{t.short}</span>
            <span className="text-xs text-muted-foreground">{counts.get(t.slug)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
  if (!heading) return list;
  return (
    <div>
      <h3 className="mb-2 text-xs font-bold tracking-wide text-muted-foreground uppercase">
        {department.name}
      </h3>
      {list}
    </div>
  );
}

export function CategoryPage({ category }: { category: Category }) {
  const region = useRegion();
  const prefix = countries[region].prefix;
  const others = categories.filter((c) => c.slug !== category.slug);
  const department = departmentBySlug(category.slug);
  const usage = usageForCollection(category.slug);
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  const topBrands = buildBrandDirectory(products.filter((p) => matchesCollection(p, category.slug)))
    .filter((b) => b.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 16);
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Shop Equipment", to: `${prefix}/shop-equipment` },
          { label: category.name },
        ]}
      />
      <PageHeader
        eyebrow="Gym Equipment Marketplace"
        h1={category.h1}
        intro={category.intro}
        image={category.image}
      />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeading title={`Shop ${category.name} by Type`} as="h2" />
        {department ? (
          <TypeLinks department={department} prefix={prefix} />
        ) : (
          <div className="space-y-6">
            {equipmentDepartments.map((d) => (
              <TypeLinks key={d.slug} heading department={d} usage={usage} prefix={prefix} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <SectionHeading title={`${category.name} Listings`} as="h2" />
        <EquipmentBrowser
          {...(department ? { lockDepartment: department.slug } : {})}
          {...(usage ? { lockUsage: usage } : {})}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="space-y-10">
          {category.body.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-3 max-w-3xl space-y-3 text-sm text-muted-foreground">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={`${category.name} by Brand`}
            href="/brands"
            linkLabel="View All Brands"
            as="h2"
          />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {topBrands.map((b) => (
              <li key={b.slug}>
                <Link
                  to="/brands/$slug"
                  params={{ slug: b.slug }}
                  className="flex h-16 items-center justify-center border border-border bg-card px-2 text-center text-xs font-bold tracking-wide uppercase transition-colors hover:border-primary hover:text-primary"
                >
                  <span>
                    {b.name}
                    <span className="mt-0.5 block text-[10px] font-medium text-muted-foreground normal-case">
                      {b.count} {b.count === 1 ? "listing" : "listings"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <SectionHeading title="Popular Searches" as="h2" />
        <ul className="flex flex-wrap gap-2 text-sm">
          {category.keywords.map((k) => (
            <li key={k}>
              <Link
                to={`${prefix}/shop-equipment` as never}
                search={{ q: k } as never}
                className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
              >
                {k}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <FaqList faqs={category.faqs} title={`${category.name} FAQs`} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading title="Related Categories & Guides" as="h2" />
        <div className="grid gap-8 md:grid-cols-2">
          <ul className="space-y-2 text-sm">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`${prefix}/${c.slug}` as never}
                  className="font-medium text-primary hover:underline"
                >
                  {c.name}
                </Link>
                <span className="text-muted-foreground"> — {c.blurb}</span>
              </li>
            ))}
            <li>
              <Link to="/used-gym-equipment" className="font-medium text-primary hover:underline">
                Used Gym Equipment
              </Link>
              <span className="text-muted-foreground"> — Pre-owned and refurbished machines</span>
            </li>
          </ul>
          <ul className="space-y-2 text-sm">
            {guides.slice(0, 5).map((g) => (
              <li key={g.slug}>
                <Link
                  to="/fitness-equipment-guide/$slug"
                  params={{ slug: g.slug }}
                  className="font-medium text-primary hover:underline"
                >
                  {g.title}
                </Link>
                <span className="text-muted-foreground"> — {g.readTime}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export function categoryHead(
  slug: string,
  title: string,
  description: string,
  faqs: { q: string; a: string }[] = [],
) {
  return () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `/${slug}` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: canonicalUrl(`/${slug}`) },
      ...hreflangLinks({ us: `/${slug}`, ca: `/ca/${slug}`, uk: `/uk/${slug}` }),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: title, item: `/${slug}` },
          ],
        }),
      },
      ...faqSchema(faqs),
    ],
  });
}

// Head builder for the /ca and /uk versions of a category page — same shape
// as categoryHead, but the canonical points at the country-prefixed path and
// the title/description should already be annotated for that market by the
// caller (e.g. "— Ships to Canada").
export function countryCategoryHead(
  country: Extract<CountryCode, "ca" | "uk">,
  slug: string,
  title: string,
  description: string,
  faqs: { q: string; a: string }[] = [],
) {
  const path = `${countries[country].prefix}/${slug}`;
  return () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: canonicalUrl(path) },
      ...hreflangLinks({ us: `/${slug}`, ca: `/ca/${slug}`, uk: `/uk/${slug}` }),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: countries[country].prefix || "/",
            },
            { "@type": "ListItem", position: 2, name: title, item: path },
          ],
        }),
      },
      ...faqSchema(faqs),
    ],
  });
}
