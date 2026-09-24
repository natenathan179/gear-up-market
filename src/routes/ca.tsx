import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RegionProvider } from "@/lib/region-context";

export const Route = createFileRoute("/ca")({
  component: () => (
    <RegionProvider country="ca">
      <Outlet />
    </RegionProvider>
  ),
});
