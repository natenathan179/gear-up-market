import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs, PageHeader } from "@/components/site/Bits";
import { priceIndexLink, tools } from "@/components/site/ToolKit";
import { canonicalUrl } from "@/lib/seo";
import headerImg from "@/assets/cat-home.jpg";

const title = "Free Gym Tools & Calculators | Gym Equipment Marketplace";
const description =
  "Free gym calculators: home gym cost and space planners, a barbell plate calculator, a one-rep max calculator and live used gym equipment prices.";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/tools" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/tools") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Free gym tools and calculators",
          itemListElement: [...tools, priceIndexLink].map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: t.name,
            url: canonicalUrl(t.path),
          })),
        }),
      },
    ],
  }),
  component: ToolsIndex,
});

function ToolsIndex() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Tools" }]} />
      <PageHeader
        eyebrow="Free Tools"
        h1="Free Gym Tools & Calculators"
        intro="Plan a home gym, check what fits, load the bar and set your training weights — free, no sign-up, and they work on your phone at the gym."
        image={headerImg}
      />
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {[...tools, priceIndexLink].map((t) => (
            <Link
              key={t.path}
              to={t.path as never}
              className="group flex flex-col border border-border p-6 hover:border-primary"
            >
              <span className="font-display text-lg font-extrabold text-foreground group-hover:text-primary">
                {t.name}
              </span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {t.blurb}
              </span>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold tracking-wide text-primary uppercase">
                Open {t.path === priceIndexLink.path ? "price index" : "tool"}
                <ChevronRight className="size-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
