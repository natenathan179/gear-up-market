import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader, SectionHeading } from "@/components/site/Bits";
import { useSuspenseQuery } from "@tanstack/react-query";
import { brands, type Brand } from "@/data/catalog";
import { productsQueryOptions } from "@/lib/queries";
import brandsImg from "@/assets/cat-strength.avif";

const title = "Gym Equipment Brands | Compare Life Fitness, Precor, Technogym & More";
const description =
  "Compare the top gym equipment brands — Life Fitness, Precor, Technogym, Cybex, Matrix, Hammer Strength, Rogue and NordicTrack — and see which is the best fit for a home or commercial gym.";

const brandFaqs = [
  {
    q: "What's the best gym equipment brand overall?",
    a: "There isn't a single best brand — it depends on the setting. Life Fitness, Precor, Technogym, Cybex, Matrix and Hammer Strength are built for commercial-grade, high-traffic use, Rogue fits both commercial strength floors and garage gyms, and NordicTrack is built specifically for home use.",
  },
  {
    q: "What's the best gym equipment brand for a home gym?",
    a: "NordicTrack is purpose-built for home cardio, and Rogue is a strong choice for home strength equipment like racks and barbells. Buying used commercial-grade equipment from a brand like Life Fitness or Cybex is also a common route to more durable equipment at home.",
  },
  {
    q: "What's the best gym equipment brand for a commercial gym?",
    a: "Life Fitness, Precor, Technogym, Cybex, Matrix and Hammer Strength all build commercial-grade equipment used across health clubs, hotels and fitness facilities — the right one depends on whether you're prioritizing cardio, strength, or a specific setting like a boutique studio or apartment gym.",
  },
  {
    q: "Is NordicTrack commercial-grade equipment?",
    a: "No — despite some model names including 'Commercial,' NordicTrack builds home-grade cardio equipment best suited to household use rather than a staffed gym floor.",
  },
  {
    q: "Does brand matter more than condition when buying used gym equipment?",
    a: "Condition generally matters more. A well-maintained used machine from any established commercial brand will usually outperform a neglected one — brand is most useful for narrowing down what kind of equipment and build quality to expect.",
  },
];

const bestForCopy: Record<Brand["bestFor"], { label: string; className: string }> = {
  Commercial: { label: "Best for Commercial", className: "bg-charcoal text-charcoal-foreground" },
  Home: { label: "Best for Home", className: "bg-primary text-primary-foreground" },
  Both: { label: "Best for Home & Commercial", className: "bg-secondary text-foreground border border-border" },
};

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/brands" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/brands" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: brands.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            url: `/brands/${b.slug}`,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: brandFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: BrandsIndex,
});

function BrandsIndex() {
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  const commercialBrands = brands.filter((b) => b.bestFor === "Commercial" || b.bestFor === "Both");
  const homeBrands = brands.filter((b) => b.bestFor === "Home" || b.bestFor === "Both");

  return (
    <>
      <Breadcrumbs items={[{ label: "Brands" }]} />
      <PageHeader
        eyebrow="Shop by Brand"
        h1="Gym Equipment Brands"
        intro="Compare the major commercial and home fitness brands, see which is the better fit for your gym or home setup, and browse current listings for each manufacturer."
        image={brandsImg}
      />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <article className="max-w-3xl">
          <h2 className="font-display text-xl font-bold text-foreground">How to Choose a Gym Equipment Brand</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Brand is a useful starting point when shopping for gym equipment, but it matters less than most
            first-time buyers expect. The bigger question is almost always what the equipment was originally
            built for — a high-traffic commercial gym floor, a boutique studio, or a single household — since
            that shapes everything from build quality to footprint far more than the logo on the frame. The
            brands below fall fairly cleanly into three groups: brands built primarily for commercial and
            gym-floor use, one brand built specifically for the home, and one brand that genuinely fits both.
          </p>
        </article>

        <div className="mt-10 overflow-x-auto">
          <h2 className="font-display text-xl font-bold text-foreground">
            Commercial vs. Home Gym Equipment Brands
          </h2>
          <table className="mt-4 w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-bold text-foreground">Brand</th>
                <th className="py-2 pr-4 font-bold text-foreground">Best For</th>
                <th className="py-2 pr-4 font-bold text-foreground">Known For</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((b) => (
                <tr key={b.slug} className="border-b border-border/60">
                  <td className="py-2 pr-4 font-semibold text-foreground">
                    <Link to="/brands/$slug" params={{ slug: b.slug }} className="hover:text-primary">
                      {b.name}
                    </Link>
                  </td>
                  <td className="py-2 pr-4 text-muted-foreground">{bestForCopy[b.bestFor].label}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{b.bestForNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              Best Gym Equipment Brands for a Commercial Gym
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {commercialBrands.map((b) => b.name).join(", ")} all build commercial-grade equipment engineered
              for constant, multi-user traffic. Which one fits best usually comes down to whether you're
              prioritizing cardio, strength, or a specific setting like a boutique studio or apartment gym —
              see each brand's page below for what it's actually known for.
            </p>
            <Link
              to="/commercial-gym-equipment"
              className="mt-4 inline-block bg-primary px-4 py-2.5 text-xs font-bold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90"
            >
              Shop Commercial Gym Equipment
            </Link>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              Best Gym Equipment Brands for a Home Gym
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {homeBrands.map((b) => b.name).join(" and ")} are the two brands here built with a home setting
              specifically in mind — NordicTrack for home cardio, Rogue for racks and barbells that suit a
              garage gym. Buying used commercial-grade equipment from the brands above is also a common way to
              bring more durable, longer-lasting gear into a home gym at a lower price than new.
            </p>
            <Link
              to="/home-gym-equipment"
              className="mt-4 inline-block bg-primary px-4 py-2.5 text-xs font-bold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90"
            >
              Shop Home Gym Equipment
            </Link>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Want the full breakdown?{" "}
          <Link
            to="/blog/$slug"
            params={{ slug: "best-gym-equipment-brands-for-a-home-gym" }}
            className="text-primary hover:underline"
          >
            Best Gym Equipment Brands for a Home Gym
          </Link>{" "}
          and{" "}
          <Link
            to="/blog/$slug"
            params={{ slug: "best-gym-equipment-brands-for-a-commercial-gym" }}
            className="text-primary hover:underline"
          >
            Best Gym Equipment Brands for a Commercial Gym
          </Link>{" "}
          go deeper on matching a brand to your specific setup.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10">
        <SectionHeading title="Shop by Brand" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((b) => {
            const count = products.filter((l) => l.brandSlug === b.slug).length;
            const bestFor = bestForCopy[b.bestFor];
            return (
              <li key={b.slug} className="border border-border bg-card p-5">
                <span className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${bestFor.className}`}>
                  {bestFor.label}
                </span>
                <h3 className="font-display mt-2 text-lg font-bold text-foreground">
                  <Link to="/brands/$slug" params={{ slug: b.slug }} className="hover:text-primary">
                    {b.name}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-4 text-xs text-muted-foreground">{b.intro}</p>
                <p className="mt-3 text-xs font-bold text-primary uppercase">
                  {count} listing{count === 1 ? "" : "s"} →
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Gym Equipment Brand FAQs" />
          <dl className="grid gap-4 md:grid-cols-2">
            {brandFaqs.map((f) => (
              <div key={f.q} className="border border-border bg-card p-5">
                <dt className="text-sm font-bold text-foreground">{f.q}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
