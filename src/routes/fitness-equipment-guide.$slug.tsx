import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs, SectionHeading } from "@/components/site/Bits";
import { brandBySlug, categoryBySlug, guideBySlug, guides } from "@/data/catalog";

export const Route = createFileRoute("/fitness-equipment-guide/$slug")({
  loader: ({ params }) => {
    const guide = guideBySlug(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const g = loaderData.guide;
    const title = `${g.title} | Gym Equipment Marketplace`;
    return {
      meta: [
        { title },
        { name: "description", content: g.description },
        { property: "og:title", content: title },
        { property: "og:description", content: g.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/fitness-equipment-guide/${params.slug}` },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: g.description },
      ],
      links: [{ rel: "canonical", href: `/fitness-equipment-guide/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: g.title,
            description: g.description,
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
              {
                "@type": "ListItem",
                position: 2,
                name: "Fitness Equipment Guide",
                item: "/fitness-equipment-guide",
              },
              { "@type": "ListItem", position: 3, name: g.title, item: `/fitness-equipment-guide/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  component: GuideArticle,
});

function GuideArticle() {
  const { guide } = Route.useLoaderData();
  const more = guides.filter((g) => g.slug !== guide.slug).slice(0, 4);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Fitness Equipment Guide", to: "/fitness-equipment-guide" },
          { label: guide.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Buying Guide</p>
        <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">{guide.readTime}</p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{guide.description}</p>

        {guide.body.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="font-display text-xl font-bold text-charcoal">{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 30)} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-lg font-bold text-charcoal">Shop Related Equipment</h2>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {guide.related.map((slug) => {
              const category = categoryBySlug(slug);
              const brand = brandBySlug(slug);
              if (category) {
                return (
                  <li key={slug}>
                    <Link
                      to={`/${category.slug}` as never}
                      className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
                    >
                      {category.name}
                    </Link>
                  </li>
                );
              }
              if (brand) {
                return (
                  <li key={slug}>
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
              return (
                <li key={slug}>
                  <Link
                    to="/used-gym-equipment"
                    className="inline-block border border-border px-3 py-2 font-medium hover:border-primary hover:text-primary"
                  >
                    Used Gym Equipment
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </article>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="More Guides" href="/fitness-equipment-guide" linkLabel="All Articles" as="h2" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((g) => (
              <li key={g.slug} className="border border-border bg-card p-5">
                <h3 className="text-sm font-bold text-charcoal">
                  <Link to="/fitness-equipment-guide/$slug" params={{ slug: g.slug }} className="hover:text-primary">
                    {g.title}
                  </Link>
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">{g.readTime}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
