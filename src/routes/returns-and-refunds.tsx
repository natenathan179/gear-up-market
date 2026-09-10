import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/site/Bits";

const title = "Returns & Refunds | Gym Equipment Marketplace";
const description =
  "Return and refund guidance for gym equipment bought through the marketplace, including as-is sales, refurbished warranties and damaged freight claims.";

export const Route = createFileRoute("/returns-and-refunds")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/returns-and-refunds" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/returns-and-refunds" }],
  }),
  component: Page,
});

const sections = [
  {
    h: "Returns are set by the seller",
    p: "Each listing states its own return terms. Dealers commonly offer a short return or exchange window on refurbished equipment; private sales are usually final and as-is.",
  },
  {
    h: "As-is sales",
    p: "An as-is listing means no returns once the equipment leaves the seller. Ask questions, request video of the machine running, and inspect in person where possible before committing.",
  },
  {
    h: "Refurbished warranties",
    p: "Refurbished equipment normally carries a warranty from the refurbisher covering the parts they replaced. Ask exactly what was done and what the warranty covers before purchase.",
  },
  {
    h: "Damaged in transit",
    p: "Note damage on the delivery receipt, photograph it and contact the seller the same day. Freight carriers have strict claim windows and a clean signature makes a claim very hard to win.",
  },
  {
    h: "Disputes",
    p: "If you cannot resolve an issue with a seller, contact our support team with your listing details and correspondence and we will help mediate.",
  },
];

function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Returns & Refunds" }]} />
      <PageHeader
        eyebrow="Buyer Support"
        h1="Returns & Refunds"
        intro="What to expect when equipment needs to go back, and how return terms differ between dealers, refurbishers and private sellers."
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        {sections.map((s) => (
          <div key={s.h} className="mb-8">
            <h2 className="font-display text-xl font-bold text-foreground">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
          </div>
        ))}
      </section>
    </>
  );
}
