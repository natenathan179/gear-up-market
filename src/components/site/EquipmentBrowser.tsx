import { useEffect, useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ListingCard } from "@/components/site/Bits";
import { brands, conditions } from "@/data/catalog";
import { productsQueryOptions } from "@/lib/queries";
import type { ProductSummary } from "@/lib/product-utils";
import { formatPrice, type CountryCode } from "@/lib/region";
import { useRegion } from "@/lib/region-context";

interface Props {
  initialQuery?: string;
  lockCategory?: string;
  onlyUsed?: boolean;
  pool?: ProductSummary[];
}

// Rendering every matching listing at once (this catalog runs 100+ per
// category) meant a category page's HTML was almost entirely repeated card
// markup for a handful of words of visible text per card — the direct cause
// of "low text to HTML ratio" flags on browse pages. Paginating client-side
// means a crawler (which never clicks "Next") only ever sees one page's
// worth of cards, while real visitors can still page through the full set.
const PAGE_SIZE = 24;

function getPriceBands(country: CountryCode) {
  return [
    { label: "Any price", min: 0, max: Infinity },
    { label: `Under ${formatPrice(1000, country)}`, min: 0, max: 1000 },
    {
      label: `${formatPrice(1000, country)} – ${formatPrice(3000, country)}`,
      min: 1000,
      max: 3000,
    },
    {
      label: `${formatPrice(3000, country)} – ${formatPrice(6000, country)}`,
      min: 3000,
      max: 6000,
    },
    { label: `Over ${formatPrice(6000, country)}`, min: 6000, max: Infinity },
  ];
}

export function EquipmentBrowser({ initialQuery = "", lockCategory, onlyUsed, pool }: Props) {
  const { data: allProducts } = useSuspenseQuery(productsQueryOptions);
  const region = useRegion();
  const priceBands = useMemo(() => getPriceBands(region), [region]);

  const base = useMemo(() => {
    let items = pool ?? allProducts;
    if (lockCategory) items = items.filter((l) => l.category === lockCategory);
    if (onlyUsed) items = items.filter((l) => l.condition !== "New");
    return items;
  }, [pool, allProducts, lockCategory, onlyUsed]);

  const [q, setQ] = useState(initialQuery);
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [state, setState] = useState("");
  const [usage, setUsage] = useState("");
  const [band, setBand] = useState(0);
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);

  const states = useMemo(() => [...new Set(base.map((l) => l.state))].sort(), [base]);
  const availableBrands = useMemo(
    () => brands.filter((b) => base.some((l) => l.brandSlug === b.slug)),
    [base],
  );

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let items = base.filter((l) => {
      const haystack =
        `${l.title} ${l.brand} ${l.model} ${l.subcategory} ${l.category} ${l.city} ${l.state}`.toLowerCase();
      if (needle && !needle.split(/\s+/).every((t) => haystack.includes(t))) return false;
      if (brand && l.brandSlug !== brand) return false;
      if (condition && l.condition !== condition) return false;
      if (state && l.state !== state) return false;
      if (usage && l.usage !== usage) return false;
      const b = priceBands[band]!;
      if (l.price < b.min || l.price > b.max) return false;
      return true;
    });
    if (sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [base, q, brand, condition, state, usage, band, sort, priceBands]);

  useEffect(() => {
    setPage(1);
  }, [q, brand, condition, state, usage, band, sort, lockCategory, onlyUsed]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const selectClass =
    "h-11 w-full border border-border bg-background px-2 text-base outline-none focus:border-primary md:h-10 md:text-sm";

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-4">
        <h2 className="font-display text-lg font-bold text-foreground">Filter Equipment</h2>
        <div>
          <label htmlFor="f-q" className="mb-1 block text-xs font-semibold uppercase">
            Search
          </label>
          <input
            id="f-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Brand, model, type…"
            className={selectClass}
          />
        </div>
        <div>
          <label htmlFor="f-brand" className="mb-1 block text-xs font-semibold uppercase">
            Brand
          </label>
          <select
            id="f-brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className={selectClass}
          >
            <option value="">All brands</option>
            {availableBrands.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-cond" className="mb-1 block text-xs font-semibold uppercase">
            Condition
          </label>
          <select
            id="f-cond"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className={selectClass}
          >
            <option value="">Any condition</option>
            {conditions
              .filter((c) => !onlyUsed || c !== "New")
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-price" className="mb-1 block text-xs font-semibold uppercase">
            Price
          </label>
          <select
            id="f-price"
            value={band}
            onChange={(e) => setBand(Number(e.target.value))}
            className={selectClass}
          >
            {priceBands.map((b, i) => (
              <option key={b.label} value={i}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-state" className="mb-1 block text-xs font-semibold uppercase">
            Location
          </label>
          <select
            id="f-state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={selectClass}
          >
            <option value="">All locations</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-usage" className="mb-1 block text-xs font-semibold uppercase">
            Commercial / Home
          </label>
          <select
            id="f-usage"
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
            className={selectClass}
          >
            <option value="">Both</option>
            <option value="Commercial">Commercial</option>
            <option value="Home">Home</option>
          </select>
        </div>
      </aside>

      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
          <p className="text-sm text-muted-foreground">
            {results.length > PAGE_SIZE ? (
              <>
                Showing{" "}
                <strong className="text-foreground">
                  {(currentPage - 1) * PAGE_SIZE + 1}–
                  {Math.min(currentPage * PAGE_SIZE, results.length)}
                </strong>{" "}
                of <strong className="text-foreground">{results.length}</strong> listings
              </>
            ) : (
              <>
                Showing <strong className="text-foreground">{results.length}</strong> listings
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="f-sort" className="text-xs font-semibold uppercase">
              Sort
            </label>
            <select
              id="f-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-9 border border-border bg-background px-2 text-sm"
            >
              <option value="relevance">Most relevant</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>

        {results.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No equipment matches these filters. Try widening your search.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {paged.map((l) => (
                <ListingCard key={l.slug} listing={l} />
              ))}
            </div>
            {pageCount > 1 && (
              <nav
                aria-label="Listings pagination"
                className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-5"
              >
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="border border-border px-4 py-2 text-xs font-bold uppercase tracking-wide hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
                >
                  Previous
                </button>
                <p className="text-sm text-muted-foreground">
                  Page <strong className="text-foreground">{currentPage}</strong> of{" "}
                  <strong className="text-foreground">{pageCount}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={currentPage === pageCount}
                  className="border border-border px-4 py-2 text-xs font-bold uppercase tracking-wide hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
