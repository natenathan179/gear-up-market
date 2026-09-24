import { Suspense } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, PackageCheck, Truck, type LucideIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Breadcrumbs,
  FaqList,
  ListingCard,
  PageHeader,
  SectionHeading,
  faqSchema,
} from "@/components/site/Bits";
import { Skeleton } from "@/components/ui/skeleton";
import { categories } from "@/data/catalog";
import { productsQueryOptions } from "@/lib/queries";
import { canonicalUrl, hreflangLinks } from "@/lib/seo";
import { categoryThumb } from "@/lib/catalog-images";
import heroImg from "@/assets/hero-gym.webp";

const title = "Gym Equipment for Sale in Canada – Ships from the US | Gym Equipment Marketplace";
const description =
  "Shop new and used gym equipment for sale, priced in estimated CAD and shipped from US sellers to Canada. Browse cardio, strength, free weights and commercial gym equipment.";

const caFaqs = [
  {
    q: "Do you ship gym equipment to Canada?",
    a: "Yes — every listing on the marketplace ships from US-based sellers to Canadian addresses. Sellers quote freight, customs handling and delivery time before you pay.",
  },
  {
    q: "Are customs duties and taxes included in the price?",
    a: "No. The listed price covers the equipment itself — Canadian customs duties, GST/HST and any brokerage fees are billed separately by the carrier on delivery. Ask the seller for an estimate before you order.",
  },
  {
    q: "What currency are prices shown in?",
    a: "Prices on these pages are shown as an estimated CAD conversion for convenience. Sellers invoice in USD, so your final charge depends on the exchange rate at the time of payment.",
  },
  {
    q: "How long does delivery to Canada take?",
    a: "Cross-border freight typically takes longer than domestic US delivery. Sellers can give you a specific estimate for your province once you enquire about a listing.",
  },
];

export const Route = createFileRoute("/ca/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/ca" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: canonicalUrl("/ca") },
      ...hreflangLinks({ us: "/", ca: "/ca", uk: "/uk" }),
    ],
    scripts: faqSchema(caFaqs),
  }),
  component: CanadaLanding,
});

function FeaturedSection() {
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  const featured = products.filter((l) => l.featured).slice(0, 6);
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {featured.map((l) => (
        <ListingCard key={l.slug} listing={l} />
      ))}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title: t,
  copy,
}: {
  icon: LucideIcon;
  title: string;
  copy: string;
}) {
  return (
    <div className="border border-border bg-card p-5">
      <Icon className="size-6 text-primary" />
      <h3 className="mt-3 text-sm font-bold text-foreground">{t}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{copy}</p>
    </div>
  );
}

function CanadaLanding() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Shipping to Canada" }]} />
      <PageHeader
        eyebrow="Gym Equipment Marketplace — Canada"
        h1="Gym Equipment for Sale, Shipped to Canada"
        intro="Browse the same live inventory of new and used gym equipment sold on the marketplace, shipped from US sellers straight to Canada. Prices below are shown in estimated CAD."
        image={heroImg}
      />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <InfoCard
            icon={Truck}
            title="Cross-Border Shipping"
            copy="Sellers quote freight and delivery time to your province before you pay."
          />
          <InfoCard
            icon={PackageCheck}
            title="Customs Handled by Carrier"
            copy="Duties, GST/HST and brokerage are billed on delivery — not included in the listed price."
          />
          <InfoCard
            icon={Globe2}
            title="CAD Estimates"
            copy="Prices shown here are an estimated CAD conversion; sellers invoice in USD."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <SectionHeading
          title="Shop by Category"
          href="/ca/shop-equipment"
          linkLabel="Browse All Equipment"
          as="h2"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <article key={c.slug} className="border border-border bg-card">
              <img
                src={categoryThumb(c.slug)}
                alt={`${c.name} for sale, shipped to Canada`}
                loading="lazy"
                width={800}
                height={600}
                className="aspect-4/3 w-full object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-bold text-foreground">{c.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.blurb}</p>
                <Link
                  to={`/ca/${c.slug}` as never}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary uppercase"
                >
                  Shop Now <ArrowRight className="size-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="Featured Equipment"
            href="/ca/shop-equipment"
            linkLabel="View All Products"
            as="h2"
          />
          <Suspense
            fallback={
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-3/4 w-full" />
                ))}
              </div>
            }
          >
            <FeaturedSection />
          </Suspense>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <Link
          to="/ca/shop-equipment"
          className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold tracking-wide uppercase text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Shop Gym Equipment <ArrowRight className="size-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <FaqList faqs={caFaqs} title="Shipping to Canada: FAQs" />
      </section>
    </>
  );
}
