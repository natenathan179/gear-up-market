import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import {
  rowToProduct,
  rowToReview,
  signImagePaths,
  toProductSummary,
  type Product,
  type ProductSummary,
  type Review,
} from "@/lib/product-utils";

function publicClient() {
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
        return fetch(input, { ...init, headers });
      },
    },
  });
}

// Browse/list pages (search, category grids, brand pages, etc.) only need
// card-level fields, so this returns lightweight summaries rather than the
// full row — including full descriptions, specs and every gallery image for
// every product would bloat every page that lists more than a couple of
// items. Use fetchProductDetail for a single product's full data.
export const fetchProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProductSummary[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    const firstImages = data.flatMap((row) => (row.images?.[0] ? [row.images[0]] : []));
    const signed = await signImagePaths(supabase, firstImages);
    return data.map((row) => toProductSummary(rowToProduct(row, signed)));
  },
);

export const fetchProductDetail = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<{ listing: Product; related: ProductSummary[] } | null> => {
    const supabase = publicClient();
    const { data: row, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error || !row) return null;

    const signed = await signImagePaths(supabase, row.images ?? []);
    const listing = rowToProduct(row, signed);

    const { data: relatedRows } = await supabase
      .from("products")
      .select("*")
      .or(`category.eq.${row.category},brand_slug.eq.${row.brand_slug}`)
      .neq("slug", slug)
      .order("created_at", { ascending: false })
      .limit(4);
    const candidates = relatedRows ?? [];
    const relatedFirstImages = candidates.flatMap((r) => (r.images?.[0] ? [r.images[0]] : []));
    const relatedSigned = await signImagePaths(supabase, relatedFirstImages);
    const related = candidates.map((r) => toProductSummary(rowToProduct(r, relatedSigned)));

    return { listing, related };
  });

export const fetchReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<Review[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: true });
    if (error || !data) return [];
    return data.map(rowToReview);
  },
);
