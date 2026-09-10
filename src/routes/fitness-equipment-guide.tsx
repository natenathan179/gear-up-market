import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/fitness-equipment-guide")({
  component: () => <Outlet />,
});
