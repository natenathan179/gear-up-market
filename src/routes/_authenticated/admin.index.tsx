import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LogOut, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { productsQueryOptions } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Gym Equipment Marketplace" },
      { name: "description", content: "Manage marketplace products and reviews." },
      { property: "og:title", content: "Admin Dashboard" },
      { property: "og:description", content: "Manage marketplace products and reviews." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Admin Dashboard" },
      { name: "twitter:description", content: "Manage marketplace products and reviews." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data: products = [], isLoading } = useQuery(productsQueryOptions);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);

  const allSelected = products.length > 0 && selected.length === products.length;

  function toggleAll() {
    setSelected(allSelected ? [] : products.map((p) => p.id));
  }

  function toggleOne(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function deleteSelected() {
    if (selected.length === 0) return;
    if (!window.confirm(`Delete ${selected.length} product(s)? This cannot be undone.`)) return;
    setDeleting(true);
    const { error } = await supabase.from("products").delete().in("id", selected);
    setDeleting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`${selected.length} product(s) deleted.`);
    setSelected([]);
    await queryClient.invalidateQueries({ queryKey: ["products"] });
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  async function deleteProduct(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Product deleted.");
    await queryClient.invalidateQueries({ queryKey: ["products"] });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-foreground">Admin dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} products published on the marketplace.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/products/$id"
            params={{ id: "new" }}
            className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-sm font-bold uppercase text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-4" /> New product
          </Link>
          <Link
            to="/admin/reviews"
            className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-sm font-bold uppercase hover:bg-secondary"
          >
            <Star className="size-4" /> Reviews
          </Link>
          <Button
            variant="outline"
            onClick={deleteSelected}
            disabled={selected.length === 0 || deleting}
          >
            <Trash2 className="mr-2 size-4" />
            {deleting ? "Deleting…" : `Delete selected${selected.length ? ` (${selected.length})` : ""}`}
          </Button>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="mr-2 size-4" /> Sign out
          </Button>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left text-xs uppercase">
            <tr>
              <th className="px-3 py-2">
                <input
                  type="checkbox"
                  aria-label="Select all products"
                  className="size-4 accent-primary"
                  checked={allSelected}
                  onChange={toggleAll}
                />
              </th>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Condition</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Photos</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-muted-foreground">
                  Loading products…
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product.id} className="border-t border-border">
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    aria-label={`Select ${product.title}`}
                    className="size-4 accent-primary"
                    checked={selected.includes(product.id)}
                    onChange={() => toggleOne(product.id)}
                  />
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt=""
                      className="size-10 object-cover"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="font-semibold text-foreground">{product.title}</p>
                      <p className="text-xs text-muted-foreground">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2 text-muted-foreground">{product.category}</td>
                <td className="px-3 py-2 text-muted-foreground">{product.condition}</td>
                <td className="px-3 py-2 font-semibold">${product.price.toLocaleString()}</td>
                <td className="px-3 py-2 text-muted-foreground">{product.imagePaths.length}</td>
                <td className="px-3 py-2">
                  <div className="flex justify-end gap-2">
                    <Link
                      to="/admin/products/$id"
                      params={{ id: product.id }}
                      className="border border-border px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteProduct(product.id, product.title)}
                      className="inline-flex items-center gap-1 border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
