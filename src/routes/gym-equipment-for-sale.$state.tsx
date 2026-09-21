import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs, FaqList, ListingCard, PageHeader, SectionHeading, faqSchema } from "@/components/site/Bits";
import { useSuspenseQuery } from "@tanstack/react-query";
import { locationBySlug, locations, type LocationPage } from "@/data/catalog";
import { productsQueryOptions } from "@/lib/queries";
import locationImg from "@/assets/cat-weights.jpg";
import { canonicalUrl } from "@/lib/seo";

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
    const title = `Used Gym Equipment for Sale in ${state}`;
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
      links: [{ rel: "canonical", href: canonicalUrl(`/gym-equipment-for-sale/${params.state}`) }],
      scripts: faqSchema(locationFaqs(loaderData.location)),
    };
  },
  component: LocationPageView,
});

function locationFaqs(location: LocationPage) {
  const [cityA, cityB] = location.cities;
  return [
    {
      q: `How do I buy gym equipment for sale in ${location.state}?`,
      a: `Browse the listings above, filter by city, condition and price, then contact the seller directly through the listing page to arrange payment, pickup or delivery. Every listing shows the seller's location and delivery options within ${location.state}.`,
    },
    {
      q: `Does gym equipment ship to ${cityA} and ${cityB}?`,
      a: `Yes — sellers listing equipment in ${location.state} typically offer local delivery around ${cityA}, ${cityB} and the surrounding area, and can arrange nationwide freight for buyers further away.`,
    },
    {
      q: `Can I buy used gym equipment in ${location.state} that's already been inspected?`,
      a: "Most sellers note the equipment's condition and any servicing performed directly in the listing. Ask the seller for maintenance history and recent photos before you buy, especially for cardio machines and anything with electronics.",
    },
    {
      q: `Which cities in ${location.state} have the most gym equipment for sale?`,
      a: `${location.cities.join(", ")} typically have the most active listings, though sellers across ${location.state} ship or deliver statewide for buyers outside those areas.`,
    },
    {
      q: `Is it cheaper to buy gym equipment locally in ${location.state} or order freight from another state?`,
      a: `Buying locally in ${location.state} usually saves on freight and lets you inspect equipment in person before paying. Ordering from another state widens your selection but adds shipping cost and delivery time, which matters most for heavy commercial machines.`,
    },
  ];
}

function LocationPageView() {
  const { location } = Route.useLoaderData();
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  const local = products.filter((l) => l.stateSlug === location.slug);

  return (
    <>
      <Breadcrumbs items={[{ label: `Used Gym Equipment in ${location.state}` }]} />
      <PageHeader
        eyebrow="Local Inventory"
        h1={`Used Gym Equipment for Sale in ${location.state}`}
        intro={location.blurb}
        image={locationImg}
      />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeading
          title={`Used Gym Equipment Listings in ${location.state}`}
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

        <SectionHeading title={`Buying Gym Equipment in ${location.state}`} as="h2" />
        <div className="max-w-3xl space-y-3 text-sm text-muted-foreground">
          <p>
            Local pickup in {location.state} lets you inspect a machine, run it and confirm its
            condition before you pay — the safest way to buy anything with a motor, cables or
            electronics. It also skips freight cost entirely, which matters most on heavy
            commercial equipment where shipping can add hundreds of dollars to the price.
          </p>
          <p>
            If nothing local matches what you need, most sellers on the marketplace ship
            nationwide, so a listing based outside {location.state} is still worth considering for
            rarer equipment or a specific brand and model. Weigh the extra freight cost against the
            time saved not waiting for local inventory to turn over.
          </p>
        </div>

        <FaqList faqs={locationFaqs(location)} title={`Gym Equipment in ${location.state}: FAQs`} />

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
