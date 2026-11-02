import { createFileRoute } from "@tanstack/react-router";
import { TypePage, loadTypePage, typeHead } from "@/components/site/TypePage";

export const Route = createFileRoute("/uk/$category/$type")({
  loader: ({ params, context }) => loadTypePage(context.queryClient, params.category, params.type),
  head: ({ loaderData }) => typeHead("uk", loaderData),
  component: TypeView,
});

function TypeView() {
  const { departmentSlug, typeSlug } = Route.useLoaderData();
  return <TypePage departmentSlug={departmentSlug} typeSlug={typeSlug} />;
}
