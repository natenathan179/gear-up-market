import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { PRODUCT_BUCKET, slugify } from "@/lib/product-utils";

export const Route = createFileRoute("/_authenticated/admin/products/$id")({
  head: () => ({
    meta: [
      { title: "Edit Product | Admin" },
      { name: "description", content: "Create or edit a marketplace product listing." },
      { property: "og:title", content: "Edit Product" },
      { property: "og:description", content: "Create or edit a marketplace product listing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Edit Product" },
      { name: "twitter:description", content: "Create or edit a marketplace product listing." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ProductEditor,
});

type FormState = {
  title: string;
  slug: string;
  brand: string;
  model: string;
  category: string;
  subcategory: string;
  condition: string;
  usage: string;
  price: string;
  city: string;
  state: string;
  muscle_group: string;
  resistance: string;
  description: string;
  warranty: string;
  shipping: string;
  featured: boolean;
  available: boolean;
};

const empty: FormState = {
  title: "",
  slug: "",
  brand: "",
  model: "",
  category: "",
  subcategory: "",
  condition: "New",
  usage: "Commercial",
  price: "0",
  city: "",
  state: "",
  muscle_group: "",
  resistance: "",
  description: "",
  warranty: "",
  shipping: "",
  featured: false,
  available: true,
};

const conditions = ["New", "Refurbished", "Used - Excellent", "Used - Good", "Used - Fair"];
const usages = ["Commercial", "Home"];

function ProductEditor() {
  const { id } = useParams({ from: "/_authenticated/admin/products/$id" });
  const isNew = id === "new";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(empty);
  const [images, setImages] = useState<string[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isNew) return;
    void (async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
      setLoading(false);
      if (error || !data) {
        toast.error(error?.message ?? "Product not found.");
        return;
      }
      setForm({
        title: data.title,
        slug: data.slug,
        brand: data.brand,
        model: data.model,
        category: data.category,
        subcategory: data.subcategory,
        condition: data.condition,
        usage: data.usage,
        price: String(data.price),
        city: data.city,
        state: data.state,
        muscle_group: data.muscle_group,
        resistance: data.resistance,
        description: data.description,
        warranty: data.warranty,
        shipping: data.shipping,
        featured: data.featured,
        available: data.available,
      });
      setImages(data.images ?? []);
    })();
  }, [id, isNew]);

  useEffect(() => {
    if (images.length === 0) return;
    void (async () => {
      const { data } = await supabase.storage
        .from(PRODUCT_BUCKET)
        .createSignedUrls(images, 60 * 60);
      const map: Record<string, string> = {};
      data?.forEach((entry) => {
        if (entry.path && entry.signedUrl) map[entry.path] = entry.signedUrl;
      });
      setPreviews(map);
    })();
  }, [images]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${slugify(form.slug || form.title || "product")}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from(PRODUCT_BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) {
        toast.error(`${file.name}: ${error.message}`);
        continue;
      }
      uploaded.push(path);
    }
    setUploading(false);
    if (uploaded.length > 0) {
      setImages((prev) => [...prev, ...uploaded]);
      toast.success(`${uploaded.length} photo(s) uploaded.`);
    }
  }

  async function removeImage(path: string) {
    await supabase.storage.from(PRODUCT_BUCKET).remove([path]);
    setImages((prev) => prev.filter((p) => p !== path));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title,
      slug: slugify(form.slug || form.title),
      brand: form.brand,
      brand_slug: slugify(form.brand),
      model: form.model,
      category: form.category,
      subcategory: form.subcategory,
      condition: form.condition as never,
      usage: form.usage as never,
      price: Number(form.price) || 0,
      city: form.city,
      state: form.state,
      state_slug: slugify(form.state),
      muscle_group: form.muscle_group,
      resistance: form.resistance,
      description: form.description,
      warranty: form.warranty,
      shipping: form.shipping,
      featured: form.featured,
      available: form.available,
      images,
    };

    const { error } = isNew
      ? await supabase.from("products").insert(payload)
      : await supabase.from("products").update(payload).eq("id", id);

    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(isNew ? "Product created." : "Product updated.");
    await queryClient.invalidateQueries({ queryKey: ["products"] });
    navigate({ to: "/admin" });
  }

  if (loading) {
    return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-sm">Loading product…</div>;
  }

  const fields: Array<[keyof FormState, string, string?]> = [
    ["title", "Title"],
    ["slug", "URL slug (auto from title if blank)"],
    ["brand", "Brand"],
    ["model", "Model"],
    ["category", "Category"],
    ["subcategory", "Subcategory"],
    ["price", "Price (USD)", "number"],
    ["city", "City"],
    ["state", "State"],
    ["muscle_group", "Muscle group / focus"],
    ["resistance", "Resistance type"],
    ["warranty", "Warranty"],
    ["shipping", "Shipping / freight"],
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/admin" className="text-xs font-semibold uppercase text-primary hover:underline">
        ← Back to dashboard
      </Link>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground">
        {isNew ? "New product" : "Edit product"}
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map(([key, label, type]) => (
            <div key={key}>
              <Label htmlFor={key} className="mb-1.5 block text-xs font-semibold uppercase">
                {label}
              </Label>
              <Input
                id={key}
                type={type ?? "text"}
                value={String(form[key])}
                onChange={(e) => set(key, e.target.value as never)}
                required={key === "title" || key === "category"}
              />
            </div>
          ))}
          <div>
            <Label htmlFor="condition" className="mb-1.5 block text-xs font-semibold uppercase">
              Condition
            </Label>
            <select
              id="condition"
              value={form.condition}
              onChange={(e) => set("condition", e.target.value)}
              className="h-9 w-full border border-border bg-background px-3 text-sm"
            >
              {conditions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="usage" className="mb-1.5 block text-xs font-semibold uppercase">
              Usage
            </Label>
            <select
              id="usage"
              value={form.usage}
              onChange={(e) => set("usage", e.target.value)}
              className="h-9 w-full border border-border bg-background px-3 text-sm"
            >
              {usages.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="mb-1.5 block text-xs font-semibold uppercase">
            Description
          </Label>
          <Textarea
            id="description"
            rows={7}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-6 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
            />
            Featured on homepage
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => set("available", e.target.checked)}
            />
            In stock
          </label>
        </div>

        <div className="border border-border bg-card p-5">
          <h2 className="font-display text-lg font-bold text-foreground">Product photos</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Upload image files from your computer. The first photo is used as the main image.
          </p>
          <label className="mt-4 inline-flex cursor-pointer items-center gap-2 border border-border px-4 py-2.5 text-xs font-bold uppercase hover:border-primary">
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            Upload photos
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => void handleUpload(e.target.files)}
            />
          </label>
          {images.length > 0 && (
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {images.map((path) => (
                <li key={path} className="relative border border-border">
                  <img
                    src={previews[path] ?? ""}
                    alt=""
                    className="aspect-4/3 w-full object-cover"
                  />
                  <button
                    type="button"
                    aria-label="Remove photo"
                    onClick={() => void removeImage(path)}
                    className="absolute right-1 top-1 bg-background/90 p-1.5 text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isNew ? "Create product" : "Save changes"}
        </Button>
      </form>
    </section>
  );
}
