import { Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader, SectionHeading } from "@/components/site/Bits";
import { EquipmentBrowser } from "@/components/site/EquipmentBrowser";
import { brands, categories, guides, type Category } from "@/data/catalog";

export function CategoryPage({ category }: { category: Category }) {
  const others = categories.filter((c) => c.slug !== category.slug);
  return (
    <>
      <Breadcrumbs items={[{ label: "Shop Equipment", to: "/shop-equipment" }, { label: category.name }]} />
      <PageHeader eyebrow="Gym Equipment Marketplace" h1={category.h1} intro={category.intro} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeading title={`Shop ${category.name} by Type`} as="h2" />
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {category.subcategories.map((s) => (
            <li key={s}>
              <Link
                to="/shop-equipment"
                search={{ q: s }}
                className="block border border-border px-3 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {s}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <SectionHeading title={`${category.name} Listings`} as="h2" />
        <EquipmentBrowser lockCategory={category.slug} />
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Shop by Brand" href="/brands" linkLabel="View All Brands" as="h2" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {brands.map((b) => (
              <li key={b.slug}>
                <Link
                  to="/brands/$slug"
                  params={{ slug: b.slug }}
                  className="flex h-16 items-center justify-center border border-border bg-card px-2 text-center text-xs font-bold tracking-wide uppercase transition-colors hover:border-primary hover:text-primary"
                >
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading title="Related Categories & Guides" as="h2" />
        <div className="grid gap-8 md:grid-cols-2">
          <ul className="space-y-2 text-sm">
            {others.map((c) => (
              <li key={c.slug}>
                <Link to={`/${c.slug}` as never} className="font-medium text-primary hover:underline">
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

export function categoryHead(slug: string, title: string, description: string) {
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
    links: [{ rel: "canonical", href: `/${slug}` }],
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
    ],
  });
}
