import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Sign In | Gym Equipment Marketplace" },
      {
        name: "description",
        content: "Sign in to manage products and reviews on Gym Equipment Marketplace.",
      },
      { property: "og:title", content: "Admin Sign In | Gym Equipment Marketplace" },
      { property: "og:description", content: "Administrator access to the marketplace catalogue." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Admin Sign In" },
      { name: "twitter:description", content: "Administrator access to the marketplace catalogue." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Signed in.");
    navigate({ to: "/admin", replace: true });
  }

  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-4 py-20">
      <div className="border border-border bg-card p-8">
        <span className="mb-4 inline-flex size-11 items-center justify-center bg-primary text-primary-foreground">
          <Lock className="size-5" />
        </span>
        <h1 className="font-display text-2xl font-extrabold text-foreground">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage products, photos and reviews. Accounts are created in the backend users panel.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" disabled={busy} className="w-full">
            {busy && <Loader2 className="mr-2 size-4 animate-spin" />}
            Sign in
          </Button>
        </form>
      </div>
    </section>
  );
}
