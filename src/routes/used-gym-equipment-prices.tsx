import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import {
  Breadcrumbs,
  FaqList,
  PageHeader,
  SectionHeading,
  faqSchema,
} from "@/components/site/Bits";
import { productsQueryOptions } from "@/lib/queries";
import { buildPriceIndex, MIN_GROUP_SIZE, usd, type PriceStats } from "@/lib/price-index";
import { canonicalUrl, SITE_URL } from "@/lib/seo";
import headerImg from "@/assets/cat-commercial.jpg";

const PATH = "/used-gym-equipment-prices";
const title = "Used Gym Equipment Price Index – Average Prices by Machine & Brand";
const description =
  "What does used gym equipment cost? Live median asking prices for used treadmills, strength machines, racks and more, by equipment type and brand, from real marketplace listings.";

const faqs = [
  {
    q: "Where do these prices come from?",
    a: "Every figure is calculated from the asking prices of equipment currently listed on Gym Equipment Marketplace. The index recalculates automatically whenever listings are added, sold or repriced, so it always reflects live inventory rather than a one-off survey.",
  },
  {
    q: "Why do you show the median instead of the average?",
    a: "A single very expensive or very cheap listing can pull an average a long way from what most buyers actually pay. The median is the middle price when listings are sorted, so it is a better guide to a typical price.",
  },
  {
    q: "Why are some equipment types or brands missing?",
    a: `We only publish a figure when at least ${MIN_GROUP_SIZE} listings are available, and we leave out items priced per pound or per piece (such as loose plates and dumbbells) because their unit prices are not comparable with whole machines.`,
  },
  {
    q: "Are these the prices I will actually pay?",
    a: "They are asking prices before freight. Final cost depends on condition, age, location and shipping — commercial machines are heavy, and freight can add a few hundred dollars. Use the figures as a benchmark when comparing listings or negotiating.",
  },
  {
    q: "Can I use this data in my article or video?",
    a: "Yes. The data is free to cite under a Creative Commons Attribution license — just credit Gym Equipment Marketplace and link to this page.",
  },
];

export const Route = createFileRoute("/used-gym-equipment-prices")({
  loader: async ({ context }) => {
    const products = await context.queryClient.ensureQueryData(productsQueryOptions);
    return {
      index: buildPriceIndex(products),
      updated: new Date().toISOString().slice(0, 10),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PATH },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: canonicalUrl(PATH) }],
    scripts: [
      ...faqSchema(faqs),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: "Used Gym Equipment Price Index",
          description,
          url: canonicalUrl(PATH),
          license: "https://creativecommons.org/licenses/by/4.0/",
          isAccessibleForFree: true,
          dateModified: loaderData?.updated,
          creator: { "@type": "Organization", name: "Gym Equipment Marketplace", url: SITE_URL },
          variableMeasured: "Median asking price (USD) of used gym equipment",
          spatialCoverage: "United States",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") },
            {
              "@type": "ListItem",
              position: 2,
              name: "Used Gym Equipment",
              item: canonicalUrl("/used-gym-equipment"),
            },
            { "@type": "ListItem", position: 3, name: "Price Index", item: canonicalUrl(PATH) },
          ],
        }),
      },
    ],
  }),
  component: PriceIndexPage,
});

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function PriceTable({ rows, nameLabel }: { rows: PriceStats[]; nameLabel: string }) {
  const max = Math.max(...rows.map((r) => r.median), 1);
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[560px] text-sm">
        <thead className="bg-secondary text-left text-xs font-bold tracking-wide text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-3">{nameLabel}</th>
            <th className="px-4 py-3 text-right">Median price</th>
            <th className="hidden px-4 py-3 sm:table-cell">&nbsp;</th>
            <th className="px-4 py-3 text-right">Range</th>
            <th className="px-4 py-3 text-right">Listings</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-t border-border">
              <td className="px-4 py-3 font-semibold text-foreground">
                {r.href ? (
                  <Link to={r.href as never} className="hover:text-primary">
                    {r.label}
                  </Link>
                ) : (
                  r.label
                )}
              </td>
              <td className="px-4 py-3 text-right font-bold tabular-nums text-foreground">
                {usd(r.median)}
              </td>
              <td className="hidden w-1/4 px-4 py-3 sm:table-cell">
                <span
                  className="block h-2 rounded-full bg-primary"
                  style={{ width: `${Math.max(4, (r.median / max) * 100)}%` }}
                />
              </td>
              <td className="px-4 py-3 text-right whitespace-nowrap text-muted-foreground tabular-nums">
                {usd(r.low)} – {usd(r.high)}
              </td>
              <td className="px-4 py-3 text-right text-muted-foreground tabular-nums">{r.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-5">
      <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="font-display mt-2 text-2xl font-extrabold text-foreground tabular-nums">
        {value}
      </p>
    </div>
  );
}

