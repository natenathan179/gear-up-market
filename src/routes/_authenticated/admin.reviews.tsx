import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/reviews")({
  head: () => ({
    meta: [
      { title: "Manage Reviews | Admin" },
      { name: "description", content: "Create, edit and remove customer reviews." },
      { property: "og:title", content: "Manage Reviews" },
      { property: "og:description", content: "Create, edit and remove customer reviews." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Manage Reviews" },
      { name: "twitter:description", content: "Create, edit and remove customer reviews." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminReviews,
});

const adminReviewsQuery = {
  queryKey: ["admin-reviews"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
};

function AdminReviews() {
  const { data: reviews = [], isLoading } = useQuery(adminReviewsQuery);
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: "5",
    quote: "",
    product_title: "",
  });

  async function refresh() {
    await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    await queryClient.invalidateQueries({ queryKey: ["reviews"] });
  }

  async function addReview(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("reviews").insert({
      name: form.name,
      location: form.location,
      avatar_url: form.avatar_url,
      rating: Number(form.rating) || 5,
      quote: form.quote,
      product_title: form.product_title || null,
      published: true,
    });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Review added.");
    setForm({ ...form, name: "", location: "", quote: "", product_title: "" });
    await refresh();
  }

  async function togglePublished(id: string, published: boolean) {
    const { error } = await supabase.from("reviews").update({ published: !published }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    await refresh();
  }

  async function removeReview(id: string) {
    if (!window.confirm("Delete this review?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Review deleted.");
    await refresh();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/admin" className="text-xs font-semibold uppercase text-primary hover:underline">
        ← Back to dashboard
      </Link>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground">Customer reviews</h1>

      <form onSubmit={addReview} className="mt-6 grid gap-4 border border-border bg-card p-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase">
            Name
          </Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="location" className="mb-1.5 block text-xs font-semibold uppercase">
            Location
          </Label>
          <Input
            id="location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="avatar" className="mb-1.5 block text-xs font-semibold uppercase">
            Avatar image URL
          </Label>
          <Input
            id="avatar"
            value={form.avatar_url}
            onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="rating" className="mb-1.5 block text-xs font-semibold uppercase">
            Rating (1-5)
          </Label>
          <Input
            id="rating"
            type="number"
            min={1}
            max={5}
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="product" className="mb-1.5 block text-xs font-semibold uppercase">
            Product purchased (optional)
          </Label>
          <Input
            id="product"
            value={form.product_title}
            onChange={(e) => setForm({ ...form, product_title: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="quote" className="mb-1.5 block text-xs font-semibold uppercase">
            Review
          </Label>
          <Textarea
            id="quote"
            rows={4}
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
            Add review
          </Button>
        </div>
      </form>

      <div className="mt-8 overflow-x-auto border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left text-xs uppercase">
            <tr>
              <th className="px-3 py-2">Reviewer</th>
              <th className="px-3 py-2">Rating</th>
              <th className="px-3 py-2">Review</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                  Loading reviews…
                </td>
              </tr>
            )}
            {reviews.map((review) => (
              <tr key={review.id} className="border-t border-border align-top">
                <td className="px-3 py-2">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.location}</p>
                </td>
                <td className="px-3 py-2">{review.rating}/5</td>
                <td className="max-w-md px-3 py-2 text-muted-foreground">{review.quote}</td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() => void togglePublished(review.id, review.published)}
                    className="border border-border px-3 py-1 text-xs font-semibold hover:border-primary"
                  >
                    {review.published ? "Published" : "Hidden"}
                  </button>
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    type="button"
                    onClick={() => void removeReview(review.id)}
                    className="inline-flex items-center gap-1 border border-border px-3 py-1 text-xs font-semibold text-muted-foreground hover:border-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
