import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Breadcrumbs, PageHeader, SectionHeading } from "@/components/site/Bits";
import { brands, categories } from "@/data/catalog";

const title = "Sell Your Gym Equipment | Gym Equipment Marketplace";
const description =
  "Sell your gym equipment to thousands of buyers. List used commercial or home fitness equipment with photos, condition and asking price — fast, easy and free to submit.";

export const Route = createFileRoute("/sell-your-equipment")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sell-your-equipment" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/sell-your-equipment" }],
  }),
  component: SellPage,
});

const schema = z.object({
  type: z.string().trim().min(1, "Choose an equipment type"),
  brand: z.string().trim().min(1, "Enter a brand").max(60),
  model: z.string().trim().max(60),
  condition: z.string().trim().min(1, "Choose a condition"),
  quantity: z.string().trim().min(1, "Enter a quantity").max(6),
  price: z.string().trim().max(12),
  location: z.string().trim().min(2, "Enter your city and state").max(80),
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().max(30),
  notes: z.string().trim().max(1000),
});

const empty = {
  type: "",
  brand: "",
  model: "",
  condition: "",
  quantity: "1",
  price: "",
  location: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

function SellPage() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setForm(empty);
    toast.success("Thanks! Your equipment details were received. Our team will be in touch.");
  };

  const field = "h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-primary";

  return (
    <>
      <Breadcrumbs items={[{ label: "Sell Your Equipment" }]} />
      <PageHeader
        eyebrow="Marketplace Sellers"
        h1="Sell Your Gym Equipment"
        intro="Turn your unused gym equipment into cash. Tell us what you have and we will help you list it in front of buyers searching for exactly that machine — gyms, studios, hotels, schools and home buyers across the country."
      />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={submit} noValidate className="space-y-4">
            <SectionHeading title="List Your Equipment" as="h2" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Equipment type" error={errors.type}>
                <select value={form.type} onChange={set("type")} className={field}>
                  <option value="">Select a type</option>
                  {categories.flatMap((c) => c.subcategories).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Brand" error={errors.brand}>
                <input
                  list="brand-options"
                  value={form.brand}
                  onChange={set("brand")}
                  className={field}
                  maxLength={60}
                />
                <datalist id="brand-options">
                  {brands.map((b) => (
                    <option key={b.slug} value={b.name} />
                  ))}
                </datalist>
              </Field>
              <Field label="Model" error={errors.model}>
                <input value={form.model} onChange={set("model")} className={field} maxLength={60} />
              </Field>
              <Field label="Condition" error={errors.condition}>
                <select value={form.condition} onChange={set("condition")} className={field}>
                  <option value="">Select a condition</option>
                  {["Like New", "Excellent", "Very Good", "Good", "Needs Repair"].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Quantity" error={errors.quantity}>
                <input value={form.quantity} onChange={set("quantity")} className={field} maxLength={6} />
              </Field>
              <Field label="Asking price (USD)" error={errors.price}>
                <input value={form.price} onChange={set("price")} className={field} maxLength={12} />
              </Field>
              <Field label="Location (city, state)" error={errors.location}>
                <input value={form.location} onChange={set("location")} className={field} maxLength={80} />
              </Field>
              <Field label="Photos" error={undefined}>
                <input type="file" accept="image/*" multiple className="w-full border border-border p-2 text-sm" />
              </Field>
              <Field label="Your name" error={errors.name}>
                <input value={form.name} onChange={set("name")} className={field} maxLength={80} />
              </Field>
              <Field label="Email" error={errors.email}>
                <input type="email" value={form.email} onChange={set("email")} className={field} maxLength={120} />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input value={form.phone} onChange={set("phone")} className={field} maxLength={30} />
              </Field>
            </div>
            <Field label="Anything else we should know?" error={errors.notes}>
              <textarea
                value={form.notes}
                onChange={set("notes")}
                rows={4}
                maxLength={1000}
                className="w-full border border-border bg-background p-3 text-sm outline-none focus:border-primary"
              />
            </Field>
            <button
              type="submit"
              className="bg-primary px-6 py-3 text-sm font-bold tracking-wide uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              List Your Equipment
            </button>
            <p className="text-xs text-muted-foreground">
              Submissions are reviewed by our team before going live on the marketplace.
            </p>
          </form>

          <aside className="space-y-6">
            <div className="border border-border bg-secondary p-6">
              <h2 className="font-display text-lg font-bold text-charcoal">Why Sell Here?</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Buyers arrive searching for your exact brand and model</li>
                <li>Sell single machines or a whole facility</li>
                <li>Shipping and freight assistance available</li>
                <li>No listing fee while the marketplace is growing</li>
              </ul>
            </div>
            <div className="border border-border p-6">
              <h2 className="font-display text-lg font-bold text-charcoal">What Sells Fastest</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Commercial cardio in working order</li>
                <li>Plate-loaded and selectorized strength machines</li>
                <li>Dumbbell sets with racks</li>
                <li>Complete gym packages from closing facilities</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-primary">{error}</span>}
    </label>
  );
}
