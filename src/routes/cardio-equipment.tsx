import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/cardio-equipment")({
  component: () => <Outlet />,
});
