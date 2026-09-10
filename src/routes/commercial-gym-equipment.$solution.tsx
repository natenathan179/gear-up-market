import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs, ListingCard, PageHeader, SectionHeading } from "@/components/site/Bits";
import { listings, solutionBySlug, solutions } from "@/data/catalog";

export const Route = createFileRoute("/commercial-gym-equipment/$solution")({
  loader: ({ params }) => {
    const solution = solutionBySlug(params.solution);
    if (!solution) throw notFound();
    return { solution };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.solution.name} for Sale | Gym Equipment Marketplace`;
    const description = loaderData.solution.intro.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/commercial-gym-equipment/${params.solution}` },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: `/commercial-gym-equipment/${params.solution}` }],
    };
  },
  component: SolutionPage,
});

function SolutionPage() {
  const { solution } = Route.useLoaderData();
  const picks = listings.filter((l) => l.usage === "Commercial").slice(0, 8);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Commercial Gym Equipment", to: "/commercial-gym-equipment" },
          { label: solution.name },
        ]}
      />
      <PageHeader eyebrow="Commercial Solutions" h1={solution.h1} intro={solution.intro} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeading title="What to Look For" as="h2" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {solution.points.map((p) => (
            <li key={p} className="border-l-2 border-primary bg-secondary px-4 py-3 text-sm">
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <SectionHeading
          title="Recommended Equipment"
          href="/commercial-gym-equipment"
          linkLabel="All Commercial Equipment"
          as="h2"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {picks.map((l) => (
            <ListingCard key={l.slug} listing={l} />
          ))}
        </div>
      </section>

      <section className="bg-secondary py-10">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Other Facility Types" as="h2" />
          <ul className="flex flex-wrap gap-2 text-sm">
            {solutions
              .filter((s) => s.slug !== solution.slug)
              .map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/commercial-gym-equipment/$solution"
                    params={{ solution: s.slug }}
                    className="inline-block border border-border bg-card px-3 py-2 font-medium hover:border-primary hover:text-primary"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
