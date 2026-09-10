import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/site/Bits";
import { useSuspenseQuery } from "@tanstack/react-query";
import { brands } from "@/data/catalog";
import { productsQueryOptions } from "@/lib/queries";

const title = "Gym Equipment Brands | Gym Equipment Marketplace";
const description =
  "Browse gym equipment by brand: Life Fitness, Precor, Technogym, Cybex, Matrix, Hammer Strength, NordicTrack and Rogue. New and used machines from verified sellers.";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/brands" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/brands" }],
  }),
  component: BrandsIndex,
});

function BrandsIndex() {
  const { data: products } = useSuspenseQuery(productsQueryOptions);

  return (
    <>
      <Breadcrumbs items={[{ label: "Brands" }]} />
      <PageHeader
        eyebrow="Shop by Brand"
        h1="Gym Equipment Brands"
        intro="Compare the major commercial and home fitness brands, see which models turn up most often on the used market, and browse current listings for each manufacturer."
      />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((b) => {
            const count = products.filter((l) => l.brandSlug === b.slug).length;
            return (
              <li key={b.slug} className="border border-border bg-card p-5">
                <h2 className="font-display text-lg font-bold text-foreground">
                  <Link to="/brands/$slug" params={{ slug: b.slug }} className="hover:text-primary">
                    {b.name}
                  </Link>
                </h2>
                <p className="mt-2 line-clamp-4 text-xs text-muted-foreground">{b.intro}</p>
                <p className="mt-3 text-xs font-bold text-primary uppercase">
                  {count} listing{count === 1 ? "" : "s"} →
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
