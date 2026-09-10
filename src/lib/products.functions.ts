import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import {
  rowToProduct,
  rowToReview,
  signImagePaths,
  type Product,
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

export const fetchProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<Product[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    const signed = await signImagePaths(supabase, data.flatMap((row) => row.images ?? []));
    return data.map((row) => rowToProduct(row, signed));
  },
);

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
