import { createServerFn } from "@tanstack/react-start";
import type { Database } from "@/integrations/supabase/types";
import {
  PRODUCT_SUMMARY_COLUMNS,
  rowToProduct,
  rowToProductSummary,
  rowToReview,
  signImagePaths,
  type Product,
  type ProductRow,
  type ProductSummary,
  type ProductSummaryRow,
  type Review,
} from "@/lib/product-utils";

// A Supabase project waking from a free-tier idle pause (or any transient
// backend slowness) can leave the outbound fetch hanging well past what a
// visitor or crawler will wait for. Without a bound on it, that hang runs
// until the platform's own worker/CPU-time limit kills the request, which
// surfaces as a bare 5xx with no page at all. Capping it here means a slow
// backend fails fast and predictably instead, so callers can fall back to a
// degraded-but-200 response (see fetchProducts/fetchProductDetail/fetchReviews).
const SUPABASE_FETCH_TIMEOUT_MS = 8_000;

// `.functions.ts` files ship their full source to the client bundle (server
// function bodies get stripped to RPC stubs, but top-level imports don't) —
// dynamically importing the Supabase SDK here keeps its ~230KB (gzipped) out
// of every storefront page load; it's only ever needed on the server anyway.
async function publicClient() {
  const { createClient } = await import("@supabase/supabase-js");
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"]!;
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, {
          ...init,
          headers,
          signal: AbortSignal.timeout(SUPABASE_FETCH_TIMEOUT_MS),
        });
      },
    },
  });
}

// Browse/list pages (search, category grids, brand pages, etc.) only need
// card-level fields, so this returns lightweight summaries rather than the
// full row — including full descriptions, specs and every gallery image for
// every product would bloat every page that lists more than a couple of
// items. Use fetchProductDetail for a single product's full data.
//
// Selecting only PRODUCT_SUMMARY_COLUMNS instead of "*" matters here: the
// description/specs/warranty/shipping/seller fields are the bulk of a row's
// bytes and get discarded immediately after mapping, so selecting "*" made
// Postgres and the network ship the whole catalog's worth of long-form text
// on every browse-page load — this was adding several hundred ms to TTFB on
// every page that lists products. Ordering by created_at doesn't require it
// to be in the select list; PostgREST orders before projecting.
export const fetchProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProductSummary[]> => {
    try {
      const supabase = await publicClient();
      const { data, error } = await supabase
        .from("products")
        .select(PRODUCT_SUMMARY_COLUMNS)
        .order("created_at", { ascending: false });
      if (error || !data) return [];
      const firstImages = data.flatMap((row) => (row.images?.[0] ? [row.images[0]] : []));
      const signed = await signImagePaths(supabase, firstImages);
      return data.map((row) => rowToProductSummary(row, signed));
    } catch {
      // A slow/unreachable backend (e.g. waking from an idle pause) would
      // otherwise reject this handler outright and take the whole page down
      // with it; an empty result degrades every listing page to "no
      // equipment matches" instead of a 5xx.
      return [];
    }
  },
);

// Deterministic (same slug always yields the same window, so SSR and any
// client re-render agree) but spreads different products' related picks
// across the whole candidate pool instead of clustering on one subset.
function hashSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export const fetchProductDetail = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(
    async ({ data: slug }): Promise<{ listing: Product; related: ProductSummary[] } | null> => {
      let supabase: Awaited<ReturnType<typeof publicClient>>;
      let row: ProductRow;
      try {
        supabase = await publicClient();
        const result = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
        if (result.error || !result.data) return null;
        row = result.data;
      } catch {
        // A timed-out/unreachable backend should read as "we couldn't load
        // this right now", not a hard crash — fall through to the same
        // not-found handling the loader already has in place.
        return null;
      }

      const signed = await signImagePaths(supabase, row.images ?? []);
      const listing = rowToProduct(row, signed);

      // Ordering by created_at meant every product in a category pointed its
      // "related" links at the same 4 newest items — those 4 accumulated
      // dozens of inbound internal links while the rest of the category got
      // none, leaving most products reachable only from a paginated grid page
      // a crawler may never see. Pulling a wider pool and picking a
      // slug-seeded rotating window instead spreads related-link traffic
      // across the whole category, so every product ends up linked from
      // several others.
      // The catalog's biggest category (strength-equipment) runs 130+ products,
      // so this limit must clear the whole catalog's size or a fixed low cap
      // would silently reproduce the original bug: every product's query would
      // draw from the same lexicographically-first slice, and anything sorted
      // after it would never enter any related pool no matter how the window
      // rotates.
      //
      // This pool is secondary to the listing itself, so a failure here (e.g.
      // the same backend hiccup that's merely slow rather than fully down)
      // degrades to "no related items" rather than losing the whole page.
      let pool: ProductSummaryRow[] = [];
      try {
        const { data: relatedPool } = await supabase
          .from("products")
          .select(PRODUCT_SUMMARY_COLUMNS)
          .or(`category.eq.${row.category},brand_slug.eq.${row.brand_slug}`)
          .neq("slug", slug)
          .order("slug", { ascending: true })
          .limit(500);
        pool = relatedPool ?? [];
      } catch {
        pool = [];
      }
      const offset = pool.length > 0 ? hashSeed(slug) % pool.length : 0;
      const candidates =
        pool.length <= 4
          ? pool
          : Array.from({ length: 4 }, (_, i) => pool[(offset + i) % pool.length]!);
      const relatedFirstImages = candidates.flatMap((r) => (r.images?.[0] ? [r.images[0]] : []));
      const relatedSigned = await signImagePaths(supabase, relatedFirstImages);
      const related = candidates.map((r) => rowToProductSummary(r, relatedSigned));

      return { listing, related };
    },
  );

export const fetchReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<Review[]> => {
    try {
      const supabase = await publicClient();
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: true });
      if (error || !data) return [];
      return data.map(rowToReview);
    } catch {
      return [];
    }
  },
);
