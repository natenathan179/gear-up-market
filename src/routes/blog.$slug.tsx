import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { Breadcrumbs, ListingCard } from "@/components/site/Bits";
import { BlogSidebar } from "@/components/site/BlogSidebar";
import { brandBySlug, categoryBySlug, guideBySlug, locationBySlug, solutionBySlug } from "@/data/catalog";
import { blogPostBySlug, formatBlogDate, pickPostCoverImage, type BlogProductShowcase } from "@/data/blog";
import { productsQueryOptions } from "@/lib/queries";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.post;
    const title = `${p.seoTitle} | Gym Equipment Marketplace`;
    return {
      meta: [
        { title },
        { name: "description", content: p.metaDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: p.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: p.metaDescription },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.metaDescription,
            datePublished: p.publishedAt,
            publisher: { "@type": "Organization", name: "Gym Equipment Marketplace" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
              { "@type": "ListItem", position: 3, name: p.title, item: `/blog/${params.slug}` },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: p.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: BlogArticle,
});

function BlogArticle() {
  const { post } = Route.useLoaderData();
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  const coverImage = pickPostCoverImage(post, products);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Blog", to: "/blog" }, { label: post.category }, { label: post.title }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article>
            <div className="relative">
              <span className="absolute top-3 left-3 bg-primary px-2.5 py-1 text-[11px] font-bold tracking-wide text-primary-foreground uppercase">
                {post.category}
              </span>
              <img
                src={coverImage}
                alt={post.title}
                className="aspect-[16/9] w-full rounded-xs object-cover sm:aspect-[21/9]"
              />
            </div>

            <h1 className="font-display mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5" /> {formatBlogDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" /> {post.readTime}
              </span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>

            <ProductShowcase showcase={post.products} />

            {post.body.map((section, i) => (
              <section key={section.heading} className="mt-10">
                <h2 className="font-display text-xl font-bold text-foreground">
                  {i + 1}. {section.heading}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.table && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          {section.table.headers.map((h) => (
                            <th key={h} className="py-2 pr-4 font-bold text-foreground">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row[0]} className="border-b border-border/60">
                            {row.map((cell, ci) => (
                              <td key={ci} className="py-2 pr-4 text-muted-foreground">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {section.cta && (
                  <Link
                    to={section.cta.to as never}
                    params={section.cta.params as never}
                    search={section.cta.search as never}
                    className="mt-4 inline-block bg-primary px-4 py-2.5 text-xs font-bold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90"
                  >
                    {section.cta.label}
                  </Link>
                )}
              </section>
            ))}

            <div className="mt-10 flex gap-3 border border-primary/30 bg-primary/10 p-5">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h2 className="font-display text-sm font-bold text-foreground">Final Thoughts</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{post.finalThoughts}</p>
              </div>
            </div>

            {post.faqs.length > 0 && (
              <section className="mt-12 border-t border-border pt-8">
                <h2 className="font-display text-xl font-bold text-foreground">Frequently Asked Questions</h2>
                <dl className="mt-4 space-y-5">
                  {post.faqs.map((f) => (
                    <div key={f.q}>
                      <dt className="text-sm font-bold text-foreground">{f.q}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <section className="mt-12 border-t border-border pt-8">
              <h2 className="font-display text-lg font-bold text-foreground">Shop Related Equipment</h2>
              <ul className="mt-3 flex flex-wrap gap-2 text-sm">
                {post.related.map((slug) => (
                  <RelatedLink key={slug} slug={slug} />
                ))}
              </ul>
            </section>

            <div className="mt-10 flex flex-col items-start gap-4 bg-charcoal p-8 text-charcoal-foreground sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-bold">{post.ctaBanner.heading}</h2>
                <p className="mt-1.5 text-sm text-charcoal-foreground/75">{post.ctaBanner.body}</p>
              </div>
              <Link
                to={post.ctaBanner.to as never}
                className="inline-block shrink-0 bg-primary px-5 py-3 text-xs font-bold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90"
              >
                {post.ctaBanner.buttonLabel}
              </Link>
            </div>
          </article>

          <BlogSidebar
            excludeSlug={post.slug}
            promo={{
              heading: "Shop the Best Brands",
              body: "Find top brands like Life Fitness, Precor, Rogue and more.",
              buttonLabel: "Browse Brands",
              to: "/brands",
            }}
          />
        </div>
      </section>
    </>
  );
}

function RelatedLink({ slug }: { slug: string }) {
  const category = categoryBySlug(slug);
  if (category) {
    return (
      <li>
        <Link
          to={`/${category.slug}` as never}
          className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
        >
          {category.name}
        </Link>
      </li>
    );
  }
  const guide = guideBySlug(slug);
  if (guide) {
    return (
      <li>
        <Link
          to="/fitness-equipment-guide/$slug"
          params={{ slug: guide.slug }}
          className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
        >
          {guide.title}
        </Link>
      </li>
    );
  }
  const solution = solutionBySlug(slug);
  if (solution) {
    return (
      <li>
        <Link
          to="/commercial-gym-equipment/$solution"
          params={{ solution: solution.slug }}
          className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
        >
          {solution.name}
        </Link>
      </li>
    );
  }
  const location = locationBySlug(slug);
  if (location) {
    return (
      <li>
        <Link
          to="/gym-equipment-for-sale/$state"
          params={{ state: location.slug }}
          className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
        >
          Gym Equipment for Sale in {location.state}
        </Link>
      </li>
    );
  }
  const brand = brandBySlug(slug);
  if (brand) {
    return (
      <li>
        <Link
          to="/brands/$slug"
          params={{ slug: brand.slug }}
          className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
        >
          {brand.name}
        </Link>
      </li>
    );
  }
  const post = blogPostBySlug(slug);
  if (post) {
    return (
      <li>
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
        >
          {post.title}
        </Link>
      </li>
    );
  }
  return (
    <li>
      <Link
        to="/used-gym-equipment"
        className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
      >
        Used Gym Equipment
      </Link>
    </li>
  );
}

function ProductShowcase({ showcase }: { showcase: BlogProductShowcase }) {
  const { data: allProducts } = useSuspenseQuery(productsQueryOptions);

  let pool = allProducts;
  if (showcase.category) pool = pool.filter((p) => p.category === showcase.category);
  if (showcase.onlyUsed) pool = pool.filter((p) => p.condition !== "New");
  if (showcase.search) {
    const needles = (Array.isArray(showcase.search) ? showcase.search : [showcase.search]).map((s) =>
      s.toLowerCase(),
    );
    pool = pool.filter((p) => {
      const haystack = `${p.title} ${p.subcategory}`.toLowerCase();
      return needles.some((n) => haystack.includes(n));
    });
  }
  const featured = pool.filter((p) => p.featured);
  const rest = pool.filter((p) => !p.featured);
  const sample = [...featured, ...rest].slice(0, 4);

  if (sample.length === 0) return null;

  return (
    <section className="mt-10 border-t border-border pt-8">
      <h2 className="font-display text-xl font-bold text-foreground">{showcase.heading}</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {sample.map((listing) => (
          <ListingCard key={listing.slug} listing={listing} />
        ))}
      </div>
      <Link
        to={showcase.moreLink.to as never}
        className="mt-5 inline-block bg-primary px-4 py-2.5 text-xs font-bold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90"
      >
        {showcase.moreLink.label}
      </Link>
    </section>
  );
}
