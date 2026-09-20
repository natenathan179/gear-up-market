import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs, ListingCard, PageHeader, SectionHeading } from "@/components/site/Bits";
import { useSuspenseQuery } from "@tanstack/react-query";
import { brandBySlug, brands, categories, type Brand } from "@/data/catalog";
import { productsQueryOptions } from "@/lib/queries";
import brandImg from "@/assets/cat-strength.avif";

export const Route = createFileRoute("/brands/$slug")({
  loader: ({ params }) => {
    const brand = brandBySlug(params.slug);
    if (!brand) throw notFound();
    return { brand };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const name = loaderData.brand.name;
    const title = `${name} Gym Equipment for Sale | Gym Equipment Marketplace`;
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
      ],
      links: [{ rel: "canonical", href: `/brands/${params.slug}` }],
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
  Both: { label: "Best for Home & Commercial", className: "bg-secondary text-foreground border border-border" },
};

function BrandPage() {
  const { brand } = Route.useLoaderData();
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  const items = products.filter((l) => l.brandSlug === brand.slug);
  const newItems = items.filter((l) => l.condition === "New");
  const usedItems = items.filter((l) => l.condition !== "New");
  const bestFor = bestForCopy[brand.bestFor];

  return (
    <>
      <Breadcrumbs items={[{ label: "Brands", to: "/brands" }, { label: brand.name }]} />
      <PageHeader eyebrow="Brand" h1={`${brand.name} Gym Equipment for Sale`} intro={brand.intro} image={brandImg} />

      <section className="mx-auto max-w-7xl px-4 pt-8">
        <div className="flex flex-wrap items-center gap-3 border border-border bg-card p-5">
          <span className={`inline-block px-2.5 py-1 text-xs font-bold tracking-wide uppercase ${bestFor.className}`}>
            {bestFor.label}
          </span>
          <p className="text-sm text-muted-foreground">{brand.bestForNote}</p>
        </div>
      </section>

      {newItems.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10">
          <SectionHeading title={`New ${brand.name} Equipment`} as="h2" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {newItems.map((l) => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </div>
        </section>
      )}

      {usedItems.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-10">
          <SectionHeading
            title={`Used ${brand.name} Equipment`}
            href="/used-gym-equipment"
            linkLabel="All Used Equipment"
            as="h2"
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {usedItems.map((l) => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2">
          <div>
            <SectionHeading title={`Popular ${brand.name} Models`} as="h2" />
            <ul className="space-y-2 text-sm">
              {brand.popularModels.map((m) => (
                <li key={m}>
                  <Link to="/shop-equipment" search={{ q: m }} className="text-primary hover:underline">
                    {brand.name} {m}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Related Categories" as="h2" />
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/${c.slug}` as never} className="text-primary hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
          {brands
            .filter((b) => b.slug !== brand.slug)
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
