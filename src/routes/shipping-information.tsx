import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, FaqList, PageHeader, faqSchema } from "@/components/site/Bits";
import homeImg from "@/assets/cat-home.jpg";
import { businessInfo } from "@/data/catalog";
import { canonicalUrl } from "@/lib/seo";

const title = "Shipping Information | Gym Equipment Marketplace";
const description =
  "How gym equipment shipping works: freight, liftgate and inside delivery, local pickup, international shipping, lead times and what to check before your equipment arrives.";

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
    links: [{ rel: "canonical", href: canonicalUrl("/shipping-information") }],
    scripts: faqSchema(shippingFaqs),
  }),
  component: Page,
});

const sections = [
  {
    h: "Freight is quoted per listing, not a flat rate",
    p: "Gym equipment is heavy freight, not parcel post, so there's no single shipping price across the catalog. Every listing's freight cost is quoted based on that item's actual weight, dimensions and crating, plus the distance from the seller to your delivery address — use Enquire Now on any listing to get a firm quote before you buy.",
  },
  {
    h: "Liftgate and inside delivery",
    p: "A standard freight delivery is curbside: the truck drops the pallet or crate at the curb or driveway. If you don't have a loading dock or forklift, ask for liftgate service when you request your quote. Inside delivery, stair carries and elevator access are additional services that must be booked in advance, not arranged on the spot.",
  },
  {
    h: "Local delivery and pickup",
    p: "Many dealers deliver locally within a few hundred miles, often at a lower cost than long-haul freight — ask the seller if this applies before requesting a full freight quote. Private sellers frequently offer pickup only; bring straps, a dolly and a second set of hands for anything over 200 lbs, since sellers aren't equipped to load solo.",
  },
  {
    h: "Shipping to Canada and the UK",
    p: "Sellers ship internationally on request. Freight, customs brokerage and any import duties or VAT are quoted separately from the item price and confirmed before you commit — browse the same live inventory with estimated local pricing on our Canada and UK pages.",
  },
  {
    h: "Lead times",
    p: "Used and refurbished equipment usually ships within one to two weeks of a confirmed order. New commercial equipment can carry longer manufacturer lead times, which the seller will confirm as part of your quote — always get an estimated ship date in writing before you pay.",
  },
  {
    h: "Tracking your shipment",
    p: "Freight carriers don't offer parcel-style live tracking by default. Your seller will share the carrier's name and a pro/BOL number once your item ships, and can request delivery-window updates from the carrier on your behalf as the date approaches.",
  },
  {
    h: "On arrival: inspect before you sign",
    p: "Open and inspect the shipment before signing the delivery receipt. Note any visible damage directly on the receipt and photograph it immediately — freight claims are difficult to pursue after a clean signature, and this is separate from (and faster than) our standard return process.",
  },
];

const shippingFaqs = [
  {
    q: "How much will shipping cost?",
    a: "It depends on the item's weight, dimensions and your distance from the seller — there's no flat rate. Use Enquire Now on a listing to get a firm freight quote before you buy.",
  },
  {
    q: "Is delivery curbside or inside my home/gym?",
    a: "Standard freight delivery is curbside. Liftgate service (for locations without a loading dock) and inside delivery are additional services — request them when you get your quote, not on delivery day.",
  },
  {
    q: "Do you ship to Canada or the UK?",
    a: "Yes, sellers ship internationally on request. Freight, customs brokerage and any import duties or VAT are quoted separately and confirmed before you commit.",
  },
  {
    q: "How long will my order take to arrive?",
    a: "Used and refurbished equipment typically ships within one to two weeks of a confirmed order. New commercial equipment can take longer due to manufacturer lead times — your seller will confirm an estimated ship date before you pay.",
  },
  {
    q: "What do I do if my shipment arrives damaged?",
    a: `Note the damage on the delivery receipt before signing, photograph it immediately, and contact the seller and ${businessInfo.email} the same day. See our Returns & Refunds page for what happens next.`,
  },
];

function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Shipping Information" }]} />
      <PageHeader
        eyebrow="Buyer Support"
        h1="Shipping Information"
        intro="Gym equipment is heavy freight, not parcel post. Here is how delivery works on the marketplace, what to arrange before your equipment ships, and what to check when it arrives."
        image={homeImg}
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        {sections.map((s) => (
          <div key={s.h} className="mb-8">
            <h2 className="font-display text-xl font-bold text-foreground">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-3xl px-4 pb-12">
        <FaqList faqs={shippingFaqs} title="Shipping FAQs" />
      </section>
    </>
  );
}
