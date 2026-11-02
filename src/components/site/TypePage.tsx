import { Link, notFound } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Breadcrumbs, PageHeader, SectionHeading } from "@/components/site/Bits";
import { EquipmentBrowser } from "@/components/site/EquipmentBrowser";
import { categoryBySlug } from "@/data/catalog";
import { productsQueryOptions } from "@/lib/queries";
import { countries, type CountryCode } from "@/lib/region";
import { useRegion } from "@/lib/region-context";
import { canonicalUrl, hreflangLinks } from "@/lib/seo";
import { departmentBySlug, typeBySlug, unbrandedSlugs } from "@/lib/taxonomy";

/**
 * Shared loader for /<department>/<type> pages (and their /ca, /uk
 * variants). Throws notFound for anything outside the taxonomy so typos and
 * retired types 404 instead of rendering an empty shell.
 */
export async function loadTypePage(
  queryClient: QueryClient,
  departmentSlug: string,
  typeSlug: string,
) {
  const department = departmentBySlug(departmentSlug);
  const type = typeBySlug(departmentSlug, typeSlug);
  if (!department || !type) throw notFound();
  const products = await queryClient.ensureQueryData(productsQueryOptions);
  const count = products.filter(
    (p) => p.department === department.slug && p.typeSlug === type.slug,
  ).length;
  return { departmentSlug: department.slug, typeSlug: type.slug, count };
}

type TypeLoaderData = Awaited<ReturnType<typeof loadTypePage>>;

export function typeHead(country: CountryCode, data: TypeLoaderData | undefined) {
  if (!data) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
  const department = departmentBySlug(data.departmentSlug)!;
  const type = typeBySlug(data.departmentSlug, data.typeSlug)!;
  const usPath = `/${department.slug}/${type.slug}`;
  const path = `${countries[country].prefix}${usPath}`;
  const market =
    country === "ca"
      ? " – Ships to Canada"
      : country === "uk"
        ? " – Ships to the UK"
        : " – New & Used";
  const title = `${type.name} for Sale${market} | Gym Equipment Marketplace`;
  const description = `${type.intro} Compare ${data.count > 0 ? `${data.count} ` : ""}listings by brand, condition, price and location.`;
  const home = countries[country].prefix || "/";
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      // An empty type page is thin content — keep it reachable but unindexed
      // until inventory arrives.
      ...(data.count === 0 ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [
      { rel: "canonical", href: canonicalUrl(path) },
      ...hreflangLinks({ us: usPath, ca: `/ca${usPath}`, uk: `/uk${usPath}` }),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl(home) },
            {
              "@type": "ListItem",
              position: 2,
              name: department.name,
              item: canonicalUrl(`${countries[country].prefix}/${department.slug}`),
            },
            { "@type": "ListItem", position: 3, name: type.name, item: canonicalUrl(path) },
          ],
        }),
      },
    ],
  };
}

export function TypePage({
  departmentSlug,
  typeSlug,
}: {
  departmentSlug: string;
  typeSlug: string;
}) {
  const region = useRegion();
  const prefix = countries[region].prefix;
  const department = departmentBySlug(departmentSlug)!;
  const type = typeBySlug(departmentSlug, typeSlug)!;
  const category = categoryBySlug(department.slug);
  const { data: products } = useSuspenseQuery(productsQueryOptions);

  const inDepartment = products.filter((p) => p.department === department.slug);
  const items = inDepartment.filter((p) => p.typeSlug === type.slug);
  const siblingCounts = new Map<string, number>();
  for (const p of inDepartment)
    siblingCounts.set(p.typeSlug, (siblingCounts.get(p.typeSlug) ?? 0) + 1);
  const siblings = department.types.filter(
    (t) => t.slug !== type.slug && siblingCounts.has(t.slug),
  );

  const brandCounts = new Map<string, { name: string; count: number }>();
  for (const p of items) {
    if (unbrandedSlugs.has(p.brandSlug)) continue;
    const entry = brandCounts.get(p.brandSlug) ?? { name: p.brand, count: 0 };
    entry.count++;
    brandCounts.set(p.brandSlug, entry);
  }
  const topBrands = [...brandCounts.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 12);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Shop Equipment", to: `${prefix}/shop-equipment` },
          { label: department.name, to: `${prefix}/${department.slug}` },
          { label: type.name },
        ]}
      />
      <PageHeader
        eyebrow={department.name}
        h1={`${type.name} for Sale`}
        intro={`${type.intro} Compare new, refurbished and used equipment by brand, condition, price and location.`}
        {...(category ? { image: category.image } : {})}
      />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <EquipmentBrowser lockDepartment={department.slug} lockType={type.slug} />
      </section>

      {topBrands.length > 0 && (
        <section className="bg-secondary py-12">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading title={`${type.short} by Brand`} as="h2" />
            <ul className="flex flex-wrap gap-2 text-sm">
              {topBrands.map(([slug, b]) => (
                <li key={slug}>
                  <Link
                    to="/brands/$slug"
                    params={{ slug }}
                    className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 font-medium hover:border-primary hover:text-primary"
                  >
                    {b.name}
                    <span className="text-xs text-muted-foreground">{b.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {siblings.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12">
          <SectionHeading
            title={`More ${department.name}`}
            href={`${prefix}/${department.slug}`}
            linkLabel={`All ${department.short}`}
            as="h2"
          />
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {siblings.map((t) => (
              <li key={t.slug}>
                <Link
                  to={`${prefix}/${department.slug}/${t.slug}` as never}
                  className="flex items-center justify-between gap-2 border border-border px-3 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  <span>{t.short}</span>
                  <span className="text-xs text-muted-foreground">{siblingCounts.get(t.slug)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
