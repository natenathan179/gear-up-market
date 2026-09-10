import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/site/Bits";

const title = "Shipping Information | Gym Equipment Marketplace";
const description =
  "How gym equipment shipping works: freight, liftgate and inside delivery, local pickup, lead times and what to check before your equipment arrives.";

export const Route = createFileRoute("/shipping-information")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/shipping-information" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/shipping-information" }],
  }),
  component: Page,
});

const sections = [
  {
    h: "Freight shipping",
    p: "Most gym equipment ships by LTL freight on a pallet or crate. Freight is quoted per listing based on weight, dimensions and destination, and is arranged between you and the seller.",
  },
  {
    h: "Liftgate and inside delivery",
    p: "A standard freight delivery is curbside. If you do not have a loading dock or forklift, ask for liftgate service. Inside delivery, stair carries and elevator access are additional services that must be booked in advance.",
  },
  {
    h: "Local delivery and pickup",
    p: "Many dealers deliver locally within a few hundred miles, often at a lower cost than freight. Private sellers frequently offer pickup only — bring straps, tools and help for anything over 200 lbs.",
  },
  {
    h: "Lead times",
    p: "Used and refurbished equipment usually ships within one to two weeks. New commercial equipment can carry longer manufacturer lead times, which the seller will confirm before you buy.",
  },
  {
    h: "On arrival",
    p: "Inspect the shipment before signing. Note any damage on the delivery receipt and photograph it immediately — freight claims are difficult to pursue after a clean signature.",
  },
];

function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Shipping Information" }]} />
      <PageHeader
        eyebrow="Buyer Support"
        h1="Shipping Information"
        intro="Gym equipment is heavy freight, not parcel post. Here is how delivery works on the marketplace and what to arrange before your equipment ships."
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        {sections.map((s) => (
          <div key={s.h} className="mb-8">
            <h2 className="font-display text-xl font-bold text-charcoal">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
          </div>
        ))}
      </section>
    </>
  );
}
