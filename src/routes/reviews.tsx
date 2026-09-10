import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Breadcrumbs, PageHeader, SectionHeading, Stars } from "@/components/site/Bits";
import { reviewsQueryOptions } from "@/lib/queries";

const title = "Customer Reviews – Gym Equipment Marketplace Ratings";
const description =
  "Read verified customer reviews of Gym Equipment Marketplace. Real buyer feedback on used commercial gym equipment, freight delivery, condition grading and seller service.";

export const Route = createFileRoute("/reviews")({
  loader: ({ context }) => context.queryClient.ensureQueryData(reviewsQueryOptions),
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-2xl font-bold">Reviews are unavailable right now</h1>
      <p className="mt-3 text-sm text-muted-foreground">Please refresh the page to try again.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-2xl font-bold">Page not found</h1>
    </div>
  ),
  head: ({ loaderData }) => {
    const count = loaderData?.length ?? 0;
    const average =
      count > 0
        ? (loaderData!.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1)
        : "5.0";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/reviews" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: "/reviews" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Gym Equipment Marketplace",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: average,
              reviewCount: count,
              bestRating: 5,
            },
            review: (loaderData ?? []).slice(0, 12).map((r) => ({
              "@type": "Review",
              author: { "@type": "Person", name: r.name },
              reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
              reviewBody: r.quote,
            })),
          }),
        },
      ],
    };
  },
  component: ReviewsPage,
});

function ReviewsPage() {
  const { data: reviews } = useSuspenseQuery(reviewsQueryOptions);
  const count = reviews.length;
  const average = count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 5;
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    total: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <>
      <Breadcrumbs items={[{ label: "Customer Reviews" }]} />
      <PageHeader
        eyebrow="Customer Feedback"
        h1="Gym Equipment Marketplace Reviews"
        intro="Buyers use this marketplace to source commercial treadmills, strength machines, racks and free weights — new, refurbished and used. Below is the feedback they have left about equipment condition, freight delivery, seller communication and after-sale support."
      />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 border border-border bg-card p-6 md:grid-cols-[240px_1fr]">
          <div className="text-center md:text-left">
            <p className="font-display text-5xl font-extrabold text-primary">
              {average.toFixed(1)}
            </p>
            <div className="mt-2 flex justify-center md:justify-start">
              <Stars rating={average} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on {count} customer reviews
            </p>
          </div>
          <ul className="space-y-2">
            {distribution.map((row) => (
              <li key={row.star} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-muted-foreground">{row.star} star</span>
                <span className="h-2 flex-1 bg-secondary">
                  <span
                    className="block h-2 bg-primary"
                    style={{ width: `${count ? (row.total / count) * 100 : 0}%` }}
                  />
                </span>
                <span className="w-8 text-right text-muted-foreground">{row.total}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <SectionHeading title={`All ${count} Reviews`} as="h2" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.id} className="flex flex-col border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <img
                  src={r.avatarUrl}
                  alt={`${r.name}, verified buyer from ${r.location}`}
                  loading="lazy"
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.location}</p>
                </div>
              </div>
              <div className="mt-3">
                <Stars rating={r.rating} />
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                “{r.quote}”
              </blockquote>
              {r.productTitle && (
                <figcaption className="mt-3 text-xs text-muted-foreground">
                  Purchased: <span className="font-semibold text-foreground">{r.productTitle}</span>
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-2xl font-extrabold text-foreground">
            Ready to find your equipment?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Browse current listings, or tell us what you need and we will source it from our seller
            network.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop-equipment"
              className="bg-primary px-5 py-3 text-sm font-bold uppercase text-primary-foreground hover:bg-primary/90"
            >
              Shop equipment
            </Link>
            <Link
              to="/contact"
              className="border border-border px-5 py-3 text-sm font-bold uppercase hover:bg-card"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
