import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader, SectionHeading } from "@/components/site/Bits";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Brand } from "@/data/catalog";
import { EquipmentBrowser } from "@/components/site/EquipmentBrowser";
import { buildBrandDirectory, findBrand } from "@/lib/brands";
import { productsQueryOptions } from "@/lib/queries";
import brandImg from "@/assets/cat-strength.avif";
import { canonicalUrl } from "@/lib/seo";

export const Route = createFileRoute("/brands/$slug")({
  loader: async ({ params, context }) => {
    const products = await context.queryClient.ensureQueryData(productsQueryOptions);
    const entry = findBrand(products, params.slug);
    if (!entry) throw notFound();
    return { brand: entry.profile, count: entry.count };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const name = loaderData.brand.name;
    const title = `${name} Gym Equipment for Sale – New & Used`;
    const description = `Shop new and used ${name} gym equipment for sale. Compare popular ${name} models, condition, price and location from verified sellers.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/brands/${params.slug}` },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        // An out-of-stock brand page is thin — reachable, but not indexed.
        ...(loaderData.count === 0 ? [{ name: "robots", content: "noindex, follow" }] : []),
      ],
      links: [{ rel: "canonical", href: canonicalUrl(`/brands/${params.slug}`) }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Brands", item: "/brands" },
              { "@type": "ListItem", position: 3, name, item: `/brands/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  component: BrandPage,
});

const bestForCopy: Record<Brand["bestFor"], { label: string; className: string }> = {
  Commercial: { label: "Best for Commercial", className: "bg-charcoal text-charcoal-foreground" },
  Home: { label: "Best for Home", className: "bg-primary text-primary-foreground" },
  Both: {
    label: "Best for Home & Commercial",
    className: "bg-secondary text-foreground border border-border",
  },
};

function BrandPage() {
  const { brand } = Route.useLoaderData();
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  const directory = buildBrandDirectory(products);
  const entry = directory.find((b) => b.slug === brand.slug);
  const items = products.filter((l) => l.brandSlug === brand.slug);
  const bestFor = bestForCopy[brand.bestFor];

  return (
    <>
      <Breadcrumbs items={[{ label: "Brands", to: "/brands" }, { label: brand.name }]} />
      <PageHeader
        eyebrow="Brand"
        h1={`${brand.name} Gym Equipment for Sale`}
        intro={brand.intro}
        image={brandImg}
      />

      <section className="mx-auto max-w-7xl px-4 pt-8">
        <div className="flex flex-wrap items-center gap-3 border border-border bg-card p-5">
          <span
            className={`inline-block px-2.5 py-1 text-xs font-bold tracking-wide uppercase ${bestFor.className}`}
          >
            {bestFor.label}
          </span>
          <p className="text-sm text-muted-foreground">{brand.bestForNote}</p>
        </div>
      </section>

      {entry && entry.types.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-10">
          <SectionHeading title={`Shop ${brand.name} by Equipment Type`} as="h2" />
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {entry.types.map(({ type, count }) => (
              <li key={`${type.department}/${type.slug}`}>
                <Link
                  to={`/${type.department}/${type.slug}` as never}
                  search={{ brand: brand.slug } as never}
                  className="flex items-center justify-between gap-2 border border-border px-3 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  <span>
                    {brand.name} {type.short}
                  </span>
                  <span className="text-xs text-muted-foreground">{count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeading title={`${brand.name} Listings`} as="h2" />
        {items.length > 0 ? (
          <EquipmentBrowser pool={items} />
        ) : (
          <p className="border border-border p-6 text-sm text-muted-foreground">
            No {brand.name} equipment is listed right now. New stock arrives regularly —{" "}
            <Link to="/contact" className="text-primary hover:underline">
              tell us what you're looking for
            </Link>{" "}
            and we'll match you with a seller.
          </p>
        )}
      </section>

      {brand.popularModels.length > 0 && (
        <section className="bg-secondary py-12">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading title={`Popular ${brand.name} Models`} as="h2" />
            <ul className="flex flex-wrap gap-2 text-sm">
              {brand.popularModels.map((m) => (
                <li key={m}>
                  <Link
                    to="/shop-equipment"
                    search={{ q: m }}
                    className="inline-block border border-border bg-card px-3 py-2 font-medium hover:border-primary hover:text-primary"
                  >
                    {brand.name} {m}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading title={`${brand.name} FAQs`} as="h2" />
        <dl className="grid gap-4 md:grid-cols-2">
          {brand.faqs.map((f) => (
            <div key={f.q} className="border border-border p-5">
              <dt className="text-sm font-bold text-foreground">{f.q}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
        <h2 className="font-display mt-10 text-lg font-bold text-foreground">Other Brands</h2>
        <ul className="mt-3 flex flex-wrap gap-2 text-sm">
          {directory
            .filter((b) => b.slug !== brand.slug && b.count > 0)
            .map((b) => (
              <li key={b.slug}>
                <Link
                  to="/brands/$slug"
                  params={{ slug: b.slug }}
                  className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
                >
                  {b.name}
                </Link>
              </li>
            ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          <Link to="/brands" className="text-primary hover:underline">
            Compare all brands and see which is best for home or commercial use →
          </Link>
        </p>
      </section>
    </>
  );
}
