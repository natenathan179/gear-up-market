import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RegionProvider } from "@/lib/region-context";

export const Route = createFileRoute("/uk")({
  component: () => (
    <RegionProvider country="uk">
      <Outlet />
    </RegionProvider>
  ),
});
