import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Breadcrumbs, PageHeader } from "@/components/site/Bits";
import { EquipmentBrowser } from "@/components/site/EquipmentBrowser";

const title = "Shop Gym Equipment for Sale | Gym Equipment Marketplace";
const description =
  "Browse gym equipment for sale from verified sellers. Search cardio machines, strength equipment, free weights and accessories by brand, condition, price and location.";

export const Route = createFileRoute("/shop-equipment")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/shop-equipment" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/shop-equipment" }],
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
      />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <EquipmentBrowser initialQuery={q ?? ""} />
      </section>
    </>
  );
}
