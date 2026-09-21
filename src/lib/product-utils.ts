import type { Condition, Listing } from "@/data/catalog";
import type { Database } from "@/integrations/supabase/types";
import { categoryImage } from "@/lib/catalog-images";

export const PRODUCT_BUCKET = "product-images";
export const SIGNED_URL_TTL = 60 * 60 * 24 * 7;

const LOVABLE_ASSET_PREFIX = "/__l5e/assets-v1/";

// Images uploaded via Lovable's editor are stored as paths relative to
// Lovable's own preview host; that host is only proxied by the Vite dev
// server, not by the deployed app, so they must be resolved to an absolute
// URL to load in production.
function resolveLovableAssetPath(path: string): string {
  if (!path.startsWith(LOVABLE_ASSET_PREFIX)) return path;
  const previewHost =
    import.meta.env["VITE_LOVABLE_PREVIEW_HOST"] ?? process.env["LOVABLE_PREVIEW_HOST"];
  return previewHost ? `https://${previewHost}${path}` : path;
}

// Product photos are uploaded at whatever resolution the seller's camera or
// phone produced (frequently 250-350KB each) and, before this, were served
// at that same full size everywhere — including ~250px grid thumbnails
// repeated dozens of times per category/browse page. Lovable's asset host
// supports on-the-fly resizing via `?w=`/`q=` query params; request an
// appropriately sized version instead of shipping the original everywhere.
// No-ops for any URL that isn't one of ours (e.g. a Supabase signed URL,
// whose query string is part of its signature and must not be altered).
export function resizedImageUrl(url: string, width: number, quality = 75): string {
  if (!url.includes(LOVABLE_ASSET_PREFIX)) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}w=${width}&q=${quality}`;
}

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
  const storagePaths = [...new Set(paths)].filter((p) => p && !p.startsWith("http") && !p.startsWith("/"));
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

// Imported product titles carry a redundant " – Commercial X Machine"-style
// tail that duplicates the category/subcategory already shown elsewhere on
// the page (breadcrumbs, filters, schema). Strip it so the title is usable
// as-is for H1s, cards and <title> without blowing past SEO length limits.
function cleanProductTitle(title: string): string {
  const core = title.split(" – ")[0] ?? title;
  return core.replace(/ for Sale$/, "").trim();
}

function resolveImagePaths(paths: string[], signed: Map<string, string>): string[] {
  return paths
    .map((path) =>
      path.startsWith("http") || path.startsWith("/") ? resolveLovableAssetPath(path) : (signed.get(path) ?? ""),
    )
    .filter(Boolean);
}

export function rowToProduct(row: ProductRow, signed: Map<string, string>): Product {
  const usable = resolveImagePaths(row.images ?? [], signed);
  return {
    id: row.id,
    slug: row.slug,
    title: cleanProductTitle(row.title),
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

// Card/browse views (search, category grids, related products) only ever
// render the fields below — never description, specs, warranty, shipping,
// seller or the full image gallery. Serializing those into every listing on
// every browse page bloats the page's SSR payload for no visible benefit, so
// pages that list many products fetch this shape instead of the full Product.
export type ProductSummary = Omit<
  Product,
  "description" | "specs" | "warranty" | "shipping" | "seller" | "images"
>;

export function toProductSummary(product: Product): ProductSummary {
  const { description, specs, warranty, shipping, seller, images, ...summary } = product;
  return summary;
}

// The exact set of columns rowToProductSummary reads — selecting only these
// (instead of "*") keeps the summary query from pulling every row's
// description/specs/warranty/shipping/seller across the wire just to throw
// them away immediately after.
export const PRODUCT_SUMMARY_COLUMNS =
  "id,slug,title,brand,brand_slug,model,category,subcategory,condition,price,city,state,state_slug,usage,muscle_group,resistance,available,images,featured";

export type ProductSummaryRow = Pick<
  ProductRow,
  | "id"
  | "slug"
  | "title"
  | "brand"
  | "brand_slug"
  | "model"
  | "category"
  | "subcategory"
  | "condition"
  | "price"
  | "city"
  | "state"
  | "state_slug"
  | "usage"
  | "muscle_group"
  | "resistance"
  | "available"
  | "images"
  | "featured"
>;

export function rowToProductSummary(row: ProductSummaryRow, signed: Map<string, string>): ProductSummary {
  const usable = resolveImagePaths(row.images ?? [], signed);
  return {
    id: row.id,
    slug: row.slug,
    title: cleanProductTitle(row.title),
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
    imagePaths: row.images ?? [],
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
