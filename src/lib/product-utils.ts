import type { Condition, Listing } from "@/data/catalog";
import type { Database } from "@/integrations/supabase/types";
import { categoryImage } from "@/lib/catalog-images";

export const PRODUCT_BUCKET = "product-images";
export const SIGNED_URL_TTL = 60 * 60 * 24 * 7;

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type ReviewRow = Database["public"]["Tables"]["reviews"]["Row"];

export interface Product extends Listing {
  id: string;
  images: string[];
  imagePaths: string[];
}

export interface Review {
  id: string;
  name: string;
  location: string;
  avatarUrl: string;
  rating: number;
  quote: string;
  productTitle: string | null;
}

export interface SpecRow {
  label: string;
  value: string;
}

interface SignerClient {
  storage: {
    from: (bucket: string) => {
      createSignedUrls: (
        paths: string[],
        expiresIn: number,
      ) => Promise<{ data: { path: string | null; signedUrl: string | null }[] | null }>;
    };
  };
}

export async function signImagePaths(
  client: SignerClient,
  paths: string[],
): Promise<Map<string, string>> {
  const signed = new Map<string, string>();
  const storagePaths = [...new Set(paths)].filter((p) => p && !p.startsWith("http"));
  if (storagePaths.length === 0) return signed;
  try {
    const { data } = await client.storage
      .from(PRODUCT_BUCKET)
      .createSignedUrls(storagePaths, SIGNED_URL_TTL);
    for (const entry of data ?? []) {
      if (entry.path && entry.signedUrl) signed.set(entry.path, entry.signedUrl);
    }
  } catch {
    // fall back to category imagery
  }
  return signed;
}

export function parseSpecs(specs: unknown): SpecRow[] {
  if (!Array.isArray(specs)) return [];
  return specs.flatMap((entry) => {
    if (entry && typeof entry === "object" && "label" in entry && "value" in entry) {
      const row = entry as { label: unknown; value: unknown };
      return [{ label: String(row.label), value: String(row.value) }];
    }
    return [];
  });
}

export function parseSeller(seller: unknown): Product["seller"] {
  const fallback = {
    name: "Gym Equipment Marketplace",
    type: "Verified Dealer",
    rating: 4.9,
    reviews: 0,
    since: 2015,
  };
  if (!seller || typeof seller !== "object") return fallback;
  const s = seller as Record<string, unknown>;
  return {
    name: typeof s["name"] === "string" ? s["name"] : fallback.name,
    type: typeof s["type"] === "string" ? s["type"] : fallback.type,
    rating: typeof s["rating"] === "number" ? s["rating"] : fallback.rating,
    reviews: typeof s["reviews"] === "number" ? s["reviews"] : fallback.reviews,
    since: typeof s["since"] === "number" ? s["since"] : fallback.since,
  };
}

export function rowToProduct(row: ProductRow, signed: Map<string, string>): Product {
  const images = (row.images ?? []).map((path) =>
    path.startsWith("http") ? path : (signed.get(path) ?? ""),
  );
  const usable = images.filter(Boolean);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    brand: row.brand,
    brandSlug: row.brand_slug,
    model: row.model,
    category: row.category,
    subcategory: row.subcategory,
    condition: row.condition as Condition,
    price: Number(row.price),
    city: row.city,
    state: row.state,
    stateSlug: row.state_slug,
    usage: row.usage as Product["usage"],
    muscleGroup: row.muscle_group,
    resistance: row.resistance,
    available: row.available,
    image: usable[0] ?? categoryImage(row.category),
    images: usable.length > 0 ? usable : [categoryImage(row.category)],
    imagePaths: row.images ?? [],
    description: row.description,
    specs: parseSpecs(row.specs),
    warranty: row.warranty,
    shipping: row.shipping,
    seller: parseSeller(row.seller),
    featured: row.featured,
  };
}

export function rowToReview(row: ReviewRow): Review {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    avatarUrl: row.avatar_url,
    rating: Number(row.rating),
    quote: row.quote,
    productTitle: row.product_title,
  };
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
