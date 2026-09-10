import { createFileRoute, Link } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/CategoryPage";
import { SectionHeading } from "@/components/site/Bits";
import { categoryBySlug, solutions } from "@/data/catalog";

const category = categoryBySlug("commercial-gym-equipment")!;

export const Route = createFileRoute("/commercial-gym-equipment/")({
  head: categoryHead(
    "commercial-gym-equipment",
    "Commercial Gym Equipment for Sale | Gym Equipment Marketplace",
    "Buy commercial gym equipment for gyms, hotels, schools and fitness centers. Full gym packages and single machines, new, refurbished and used, shipped nationwide.",
  ),
  component: CommercialIndex,
});

function CommercialIndex() {
  return (
    <>
      <CategoryPage category={category} />
      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Equipment by Facility Type" as="h2" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <li key={s.slug} className="border border-border bg-card p-5">
                <h3 className="text-sm font-bold text-charcoal">
                  <Link
                    to="/commercial-gym-equipment/$solution"
                    params={{ solution: s.slug }}
                    className="hover:text-primary"
                  >
                    {s.name}
                  </Link>
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">{s.intro}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
