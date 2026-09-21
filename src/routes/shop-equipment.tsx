import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Breadcrumbs, FaqList, PageHeader, SectionHeading, faqSchema } from "@/components/site/Bits";
import { EquipmentBrowser } from "@/components/site/EquipmentBrowser";
import shopImg from "@/assets/cat-commercial.jpg";
import { canonicalUrl } from "@/lib/seo";

const title = "Shop Gym Equipment for Sale | Gym Equipment Marketplace";
const description =
  "Browse gym equipment for sale from verified sellers. Search cardio machines, strength equipment, free weights and accessories by brand, condition, price and location.";

const shopFaqs = [
  {
    q: "How do I search for specific gym equipment?",
    a: "Type a brand, model, equipment type or keyword into the search box — it matches against every listing's title, brand, model and category at once, so searching \"Precor treadmill\" or \"power rack\" both work.",
  },
  {
    q: "Can I filter results by price, brand or location?",
    a: "Yes — use the filters on the left to narrow by brand, condition, price band, state and whether the equipment is built for commercial or home use. Filters combine, so you can search and filter at the same time.",
  },
  {
    q: "What does \"Commercial\" vs \"Home\" mean in the filters?",
    a: "Commercial equipment is built for continuous, multi-user use in a staffed gym or facility. Home equipment is built for lighter, occasional use by one household. The filter helps you skip listings that don't match your setup.",
  },
  {
    q: "How current are the listings?",
    a: "Sellers add and update inventory continuously, and each listing shows its condition and availability directly. If a machine shows as sold, similar equipment from the same category is usually available.",
  },
  {
    q: "What if I can't find what I'm looking for?",
    a: "Clear or widen your filters first, since a narrow price or location filter can hide close matches. If nothing fits, use Enquire Now on a similar listing — sellers can often source comparable equipment.",
  },
];

export const Route = createFileRoute("/shop-equipment")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: ({ match }) => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/shop-equipment" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      // Search-filtered results are near-duplicates of the unfiltered page;
      // keep them crawlable (for internal link equity) but out of the index.
      ...(match.search.q ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/shop-equipment") }],
    scripts: faqSchema(shopFaqs),
  }),
  component: ShopPage,
});

function ShopPage() {
  const { q } = Route.useSearch();
  return (
    <>
      <Breadcrumbs items={[{ label: "Shop Equipment" }]} />
      <PageHeader
        eyebrow="Gym Equipment Marketplace"
        h1="Gym Equipment for Sale"
        intro="Search every listing on the marketplace by product name, brand, equipment type or model number, then narrow by condition, price, location and whether the machine is built for commercial or home use."
        image={shopImg}
      />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <EquipmentBrowser initialQuery={q ?? ""} />
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="How Shopping on the Marketplace Works" as="h2" />
          <div className="grid gap-6 text-sm text-muted-foreground md:grid-cols-3">
            <p>
              Every listing shows brand, model, condition, price and location up front, so you can
              compare equipment without contacting each seller first. Photos and specifications are
              provided directly on the listing page.
            </p>
            <p>
              Use Enquire Now to ask a seller a question or request a quote, or add a listing to
              your cart to request pricing on several items at once. Nothing is charged online —
              payment and delivery are arranged directly with the seller.
            </p>
            <p>
              New equipment ships from dealers, refurbished machines come inspected and serviced
              with a warranty, and used equipment is sold as-is from gyms, studios and private
              sellers upgrading their floor.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <FaqList faqs={shopFaqs} title="Shopping FAQs" />
      </section>
    </>
  );
}
