import { createFileRoute } from "@tanstack/react-router";
import { TypePage, loadTypePage, typeHead } from "@/components/site/TypePage";

export const Route = createFileRoute("/free-weights/$type")({
  loader: ({ params, context }) => loadTypePage(context.queryClient, "free-weights", params.type),
  head: ({ loaderData }) => typeHead("us", loaderData),
  component: TypeView,
});

function TypeView() {
  const { departmentSlug, typeSlug } = Route.useLoaderData();
  return <TypePage departmentSlug={departmentSlug} typeSlug={typeSlug} />;
}
