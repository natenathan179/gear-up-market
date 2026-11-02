import { createFileRoute } from "@tanstack/react-router";
import { TypePage, loadTypePage, typeHead } from "@/components/site/TypePage";

export const Route = createFileRoute("/strength-equipment/$type")({
  loader: ({ params, context }) =>
    loadTypePage(context.queryClient, "strength-equipment", params.type),
  head: ({ loaderData }) => typeHead("us", loaderData),
  component: TypeView,
});

function TypeView() {
  const { departmentSlug, typeSlug } = Route.useLoaderData();
  return <TypePage departmentSlug={departmentSlug} typeSlug={typeSlug} />;
}
