import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs, ListingCard, PageHeader, SectionHeading } from "@/components/site/Bits";
import { useSuspenseQuery } from "@tanstack/react-query";
import { locationBySlug, locations } from "@/data/catalog";
import { productsQueryOptions } from "@/lib/queries";

export const Route = createFileRoute("/gym-equipment-for-sale/$state")({
  loader: ({ params }) => {
    const location = locationBySlug(params.state);
    if (!location) throw notFound();
    return { location };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const state = loaderData.location.state;
    const title = `Gym Equipment for Sale in ${state} | Gym Equipment Marketplace`;
    const description = `Buy new and used gym equipment in ${state}. Browse listings from verified sellers with local delivery, pickup and freight across ${state}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/gym-equipment-for-sale/${params.state}` },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: `/gym-equipment-for-sale/${params.state}` }],
    };
  },
  component: LocationPageView,
});

function LocationPageView() {
  const { location } = Route.useLoaderData();
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  const local = products.filter((l) => l.stateSlug === location.slug);

  return (
    <>
      <Breadcrumbs items={[{ label: `Gym Equipment in ${location.state}` }]} />
      <PageHeader
        eyebrow="Local Inventory"
        h1={`Gym Equipment for Sale in ${location.state}`}
        intro={location.blurb}
      />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeading
          title={`Listings in ${location.state}`}
          href="/shop-equipment"
          linkLabel="Browse Nationwide"
          as="h2"
        />
        {local.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {local.map((l) => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No listings in {location.state} right now. Sellers add equipment weekly — browse
            nationwide inventory in the meantime.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <SectionHeading title={`Cities We Cover in ${location.state}`} as="h2" />
        <ul className="flex flex-wrap gap-2 text-sm">
          {location.cities.map((c) => (
            <li key={c}>
              <Link
                to="/shop-equipment"
                search={{ q: c }}
                className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
              >
                Gym Equipment for Sale in {c}
              </Link>
            </li>
          ))}
        </ul>

        <SectionHeading title="Delivery & Pickup" as="h2" />
        <p className="max-w-3xl text-sm text-muted-foreground">
          Most {location.state} sellers offer local delivery within a few hours' drive, with
          nationwide freight available on larger machines. Confirm liftgate, inside delivery and
          stair access with the seller before booking — heavy commercial equipment often needs
          more than a standard curbside drop.
        </p>

        <SectionHeading title="Other Locations" as="h2" />
        <ul className="flex flex-wrap gap-2 text-sm">
          {locations
            .filter((l) => l.slug !== location.slug)
            .map((l) => (
              <li key={l.slug}>
                <Link
                  to="/gym-equipment-for-sale/$state"
                  params={{ state: l.slug }}
                  className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
                >
                  {l.state}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
