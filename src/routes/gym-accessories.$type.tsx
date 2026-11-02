import { createFileRoute } from "@tanstack/react-router";
import { TypePage, loadTypePage, typeHead } from "@/components/site/TypePage";

export const Route = createFileRoute("/gym-accessories/$type")({
  loader: ({ params, context }) =>
    loadTypePage(context.queryClient, "gym-accessories", params.type),
  head: ({ loaderData }) => typeHead("us", loaderData),
  component: TypeView,
});

function TypeView() {
  const { departmentSlug, typeSlug } = Route.useLoaderData();
  return <TypePage departmentSlug={departmentSlug} typeSlug={typeSlug} />;
}
