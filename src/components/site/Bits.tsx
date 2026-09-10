import { Link } from "@tanstack/react-router";
import { ChevronRight, MapPin, Star } from "lucide-react";
import type { Listing } from "@/data/catalog";

export function SectionHeading({
  title,
  href,
  linkLabel,
  as = "h2",
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  as?: "h2" | "h3";
}) {
  const Tag = as;
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <Tag className="font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">
          {title}
        </Tag>
        <span className="mt-2 block h-1 w-14 bg-primary" />
      </div>
      {href && linkLabel && (
        <Link
          to={href as never}
          className="group inline-flex items-center gap-1 text-sm font-semibold text-primary"
        >
          {linkLabel}
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-secondary">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-3 text-xs text-muted-foreground">
        <li>
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1">
            <ChevronRight className="size-3" />
            {item.to ? (
              <Link to={item.to as never} className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-charcoal">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  h1,
  intro,
  eyebrow,
}: {
  h1: string;
  intro: string;
  eyebrow?: string;
}) {
  return (
    <div className="bg-charcoal py-12 text-charcoal-foreground">
      <div className="mx-auto max-w-7xl px-4">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-primary uppercase">{eyebrow}</p>
        )}
        <h1 className="font-display max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          {h1}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-charcoal-foreground/75">{intro}</p>
      </div>
    </div>
  );
}

export function ConditionBadge({ condition }: { condition: string }) {
  const isNew = condition === "New";
  return (
    <span
      className={`absolute top-2 left-2 rounded-xs px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
        isNew ? "bg-primary text-primary-foreground" : "bg-charcoal text-charcoal-foreground"
      }`}
    >
      {isNew ? "New" : "Used"}
    </span>
  );
}

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="group flex flex-col border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="relative bg-secondary">
        <ConditionBadge condition={listing.condition} />
        <img
          src={listing.image}
          alt={`${listing.brand} ${listing.model} – ${listing.condition.toLowerCase()} ${listing.subcategory.toLowerCase()} for sale`}
          loading="lazy"
          width={800}
          height={600}
          className="aspect-4/3 w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-xs text-muted-foreground">{listing.brand}</p>
        <h3 className="mt-0.5 text-sm leading-snug font-bold text-charcoal">
          <Link to="/equipment/$slug" params={{ slug: listing.slug }} className="hover:text-primary">
            {listing.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">Condition: {listing.condition}</p>
        <p className="mt-2 text-lg font-extrabold text-primary">
          ${listing.price.toLocaleString()}
        </p>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3" /> {listing.city}, {listing.state}
        </p>
        <Link
          to="/equipment/$slug"
          params={{ slug: listing.slug }}
          className="mt-3 block bg-primary py-2 text-center text-xs font-bold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
        />
      ))}
    </span>
  );
}
