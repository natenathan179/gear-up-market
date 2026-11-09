import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ChevronRight, Copy } from "lucide-react";
import { Breadcrumbs, FaqList, PageHeader, faqSchema } from "@/components/site/Bits";
import { canonicalUrl, SITE_URL } from "@/lib/seo";
import headerImg from "@/assets/cat-home.jpg";

export interface ToolInfo {
  path: string;
  name: string;
  blurb: string;
}

export const tools: ToolInfo[] = [
  {
    path: "/tools/home-gym-cost-calculator",
    name: "Home Gym Cost Calculator",
    blurb:
      "Pick your equipment and quality tier to estimate what a home gym will cost, new or used.",
  },
  {
    path: "/tools/gym-space-calculator",
    name: "Gym Space Calculator",
    blurb:
      "Check whether your equipment fits a room, including the safety clearance each piece needs.",
  },
  {
    path: "/tools/plate-calculator",
    name: "Barbell Plate Calculator",
    blurb: "Enter a target weight and see exactly which plates to load on each side of the bar.",
  },
  {
    path: "/tools/one-rep-max-calculator",
    name: "One-Rep Max Calculator",
    blurb: "Estimate your 1RM from any set and get a full training-percentage chart.",
  },
];

export const priceIndexLink: ToolInfo = {
  path: "/used-gym-equipment-prices",
  name: "Used Gym Equipment Price Index",
  blurb: "Live median prices for used gym equipment by type and brand.",
};

type Faq = { q: string; a: string };

/** Route `head` for a tool page: meta, canonical, WebApplication + FAQ + breadcrumb schema. */
export function toolHead(tool: ToolInfo, title: string, description: string, faqs: Faq[]) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: tool.path },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: canonicalUrl(tool.path) }],
    scripts: [
      ...faqSchema(faqs),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: tool.name,
          description,
          url: canonicalUrl(tool.path),
          applicationCategory: "HealthApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@type": "Organization", name: "Gym Equipment Marketplace", url: SITE_URL },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") },
            { "@type": "ListItem", position: 2, name: "Tools", item: canonicalUrl("/tools") },
            { "@type": "ListItem", position: 3, name: tool.name, item: canonicalUrl(tool.path) },
          ],
        }),
      },
    ],
  };
}

export function CopyLinkBox({ path, name }: { path: string; name: string }) {
  const [copied, setCopied] = useState(false);
  const snippet = `<a href="${canonicalUrl(path)}">${name}</a> – Gym Equipment Marketplace`;
  return (
    <div className="border-2 border-primary/40 bg-secondary p-6">
      <h2 className="font-display text-lg font-extrabold text-foreground">Share this tool</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Free to use and free to recommend. To link to it from your site, blog or forum post, copy
        this snippet:
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

export function ToolShell({
  tool,
  intro,
  faqs,
  children,
  aside,
}: {
  tool: ToolInfo;
  intro: string;
  faqs: Faq[];
  children: ReactNode;
  /** Explanatory copy shown under the calculator. */
  aside?: ReactNode;
}) {
  const others = [...tools.filter((t) => t.path !== tool.path), priceIndexLink];
  return (
    <>
      <Breadcrumbs items={[{ label: "Tools", to: "/tools" }, { label: tool.name }]} />
      <PageHeader eyebrow="Free Tool" h1={tool.name} intro={intro} image={headerImg} />
      <section className="mx-auto max-w-5xl px-4 py-12">
        {children}
        {aside && (
          <div className="mt-12 space-y-4 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-foreground">
            {aside}
          </div>
        )}
        <div className="mt-12">
          <CopyLinkBox path={tool.path} name={tool.name} />
        </div>
        <div className="mt-12">
          <FaqList faqs={faqs} />
        </div>
        <div className="mt-12 border-t border-border pt-10">
          <h2 className="font-display text-xl font-extrabold text-foreground">More free tools</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((t) => (
              <Link
                key={t.path}
                to={t.path as never}
                className="group border border-border p-5 hover:border-primary"
              >
                <span className="flex items-center gap-1 font-bold text-foreground group-hover:text-primary">
                  {t.name}
                  <ChevronRight className="size-4" />
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{t.blurb}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  suffix,
  min = 0,
  step = 1,
  id,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  min?: number;
  step?: number;
  id: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <span className="mt-1 flex items-center border border-border bg-background focus-within:border-primary">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
          className="w-full bg-transparent px-3 py-2.5 text-base text-foreground outline-none"
        />
        {suffix && <span className="pr-3 text-sm text-muted-foreground">{suffix}</span>}
      </span>
    </label>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <span className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <div
        className="mt-1 flex flex-wrap border border-border"
        role="radiogroup"
        aria-label={label}
      >
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={`flex-1 px-3 py-2.5 text-sm font-semibold transition-colors ${
              value === o.value
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground hover:bg-secondary"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ResultCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string | undefined;
}) {
  return (
    <div className="bg-charcoal p-6 text-charcoal-foreground">
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">{label}</p>
      <p className="font-display mt-2 text-4xl font-extrabold tabular-nums">{value}</p>
      {note && <p className="mt-2 text-sm text-charcoal-foreground/75">{note}</p>}
    </div>
  );
}
