import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  Breadcrumbs,
  CategoryShowcase,
  FaqList,
  PageHeader,
  faqSchema,
} from "@/components/site/Bits";
import { EquipmentBrowser } from "@/components/site/EquipmentBrowser";
import shopImg from "@/assets/cat-commercial.jpg";
import { canonicalUrl, hreflangLinks } from "@/lib/seo";

const title = "Shop Gym Equipment for Sale – Ships to the UK | Gym Equipment Marketplace";
const description =
  "Browse gym equipment for sale from US sellers who ship to the UK. Search cardio, strength, free weights and accessories, priced in estimated GBP.";

const ukShopFaqs = [
  {
    q: "Can I browse and search the full catalog from the UK?",
    a: "Yes — this page shows the same live inventory as the main marketplace, with prices shown in estimated GBP. Search and filter exactly as you would on the US site.",
  },
  {
    q: "How is equipment shipped to the UK?",
    a: "Sellers arrange freight to UK addresses on request. Use Enquire Now on any listing to get a shipping quote and estimated delivery time for your postcode before you buy.",
  },
  {
    q: "Will I pay import VAT or customs duty?",
    a: "Yes, separately from the listed price. UK import VAT and any customs duty are collected by the shipping carrier on delivery, not included at checkout.",
  },
  {
    q: "What currency will I actually be charged in?",
    a: "The GBP prices shown here are estimates for convenience. Sellers invoice in USD, and your bank or card converts the charge at its own exchange rate.",
  },
];

export const Route = createFileRoute("/uk/shop-equipment")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: ({ match }) => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/uk/shop-equipment" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(match.search.q ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [
      { rel: "canonical", href: canonicalUrl("/uk/shop-equipment") },
      ...hreflangLinks({
        us: "/shop-equipment",
        ca: "/ca/shop-equipment",
        uk: "/uk/shop-equipment",
      }),
    ],
    scripts: faqSchema(ukShopFaqs),
  }),
  component: UkShopPage,
});

function UkShopPage() {
  const { q } = Route.useSearch();
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Shipping to the UK", to: "/uk" }, { label: "Shop Equipment" }]}
      />
      <PageHeader
        eyebrow="Gym Equipment Marketplace — UK"
        h1="Gym Equipment for Sale, Shipped to the UK"
        intro="Search every listing on the marketplace by product name, brand, equipment type or model number. Prices shown are estimated in GBP — sellers quote freight and import VAT separately."
        image={shopImg}
      />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <EquipmentBrowser initialQuery={q ?? ""} />
      </section>

      <CategoryShowcase prefix="/uk" />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <FaqList faqs={ukShopFaqs} title="Shopping from the UK: FAQs" />
      </section>
    </>
  );
}
