import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/uk/$category")({
  component: () => <Outlet />,
});
