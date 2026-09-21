import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Calendar, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Bits";
import { BlogSidebar } from "@/components/site/BlogSidebar";
import { blogPosts, formatBlogDate, pickPostCoverImage } from "@/data/blog";
import { productsQueryOptions } from "@/lib/queries";
import heroImg from "@/assets/hero-gym.webp";
import { canonicalUrl } from "@/lib/seo";

const title = "Blog – Gym Equipment Buying Advice | Gym Equipment Marketplace";
const description =
  "Articles on buying gym equipment: where to shop, commercial vs. home gear, used and discount equipment, and how to choose cardio and strength machines.";

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/blog") }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { q, category } = Route.useSearch();
  const { data: products } = useSuspenseQuery(productsQueryOptions);

  let posts = [...blogPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  if (category) posts = posts.filter((p) => p.category === category);
  if (q) {
    const needle = q.trim().toLowerCase();
    posts = posts.filter(
      (p) => p.title.toLowerCase().includes(needle) || p.excerpt.toLowerCase().includes(needle),
    );
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <div className="relative overflow-hidden bg-charcoal-deep py-16 text-center text-charcoal-foreground">
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="relative mx-auto max-w-3xl px-4">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Gym Equipment Buying Advice
          </h1>
          <p className="mt-4 text-sm text-charcoal-foreground/80 sm:text-base">
            Tips, guides and buying advice to help you get the most out of your fitness equipment.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
              Latest Articles
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Explore our latest posts on gym equipment, buying guides and more.
            </p>

            {posts.length === 0 ? (
              <p className="mt-10 text-sm text-muted-foreground">
                No articles match that search.{" "}
                <Link
                  to="/blog"
                  search={{ q: undefined, category: undefined }}
                  className="font-semibold text-primary hover:underline"
                >
                  View all articles
                </Link>
                .
              </p>
            ) : (
              <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                {posts.map((p) => (
                  <li key={p.slug} className="group border border-border bg-card">
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="block">
                      <div className="relative">
                        <span className="absolute top-3 left-3 bg-primary px-2.5 py-1 text-[11px] font-bold tracking-wide text-primary-foreground uppercase">
                          {p.category}
                        </span>
                        <img
                          src={pickPostCoverImage(p, products)}
                          alt={p.title}
                          loading="lazy"
                          className="aspect-video w-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-bold text-foreground group-hover:text-primary">
                          {p.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="size-3.5" /> {formatBlogDate(p.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-3.5" /> {p.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <BlogSidebar
            promo={{
              heading: "Quality Equipment. Better Workouts.",
              body: "Shop new & used gym equipment from top brands at unbeatable prices.",
              buttonLabel: "Shop Now",
              to: "/shop-equipment",
            }}
          />
        </div>
      </section>
    </>
  );
}
