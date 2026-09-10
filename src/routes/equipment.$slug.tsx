import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, MapPin, MessageSquare, ShieldCheck, Truck } from "lucide-react";
import { Breadcrumbs, ListingCard, SectionHeading, Stars } from "@/components/site/Bits";
import { categoryBySlug, listingBySlug, listings } from "@/data/catalog";

export const Route = createFileRoute("/equipment/$slug")({
  loader: ({ params }) => {
    const listing = listingBySlug(params.slug);
    if (!listing) throw notFound();
    return { listing };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const l = loaderData.listing;
    const isUsed = l.condition !== "New";
    const title = `${l.title} for Sale | Gym Equipment Marketplace`;
    const description = `Shop this ${l.condition.toLowerCase()} ${l.brand} ${l.model} in ${l.city}, ${l.state} for $${l.price.toLocaleString()}. Full specifications, shipping and seller details.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/equipment/${params.slug}` },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: `/equipment/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: l.title,
            brand: { "@type": "Brand", name: l.brand },
            model: l.model,
            description: l.description,
            itemCondition: isUsed
              ? "https://schema.org/UsedCondition"
              : "https://schema.org/NewCondition",
            offers: {
              "@type": "Offer",
              price: l.price,
              priceCurrency: "USD",
              availability: l.available
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              seller: { "@type": "Organization", name: l.seller.name },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Shop Equipment", item: "/shop-equipment" },
              { "@type": "ListItem", position: 3, name: l.title, item: `/equipment/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  component: ListingPage,
});

function ListingPage() {
  const { listing } = Route.useLoaderData();
  const category = categoryBySlug(listing.category);
  const related = listings
    .filter((l) => l.slug !== listing.slug && (l.category === listing.category || l.brandSlug === listing.brandSlug))
    .slice(0, 4);
  const isUsed = listing.condition !== "New";

  const faqs = [
    {
      q: `Is this ${listing.brand} ${listing.model} suitable for commercial use?`,
      a:
        listing.usage === "Commercial"
          ? "Yes. This unit is commercial-grade and rated for continuous use in a staffed gym, studio or facility."
          : "This unit is built for home use. For a staffed gym floor, look at the commercial equipment category instead.",
    },
    {
      q: "How is it shipped?",
      a: listing.shipping,
    },
    {
      q: "What warranty is included?",
      a: listing.warranty,
    },
    {
      q: "Can I inspect it before buying?",
      a: `Inspections can usually be arranged with the seller in ${listing.city}, ${listing.state}. Use Contact Seller to ask.`,
    },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Shop Equipment", to: "/shop-equipment" },
          ...(category ? [{ label: category.name, to: `/${category.slug}` }] : []),
          { label: listing.title },
        ]}
      />

      <article className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <img
              src={listing.image}
              alt={`${listing.title} – ${listing.condition.toLowerCase()} ${listing.subcategory.toLowerCase()} for sale in ${listing.city}, ${listing.state}`}
              width={800}
              height={600}
              className="w-full border border-border object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
              {listing.brand}
            </p>
            <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-charcoal">
              {listing.title} – {isUsed ? "Used" : "New"} Gym Equipment
            </h1>
            <p className="mt-4 text-3xl font-extrabold text-primary">
              ${listing.price.toLocaleString()}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <Row label="Brand" value={listing.brand} />
              <Row label="Model" value={listing.model} />
              <Row label="Condition" value={listing.condition} />
              <Row label="Category" value={category?.name ?? listing.category} />
              <Row label="Type" value={listing.subcategory} />
              <Row label="Use" value={listing.usage} />
              <Row label="Location" value={`${listing.city}, ${listing.state}`} />
              <Row label="Availability" value={listing.available ? "In stock" : "Sold"} />
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-bold tracking-wide uppercase text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <MessageSquare className="size-4" /> Contact Seller
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-charcoal px-5 py-3 text-sm font-bold tracking-wide uppercase transition-colors hover:bg-secondary"
              >
                Request a Quote
              </Link>
              <button className="inline-flex items-center gap-2 border border-border px-4 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
                <Heart className="size-4" /> Save
              </button>
            </div>

            <div className="mt-8 border border-border p-5">
              <h2 className="font-display text-sm font-bold tracking-wide uppercase text-charcoal">
                Seller Information
              </h2>
              <p className="mt-2 text-sm font-semibold">{listing.seller.name}</p>
              <p className="text-xs text-muted-foreground">
                {listing.seller.type} · Selling since {listing.seller.since}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Stars rating={listing.seller.rating} /> {listing.seller.rating} ({listing.seller.reviews} reviews)
              </div>
              <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="size-3.5" /> {listing.city}, {listing.state}
              </p>
              <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="size-3.5" /> {listing.shipping}
              </p>
              <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5" /> {listing.warranty}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <section>
            <SectionHeading title="Description" as="h2" />
            <p className="text-sm leading-relaxed text-muted-foreground">{listing.description}</p>
          </section>
          <section>
            <SectionHeading title="Specifications" as="h2" />
            <table className="w-full border border-border text-sm">
              <tbody>
                {listing.specs.map((s) => (
                  <tr key={s.label} className="border-b border-border last:border-0">
                    <th scope="row" className="w-1/2 bg-secondary px-3 py-2 text-left font-semibold">
                      {s.label}
                    </th>
                    <td className="px-3 py-2 text-muted-foreground">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <section className="mt-12">
          <SectionHeading title="Frequently Asked Questions" as="h2" />
          <dl className="grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="border border-border p-5">
                <dt className="text-sm font-bold text-charcoal">{f.q}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <SectionHeading title="Related Equipment" as="h2" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((l) => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </div>
        </section>
      </article>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground uppercase">{label}</dt>
      <dd className="font-semibold text-charcoal">{value}</dd>
    </div>
  );
}
