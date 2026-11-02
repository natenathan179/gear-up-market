import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/strength-equipment")({
  component: () => <Outlet />,
});
