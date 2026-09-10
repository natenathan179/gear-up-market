import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/site/Bits";

const title = "Terms & Conditions | Gym Equipment Marketplace";
const description =
  "The terms that apply to using Gym Equipment Marketplace, listing equipment for sale, and buying from sellers on the platform.";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms-and-conditions" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/terms-and-conditions" }],
  }),
  component: Page,
});

const sections = [
  {
    h: "Using the marketplace",
    p: "Gym Equipment Marketplace is a platform that connects buyers and sellers of fitness equipment. We are not a party to the sale contract between a buyer and a seller unless a listing states otherwise.",
  },
  {
    h: "Listings",
    p: "Sellers are responsible for the accuracy of their listings, including condition, specifications, price and availability. Listings that are misleading, unsafe or unlawful may be removed.",
  },
  {
    h: "Payments and delivery",
    p: "Payment terms, freight and delivery are agreed directly between buyer and seller unless a listing is fulfilled by the marketplace.",
  },
  {
    h: "Acceptable use",
    p: "Do not use the marketplace to post fraudulent listings, harvest user data, or interfere with the operation of the site.",
  },
  {
    h: "Changes",
    p: "These terms may be updated as the marketplace develops. Continued use of the site means you accept the current version.",
  },
  {
    h: "Placeholder notice",
    p: "This page is template wording and is not legal advice. Have your own counsel review and replace it before trading.",
  },
];

function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />
      <PageHeader eyebrow="Legal" h1="Terms & Conditions" intro="The rules for using Gym Equipment Marketplace as a buyer or a seller." />
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
