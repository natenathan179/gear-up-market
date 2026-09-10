import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader, SectionHeading } from "@/components/site/Bits";
import { EquipmentBrowser } from "@/components/site/EquipmentBrowser";
import { brands, guides } from "@/data/catalog";

const title = "Used Gym Equipment for Sale | Gym Equipment Marketplace";
const description =
  "Shop used gym equipment for sale: used commercial gym equipment, refurbished machines and second hand fitness equipment. Filter by condition, brand, price and location.";

export const Route = createFileRoute("/used-gym-equipment")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/used-gym-equipment" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/used-gym-equipment" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Used Gym Equipment", item: "/used-gym-equipment" },
          ],
        }),
      },
    ],
  }),
  component: UsedPage,
});

function UsedPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Used Gym Equipment" }]} />
      <PageHeader
        eyebrow="Pre-Owned & Refurbished"
        h1="Used Gym Equipment for Sale"
        intro="Buy used gym equipment from gyms, studios, hotels and private sellers across the United States. Every listing states its true condition, from lightly used to fully refurbished commercial machines, so you know exactly what you are buying."
      />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <EquipmentBrowser onlyUsed />
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Why Buy Used Gym Equipment?" as="h2" />
          <div className="grid gap-6 text-sm text-muted-foreground md:grid-cols-3">
            <p>
              Commercial machines are engineered for thousands of hours of use. A well-maintained
              used unit routinely outlasts new home-grade equipment bought at the same price.
            </p>
            <p>
              Plate-loaded machines, racks, benches, dumbbells and plates have almost nothing to
              fail — these are the categories where buying used saves the most with the least risk.
            </p>
            <p>
              Refurbished equipment sits between the two: new wear parts, new upholstery and a
              warranty from the refurbisher, at well below new pricing.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading title="Used Equipment by Brand" href="/brands" linkLabel="All Brands" as="h2" />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {brands.map((b) => (
            <li key={b.slug}>
              <Link
                to="/brands/$slug"
                params={{ slug: b.slug }}
                className="flex h-16 items-center justify-center border border-border bg-card px-2 text-center text-xs font-bold tracking-wide uppercase hover:border-primary hover:text-primary"
              >
                {b.name}
              </Link>
            </li>
          ))}
        </ul>
        <SectionHeading title="Buying Guides" as="h2" />
        <ul className="space-y-2 text-sm">
          {guides
            .filter((g) => g.slug.includes("used") || g.slug.includes("cost"))
            .map((g) => (
              <li key={g.slug}>
                <Link
                  to="/fitness-equipment-guide/$slug"
                  params={{ slug: g.slug }}
                  className="font-medium text-primary hover:underline"
                >
                  {g.title}
                </Link>
                <span className="text-muted-foreground"> — {g.description}</span>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
