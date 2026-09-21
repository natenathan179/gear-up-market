import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  // Dynamically imported so the ~230KB (gzipped) Supabase auth/realtime/postgrest
  // SDK it pulls in is only ever downloaded by someone reaching an admin route,
  // instead of being bundled into the eagerly-loaded chunk every storefront
  // visitor pays for — beforeLoad isn't code-split by default like `component` is.
  beforeLoad: async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login" });
    return { user: data.user };
  },
  component: () => <Outlet />,
});
