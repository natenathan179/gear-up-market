import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/site/Bits";
import { faqs } from "@/data/catalog";

const title = "Frequently Asked Questions | Gym Equipment Marketplace";
const description =
  "Answers to common questions about buying and selling gym equipment on the marketplace: condition, shipping, warranty, payment and seller verification.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/faq" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <Breadcrumbs items={[{ label: "FAQs" }]} />
      <PageHeader
        eyebrow="Help"
        h1="Frequently Asked Questions"
        intro="How buying and selling works on Gym Equipment Marketplace, plus the practical questions about condition, freight and warranty that come up most."
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <dl className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-border pb-6">
              <dt className="text-base font-bold text-charcoal">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
