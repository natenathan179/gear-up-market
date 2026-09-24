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

const title = "Shop Gym Equipment for Sale – Ships to Canada | Gym Equipment Marketplace";
const description =
  "Browse gym equipment for sale from US sellers who ship to Canada. Search cardio, strength, free weights and accessories, priced in estimated CAD.";

const caShopFaqs = [
  {
    q: "Can I browse and search the full catalog from Canada?",
    a: "Yes — this page shows the same live inventory as the main marketplace, with prices shown in estimated CAD. Search and filter exactly as you would on the US site.",
  },
  {
    q: "How is equipment shipped to Canada?",
    a: "Sellers arrange freight to Canadian addresses on request. Use Enquire Now on any listing to get a shipping quote and estimated delivery time for your province before you buy.",
  },
  {
    q: "Will I pay customs duties or GST/HST?",
    a: "Yes, separately from the listed price. Canadian customs duties and GST/HST are collected by the shipping carrier on delivery, not included at checkout.",
  },
  {
    q: "What currency will I actually be charged in?",
    a: "The CAD prices shown here are estimates for convenience. Sellers invoice in USD, and your bank or card converts the charge at its own exchange rate.",
  },
];

export const Route = createFileRoute("/ca/shop-equipment")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: ({ match }) => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/ca/shop-equipment" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(match.search.q ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [
      { rel: "canonical", href: canonicalUrl("/ca/shop-equipment") },
      ...hreflangLinks({
        us: "/shop-equipment",
        ca: "/ca/shop-equipment",
        uk: "/uk/shop-equipment",
      }),
    ],
    scripts: faqSchema(caShopFaqs),
  }),
  component: CaShopPage,
});

function CaShopPage() {
  const { q } = Route.useSearch();
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Shipping to Canada", to: "/ca" }, { label: "Shop Equipment" }]}
      />
      <PageHeader
        eyebrow="Gym Equipment Marketplace — Canada"
        h1="Gym Equipment for Sale, Shipped to Canada"
        intro="Search every listing on the marketplace by product name, brand, equipment type or model number. Prices shown are estimated in CAD — sellers quote freight and customs separately."
        image={shopImg}
      />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <EquipmentBrowser initialQuery={q ?? ""} />
      </section>

      <CategoryShowcase prefix="/ca" />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <FaqList faqs={caShopFaqs} title="Shopping from Canada: FAQs" />
      </section>
    </>
  );
}
