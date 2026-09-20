import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader, SectionHeading } from "@/components/site/Bits";
import { brands, categories, locations } from "@/data/catalog";
import heroImg from "@/assets/hero-gym.webp";
import { canonicalUrl } from "@/lib/seo";

const title = "About Us | Buy & Sell New and Used Gym Equipment | Gym Equipment Marketplace";
const description =
  "Gym Equipment Marketplace connects buyers and sellers of new and used gym equipment across the United States — strength, cardio, home and commercial equipment from verified sellers, with honest condition reporting on every listing.";

const faqs = [
  {
    q: "How do I buy gym equipment on Gym Equipment Marketplace?",
    a: "Browse by category or brand, compare condition, price and seller location, then send an enquiry directly from the listing. Our team follows up with availability, freight cost and a final price — no payment is taken online.",
  },
  {
    q: "How do I sell my gym equipment?",
    a: "List a single machine or a full facility through our seller tools. You control the condition details, photos and asking price, and buyers reach you through the same enquiry process used across the marketplace.",
  },
  {
    q: "Is the equipment new or used?",
    a: "Both — listings span new, refurbished and used equipment, with the condition stated honestly on every listing rather than a single generic 'used' label.",
  },
  {
    q: "Do you ship gym equipment nationwide?",
    a: "Shipping and delivery terms are set by each seller and listed on the product page, ranging from local pickup to freight delivery — check the specific listing for delivery options before you buy.",
  },
  {
    q: "How do I contact Gym Equipment Marketplace?",
    a: "Use the enquiry button below or visit our contact page to send a message — our team replies within one business day.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/about") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Gym Equipment Marketplace",
          description,
          url: "/about",
        }),
      },
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
  component: About,
});

function About() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About Us" }]} />
      <PageHeader
        eyebrow="About Us"
        h1="About Gym Equipment Marketplace"
        intro="We connect people buying gym equipment with the gyms, dealers and owners selling it — new, refurbished and used, in one place, with honest condition reporting and real seller information."
        image={heroImg}
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <SectionHeading title="Why We Exist" as="h2" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Gym equipment is expensive, heavy and long-lived. Every year, gyms upgrade, hotels
          refurbish and home owners move on — and thousands of perfectly good machines sit idle
          while other buyers pay full retail. Gym Equipment Marketplace exists to close that gap,
          connecting buyers shopping for strength equipment, cardio machines, home gym equipment
          and commercial gym equipment with sellers who already have it.
        </p>

        <SectionHeading title="How Gym Equipment Marketplace Works" as="h2" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Buying starts with browsing by category or brand, comparing condition, price and seller
          location, then sending an enquiry directly from the listing — our team follows up with
          availability, freight cost and a final price before any payment changes hands. Selling
          works the other direction: list a single machine or a full facility, set your own price
          and condition details, and respond to buyer enquiries as they come in.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Both sides of the marketplace use the same transparent process — real condition reporting,
          real seller information, and no hidden fees added after the fact.
        </p>

        <SectionHeading title="Who We Serve" as="h2" />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Home gym owners building a setup that lasts</li>
          <li>Commercial gyms and fitness centers fitting out or upgrading a floor</li>
          <li>Personal trainers and boutique studios working with limited space</li>
          <li>Hotels, schools, apartments and corporate facilities</li>
          <li>Sellers with single machines or whole facilities to clear</li>
        </ul>

        <SectionHeading title="What We Carry" as="h2" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Listings span every major equipment category and the commercial and home fitness brands
          buyers search for most.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2 text-sm">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/${c.slug}` as never}
                className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-3 flex flex-wrap gap-2 text-sm">
          {brands.map((b) => (
            <li key={b.slug}>
              <Link
                to="/brands/$slug"
                params={{ slug: b.slug }}
                className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
              >
                {b.name}
              </Link>
            </li>
          ))}
        </ul>

        <SectionHeading title="How We Keep It Trustworthy" as="h2" />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Verified seller status on dealer accounts</li>
          <li>Condition stated honestly on every listing, not just "used"</li>
          <li>Full specifications, warranty and shipping terms in the open</li>
          <li>Support from our team before and after the sale</li>
        </ul>

        <SectionHeading title="Buying and Selling Nationwide" as="h2" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Listings come from sellers across the country, with concentrated activity in a handful of
          states where commercial facilities and dealers turn over equipment most often.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2 text-sm">
          {locations.map((l) => (
            <li key={l.slug}>
              <Link
                to="/gym-equipment-for-sale/$state"
                params={{ state: l.slug }}
                className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
              >
                Gym Equipment for Sale in {l.state}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Frequently Asked Questions" as="h2" />
          <dl className="grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="border border-border bg-card p-5">
                <dt className="text-sm font-bold text-foreground">{f.q}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col items-start gap-4 bg-charcoal p-8 text-charcoal-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold">Have a Question or Want a Quote?</h2>
            <p className="mt-1.5 text-sm text-charcoal-foreground/75">
              Send an enquiry and our team will get back to you within one business day — no
              payment is taken online.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-block shrink-0 bg-primary px-5 py-3 text-xs font-bold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90"
          >
            Send an Enquiry
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Selling equipment instead?{" "}
          <Link to="/sell-your-equipment" className="font-semibold text-primary hover:underline">
            List your equipment
          </Link>
          .
        </p>
      </section>
    </>
  );
}
