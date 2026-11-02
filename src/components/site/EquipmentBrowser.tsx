import { useEffect, useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { X } from "lucide-react";
import { z } from "zod";
import { ListingCard } from "@/components/site/Bits";
import { conditions } from "@/data/catalog";
import { productsQueryOptions } from "@/lib/queries";
import type { ProductSummary } from "@/lib/product-utils";
import { formatPrice, type CountryCode } from "@/lib/region";
import { useRegion } from "@/lib/region-context";
import {
  allTypes,
  departmentBySlug,
  departments,
  muscleGroups,
  normalizeMuscleGroup,
  unbrandedSlugs,
  type DepartmentSlug,
} from "@/lib/taxonomy";

interface Props {
  initialQuery?: string;
  /** Restrict to one department (category pages). */
  lockDepartment?: DepartmentSlug;
  /** Restrict to one equipment type (type pages); requires lockDepartment. */
  lockType?: string;
  /** Restrict to Commercial or Home equipment (usage collections). */
  lockUsage?: "Commercial" | "Home";
  onlyUsed?: boolean;
  pool?: ProductSummary[];
}

// Every filter lives in the URL rather than component state, so a filtered
// view can be bookmarked or shared, survives a refresh/back button, and
// renders server-side already filtered. Routes that declare validateSearch
// must accept these keys (see browseSearchSchema) or the router strips them.
const FILTER_KEYS = [
  "q",
  "dept",
  "type",
  "brand",
  "condition",
  "muscle",
  "state",
  "usage",
  "price",
  "sort",
  "page",
] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

// The router JSON-parses search values, so "?page=2" arrives as a number and
// "?q=2024" would too. Accept either as-is: coercing to a string here makes
// the router re-serialize it as page=%222%22 and redirect to that. Values
// are stringified where they're read (see `param` below).
const optionalString = z.union([z.string(), z.number()]).optional();
export const browseSearchSchema = z.object(
  Object.fromEntries(FILTER_KEYS.map((k) => [k, optionalString])) as Record<
    FilterKey,
    typeof optionalString
  >,
);

// Rendering every matching listing at once (this catalog runs 100+ per
// category) meant a category page's HTML was almost entirely repeated card
// markup for a handful of words of visible text per card — the direct cause
// of "low text to HTML ratio" flags on browse pages. Paginating means a
// crawler only ever sees one page's worth of cards, while real visitors can
// still page through the full set.
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

const typeName = new Map(allTypes.map((t) => [`${t.department}/${t.slug}`, t]));

function countBy<T>(items: T[], key: (item: T) => string) {
  const counts = new Map<string, number>();
  for (const item of items) {
    const k = key(item);
    if (k) counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return counts;
}

export function EquipmentBrowser({
  initialQuery = "",
  lockDepartment,
  lockType,
  lockUsage,
  onlyUsed,
  pool,
}: Props) {
  const { data: allProducts } = useSuspenseQuery(productsQueryOptions);
  const region = useRegion();
  const priceBands = useMemo(() => getPriceBands(region), [region]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const search = useSearch({ strict: false }) as Partial<Record<FilterKey, unknown>>;
  const param = (k: FilterKey) => (search[k] == null ? "" : String(search[k]));

  const urlQ = param("q") || initialQuery;
  const dept = lockDepartment ?? param("dept");
  const type = lockType ?? param("type");
  const brand = param("brand");
  const condition = param("condition");
  const muscle = param("muscle");
  const state = param("state");
  const usage = lockUsage ?? param("usage");
  const band = Math.min(Math.max(Number(param("price")) || 0, 0), priceBands.length - 1);
  const sort = param("sort") || "relevance";
  const page = Math.max(1, Number(param("page")) || 1);

  function setFilters(updates: Partial<Record<FilterKey, string | number | undefined>>) {
    void navigate({
      to: pathname as never,
      search: ((prev: Record<string, unknown>) => {
        const next: Record<string, unknown> = { ...prev, page: undefined, ...updates };
        for (const [k, v] of Object.entries(next)) {
          if (v === "" || v === undefined || v === 0 || (k === "page" && v === 1)) delete next[k];
        }
        if (next["sort"] === "relevance") delete next["sort"];
        return next;
      }) as never,
      replace: true,
      resetScroll: false,
    });
  }

  // Typing shouldn't fire a navigation per keystroke — keep the box local
  // and push it to the URL once the visitor pauses.
  const [qInput, setQInput] = useState(urlQ);
  useEffect(() => setQInput(urlQ), [urlQ]);
  useEffect(() => {
    if (qInput === urlQ) return;
    const t = setTimeout(() => setFilters({ q: qInput.trim() || undefined }), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qInput]);

  const base = useMemo(() => {
    let items = pool ?? allProducts;
    if (lockDepartment) items = items.filter((l) => l.department === lockDepartment);
    if (lockType) items = items.filter((l) => l.typeSlug === lockType);
    // Supplements carry a usage value but aren't home or commercial gym gear.
    if (lockUsage)
      items = items.filter((l) => l.usage === lockUsage && l.department !== "supplements");
    if (onlyUsed) items = items.filter((l) => l.condition !== "New");
    return items;
  }, [pool, allProducts, lockDepartment, lockType, lockUsage, onlyUsed]);

  const results = useMemo(() => {
    const needle = urlQ.trim().toLowerCase();
    let items = base.filter((l) => {
      if (needle) {
        const typeLabel = typeName.get(`${l.department}/${l.typeSlug}`)?.name ?? "";
        const haystack =
          `${l.title} ${l.brand} ${l.model} ${l.subcategory} ${typeLabel} ${l.category} ${l.city} ${l.state}`.toLowerCase();
        if (!needle.split(/\s+/).every((t) => haystack.includes(t))) return false;
      }
      if (dept && l.department !== dept) return false;
      if (type && l.typeSlug !== type) return false;
      if (brand && l.brandSlug !== brand) return false;
      if (condition && l.condition !== condition) return false;
      if (muscle && normalizeMuscleGroup(l.muscleGroup) !== muscle) return false;
      if (state && l.state !== state) return false;
      if (usage && l.usage !== usage) return false;
      const b = priceBands[band]!;
      if (l.price < b.min || l.price > b.max) return false;
      return true;
    });
    if (sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
    if (sort === "name") items = [...items].sort((a, b) => a.title.localeCompare(b.title));
    return items;
  }, [base, urlQ, dept, type, brand, condition, muscle, state, usage, band, sort, priceBands]);

  // Facet options come from the live inventory in scope, so a filter never
  // offers a value that would return nothing from the start. Brand, muscle
  // and location narrow to the chosen category/type (picking "Chest
  // Machines" shouldn't still list brands that make no chest machines);
  // the category list itself stays scoped to the page so it can be changed.
  const facets = useMemo(() => {
    const scoped = base.filter(
      (l) => (!dept || l.department === dept) && (!type || l.typeSlug === type),
    );
    const brandCounts = countBy(scoped, (l) => l.brandSlug);
    const brandNames = new Map(base.map((l) => [l.brandSlug, l.brand]));
    // Keep a selected value visible even if it no longer matches, so the
    // select doesn't silently show a different option than what's applied.
    if (brand && !brandCounts.has(brand)) brandCounts.set(brand, 0);
    const brandOptions = [...brandCounts.entries()]
      .map(([slug, count]) => ({
        slug,
        count,
        name: unbrandedSlugs.has(slug)
          ? "Unbranded / Commercial Grade"
          : (brandNames.get(slug) ?? slug),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    const muscles = countBy(scoped, (l) => normalizeMuscleGroup(l.muscleGroup));
    if (muscle && !muscles.has(muscle)) muscles.set(muscle, 0);
    const states = new Set(scoped.map((l) => l.state).filter(Boolean));
    if (state) states.add(state);
    return {
      brands: brandOptions,
      departments: countBy(base, (l) => l.department),
      types: countBy(base, (l) => `${l.department}/${l.typeSlug}`),
      muscles,
      states: [...states].sort(),
    };
  }, [base, dept, type, brand, muscle, state]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const showMuscle = (!dept || dept === "strength-equipment") && facets.muscles.size > 1;
  const lockedDept = lockDepartment ? departmentBySlug(lockDepartment) : undefined;

  const typeSelectValue = type ? `t:${dept}/${type}` : dept ? `d:${dept}` : "";
  function onTypeSelect(value: string) {
    if (!value) return setFilters({ dept: undefined, type: undefined });
    if (lockDepartment) return setFilters({ type: value });
    const [kind, rest] = [value.slice(0, 2), value.slice(2)];
    if (kind === "d:") return setFilters({ dept: rest, type: undefined });
    const [d, t] = rest.split("/");
    setFilters({ dept: d, type: t });
  }

  const chips: { label: string; clear: Partial<Record<FilterKey, undefined>> }[] = [];
  if (urlQ) chips.push({ label: `“${urlQ}”`, clear: { q: undefined } });
  if (!lockDepartment && dept && !type)
    chips.push({ label: departmentBySlug(dept)?.name ?? dept, clear: { dept: undefined } });
  if (!lockType && type)
    chips.push({
      label: typeName.get(`${dept}/${type}`)?.short ?? type,
      clear: lockDepartment ? { type: undefined } : { dept: undefined, type: undefined },
    });
  if (brand)
    chips.push({
      label: facets.brands.find((b) => b.slug === brand)?.name ?? brand,
      clear: { brand: undefined },
    });
  if (condition) chips.push({ label: condition, clear: { condition: undefined } });
  if (muscle) chips.push({ label: muscle, clear: { muscle: undefined } });
  if (state) chips.push({ label: state, clear: { state: undefined } });
  if (!lockUsage && usage) chips.push({ label: usage, clear: { usage: undefined } });
  if (band) chips.push({ label: priceBands[band]!.label, clear: { price: undefined } });

  const selectClass =
    "h-11 w-full border border-border bg-background px-2 text-base outline-none focus:border-primary md:h-10 md:text-sm";
  const labelClass = "mb-1 block text-xs font-semibold uppercase";

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-4">
        <h2 className="font-display text-lg font-bold text-foreground">Filter Equipment</h2>
        <div>
          <label htmlFor="f-q" className={labelClass}>
            Search
          </label>
          <input
            id="f-q"
            type="search"
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            placeholder="Brand, model, type…"
            className={selectClass}
          />
        </div>
        {!lockType && (
          <div>
            <label htmlFor="f-type" className={labelClass}>
              {lockedDept ? "Equipment Type" : "Category"}
            </label>
            <select
              id="f-type"
              value={lockDepartment ? type : typeSelectValue}
              onChange={(e) => onTypeSelect(e.target.value)}
              className={selectClass}
            >
              <option value="">
                {lockedDept ? `All ${lockedDept.short.toLowerCase()}` : "All categories"}
              </option>
              {lockedDept
                ? lockedDept.types
                    .filter((t) => facets.types.has(`${lockedDept.slug}/${t.slug}`))
                    .map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.short} ({facets.types.get(`${lockedDept.slug}/${t.slug}`)})
                      </option>
                    ))
                : departments
                    .filter((d) => facets.departments.has(d.slug))
                    .map((d) => (
                      <optgroup key={d.slug} label={d.name}>
                        <option value={`d:${d.slug}`}>
                          All {d.short.toLowerCase()} ({facets.departments.get(d.slug)})
                        </option>
                        {d.types
                          .filter((t) => facets.types.has(`${d.slug}/${t.slug}`))
                          .map((t) => (
                            <option key={t.slug} value={`t:${d.slug}/${t.slug}`}>
                              {t.short} ({facets.types.get(`${d.slug}/${t.slug}`)})
                            </option>
                          ))}
                      </optgroup>
                    ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="f-brand" className={labelClass}>
            Brand
          </label>
          <select
            id="f-brand"
            value={brand}
            onChange={(e) => setFilters({ brand: e.target.value })}
            className={selectClass}
          >
            <option value="">All brands ({facets.brands.length})</option>
            {facets.brands.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name} ({b.count})
              </option>
            ))}
          </select>
        </div>
        {showMuscle && (
          <div>
            <label htmlFor="f-muscle" className={labelClass}>
              Muscle Group
            </label>
            <select
              id="f-muscle"
              value={muscle}
              onChange={(e) => setFilters({ muscle: e.target.value })}
              className={selectClass}
            >
              <option value="">All muscle groups</option>
              {muscleGroups
                .filter((m) => facets.muscles.has(m))
                .map((m) => (
                  <option key={m} value={m}>
                    {m} ({facets.muscles.get(m)})
                  </option>
                ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="f-cond" className={labelClass}>
            Condition
          </label>
          <select
            id="f-cond"
            value={condition}
            onChange={(e) => setFilters({ condition: e.target.value })}
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
          <label htmlFor="f-price" className={labelClass}>
            Price
          </label>
          <select
            id="f-price"
            value={band}
            onChange={(e) => setFilters({ price: Number(e.target.value) })}
            className={selectClass}
          >
            {priceBands.map((b, i) => (
              <option key={b.label} value={i}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        {facets.states.length > 1 && (
          <div>
            <label htmlFor="f-state" className={labelClass}>
              Location
            </label>
            <select
              id="f-state"
              value={state}
              onChange={(e) => setFilters({ state: e.target.value })}
              className={selectClass}
            >
              <option value="">All locations</option>
              {facets.states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}
        {!lockUsage && (
          <div>
            <label htmlFor="f-usage" className={labelClass}>
              Commercial / Home
            </label>
            <select
              id="f-usage"
              value={usage}
              onChange={(e) => setFilters({ usage: e.target.value })}
              className={selectClass}
            >
              <option value="">Both</option>
              <option value="Commercial">Commercial</option>
              <option value="Home">Home</option>
            </select>
          </div>
        )}
      </aside>

      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
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
                Showing <strong className="text-foreground">{results.length}</strong>{" "}
                {results.length === 1 ? "listing" : "listings"}
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
              onChange={(e) => setFilters({ sort: e.target.value })}
              className="h-9 border border-border bg-background px-2 text-sm"
            >
              <option value="relevance">Most relevant</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </div>
        </div>

        {chips.length > 0 && (
          <ul className="mb-5 flex flex-wrap items-center gap-2" aria-label="Active filters">
            {chips.map((c) => (
              <li key={c.label}>
                <button
                  type="button"
                  onClick={() => setFilters(c.clear)}
                  className="inline-flex items-center gap-1.5 border border-border bg-secondary px-2.5 py-1 text-xs font-semibold hover:border-primary hover:text-primary"
                  aria-label={`Remove filter ${c.label}`}
                >
                  {c.label}
                  <X className="size-3" />
                </button>
              </li>
            ))}
            {chips.length > 1 && (
              <li>
                <button
                  type="button"
                  onClick={() =>
                    setFilters(Object.assign({}, ...chips.map((c) => c.clear)) as never)
                  }
                  className="text-xs font-bold text-primary uppercase hover:underline"
                >
                  Clear all
                </button>
              </li>
            )}
          </ul>
        )}

        {results.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            <p>No equipment matches these filters. Try widening your search.</p>
            {chips.length > 0 && (
              <button
                type="button"
                onClick={() => setFilters(Object.assign({}, ...chips.map((c) => c.clear)) as never)}
                className="mt-4 border border-border px-4 py-2 text-xs font-bold tracking-wide uppercase hover:border-primary hover:text-primary"
              >
                Clear filters
              </button>
            )}
          </div>
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
                  onClick={() => setFilters({ page: currentPage - 1 })}
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
                  onClick={() => setFilters({ page: currentPage + 1 })}
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
