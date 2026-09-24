import { createFileRoute, notFound } from "@tanstack/react-router";
import { CategoryPage, countryCategoryHead } from "@/components/site/CategoryPage";
import { categoryBySlug } from "@/data/catalog";

export const Route = createFileRoute("/ca/$category")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    const title = `${category.name} for Sale – Ships to Canada | Gym Equipment Marketplace`;
    const description = `Shop ${category.name.toLowerCase()} for sale, priced in estimated CAD and shipped from US sellers to Canada. Freight and customs quoted before you buy.`;
    return countryCategoryHead("ca", category.slug, title, description, category.faqs)();
  },
  component: CaCategoryView,
});

function CaCategoryView() {
  const { category } = Route.useLoaderData();
  return <CategoryPage category={category} />;
}
