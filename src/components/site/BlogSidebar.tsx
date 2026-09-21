import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { blogCategories, blogPosts, formatBlogDate, pickPostCoverImage } from "@/data/blog";
import { productsQueryOptions } from "@/lib/queries";

interface Promo {
  heading: string;
  body: string;
  buttonLabel: string;
  to: string;
}

export function BlogSidebar({ excludeSlug, promo }: { excludeSlug?: string; promo: Promo }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const { data: products } = useSuspenseQuery(productsQueryOptions);

  const recent = [...blogPosts]
    .filter((p) => p.slug !== excludeSlug)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 4);

  const categories = blogCategories();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/blog", search: { q: q.trim() || undefined, category: undefined } });
  };

  return (
    <aside className="space-y-8">
      <form onSubmit={submit} className="flex">
        <label htmlFor="blog-sidebar-search" className="sr-only">
          Search posts
        </label>
        <input
          id="blog-sidebar-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search posts…"
          className="h-10 w-full border border-border border-r-0 bg-background px-3 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          aria-label="Search posts"
          className="flex h-10 w-12 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Search className="size-4" />
        </button>
      </form>

      <div>
        <h2 className="font-display text-base font-bold text-foreground">Categories</h2>
        <ul className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
          {categories.map(([name, count]) => (
            <li key={name}>
              <Link
                to="/blog"
                search={{ category: name, q: undefined }}
                className="flex items-center justify-between py-1.5 text-muted-foreground transition-colors hover:text-primary"
              >
                <span>{name}</span>
                <span className="text-xs">({count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-display text-base font-bold text-foreground">Recent Posts</h2>
        <ul className="mt-3 space-y-3 border-t border-border pt-3">
          {recent.map((p) => (
            <li key={p.slug} className="flex gap-3">
              <img
                src={pickPostCoverImage(p, products)}
                alt={p.title}
                className="size-14 shrink-0 rounded-xs object-cover"
              />
              <div>
                <h3 className="text-xs leading-snug font-bold text-foreground">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-1 text-[11px] text-muted-foreground">{formatBlogDate(p.publishedAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-charcoal p-6 text-charcoal-foreground">
        <h2 className="font-display text-lg font-bold">{promo.heading}</h2>
        <p className="mt-2 text-sm text-charcoal-foreground/75">{promo.body}</p>
        <Link
          to={promo.to as never}
          className="mt-4 inline-block bg-primary px-4 py-2.5 text-xs font-bold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90"
        >
          {promo.buttonLabel}
        </Link>
      </div>
    </aside>
  );
}
