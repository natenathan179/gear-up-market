import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/site/Bits";
import { guides } from "@/data/catalog";

const title = "Fitness Equipment Guide – Buying Advice | Gym Equipment Marketplace";
const description =
  "Practical guides on buying gym equipment: home gym setups, commercial fit-outs, treadmill buying advice, equipment costs, and how to inspect used gym equipment.";

export const Route = createFileRoute("/fitness-equipment-guide/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/fitness-equipment-guide" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/fitness-equipment-guide" }],
  }),
  component: GuideIndex,
});

function GuideIndex() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Fitness Equipment Guide" }]} />
      <PageHeader
        eyebrow="Resource Center"
        h1="Fitness Equipment Guide"
        intro="Buying advice written for people spending real money on equipment — what to buy, what to pay, what to check, and when used beats new."
      />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <li key={g.slug} className="border border-border bg-card p-5">
              <h2 className="text-base font-bold text-foreground">
                <Link
                  to="/fitness-equipment-guide/$slug"
                  params={{ slug: g.slug }}
                  className="hover:text-primary"
                >
                  {g.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{g.description}</p>
              <p className="mt-3 text-xs font-bold text-primary uppercase">{g.readTime} →</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
