import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader, SectionHeading } from "@/components/site/Bits";

const title = "About Gym Equipment Marketplace";
const description =
  "Gym Equipment Marketplace connects buyers and sellers of new and used gym equipment across the United States, serving home gyms, commercial facilities and fitness centers.";

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
    links: [{ rel: "canonical", href: "/about" }],
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
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <SectionHeading title="Why We Exist" as="h2" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Gym equipment is expensive, heavy and long-lived. Every year, gyms upgrade, hotels
          refurbish and home owners move on — and thousands of perfectly good machines sit idle
          while other buyers pay full retail. Gym Equipment Marketplace exists to close that gap.
        </p>

        <SectionHeading title="Who We Serve" as="h2" />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Home gym owners building a setup that lasts</li>
          <li>Commercial gyms and fitness centers fitting out or upgrading a floor</li>
          <li>Personal trainers and boutique studios working with limited space</li>
          <li>Hotels, schools, apartments and corporate facilities</li>
          <li>Sellers with single machines or whole facilities to clear</li>
        </ul>

        <SectionHeading title="How We Keep It Trustworthy" as="h2" />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Verified seller status on dealer accounts</li>
          <li>Condition stated honestly on every listing, not just "used"</li>
          <li>Full specifications, warranty and shipping terms in the open</li>
          <li>Support from our team before and after the sale</li>
        </ul>

        <p className="mt-8 text-sm">
          Questions?{" "}
          <Link to="/contact" className="font-semibold text-primary hover:underline">
            Contact our team
          </Link>{" "}
          or{" "}
          <Link to="/sell-your-equipment" className="font-semibold text-primary hover:underline">
            list your equipment
          </Link>
          .
        </p>
      </section>
    </>
  );
}