function CiteBox() {
  const [copied, setCopied] = useState(false);
  const snippet = `<a href="${canonicalUrl(PATH)}">Used Gym Equipment Price Index</a> – Gym Equipment Marketplace`;
  return (
    <div className="border-2 border-primary/40 bg-secondary p-6">
      <h2 className="font-display text-xl font-extrabold text-foreground">Use this data</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Writing about gym equipment costs? You're welcome to quote these figures in articles, videos
        and reports under a{" "}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="font-semibold text-primary hover:underline"
          rel="license noopener"
          target="_blank"
        >
          CC BY 4.0
        </a>{" "}
        license. Please credit Gym Equipment Marketplace with a link to this page:
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start">
        <code className="block flex-1 overflow-x-auto border border-border bg-background p-3 text-xs break-all text-foreground">
          {snippet}
        </code>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(snippet).then(
              () => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              },
              () => {},
            );
          }}
          className="inline-flex items-center justify-center gap-2 bg-primary px-4 py-3 text-xs font-bold tracking-wide text-primary-foreground uppercase hover:opacity-90"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}

function PriceIndexPage() {
  const { index, updated } = Route.useLoaderData();
  const hasData = index.totalListings > 0;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Used Gym Equipment", to: "/used-gym-equipment" },
          { label: "Price Index" },
        ]}
      />
      <PageHeader
        eyebrow="Market Data"
        h1="Used Gym Equipment Price Index"
        intro="How much does used gym equipment cost? These are live median asking prices for used and refurbished machines, by equipment type and brand, calculated from real listings on our marketplace."
        image={headerImg}
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-sm text-muted-foreground">
          Last updated <strong className="text-foreground">{formatDate(updated)}</strong> · Based on{" "}
          <strong className="text-foreground">{index.totalListings}</strong> active listings ·
          Prices in USD, before freight
        </p>

        {hasData ? (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Stat label="Median listing price" value={usd(index.overallMedian)} />
              <Stat label="Listings analysed" value={String(index.totalListings)} />
              {index.commercialMedian !== null && (
                <Stat label="Commercial-grade median" value={usd(index.commercialMedian)} />
              )}
              {index.homeMedian !== null && (
                <Stat label="Home-use median" value={usd(index.homeMedian)} />
              )}
            </div>

            <div className="mt-12">
              <SectionHeading title="Prices by Equipment Type" as="h2" />
              <PriceTable rows={index.byType} nameLabel="Equipment type" />
            </div>

            <div className="mt-12">
              <SectionHeading title="Prices by Brand" as="h2" />
              <PriceTable rows={index.byBrand} nameLabel="Brand" />
            </div>

            <div className="mt-12">
              <SectionHeading title="Prices by Department" as="h2" />
              <PriceTable rows={index.byDepartment} nameLabel="Department" />
            </div>
          </>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            Price data is temporarily unavailable. Please check back shortly.
          </p>
        )}

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="How We Calculate It" as="h2" />
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                Source: asking prices of every used, refurbished and new-old-stock equipment listing
                currently live on Gym Equipment Marketplace.
              </li>
              <li>
                Recalculated automatically as listings change — there is no manual adjustment or
                rounding beyond the nearest dollar.
              </li>
              <li>
                Groups with fewer than {MIN_GROUP_SIZE} listings are not shown, and items priced per
                pound or per piece (under $25) are excluded.
              </li>
              <li>Supplements and consumables are excluded. Prices exclude freight and tax.</li>
            </ul>
          </div>
          <CiteBox />
        </div>

        <div className="mt-12 border-t border-border pt-12">
          <SectionHeading title="Plan Your Purchase" as="h2" />
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Pair these benchmarks with our free{" "}
            <Link to="/tools" className="font-semibold text-primary hover:underline">
              gym planning tools
            </Link>{" "}
            — budget a full home gym, check whether equipment will fit your room, or work out plate
            loading and training maxes. Ready to buy? Browse{" "}
            <Link to="/used-gym-equipment" className="font-semibold text-primary hover:underline">
              used gym equipment for sale
            </Link>
            .
          </p>
        </div>

        <div className="mt-12">
          <FaqList faqs={faqs} />
        </div>
      </section>
    </>
  );
}
