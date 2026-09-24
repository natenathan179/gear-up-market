import { createFileRoute, notFound } from "@tanstack/react-router";
import { CategoryPage, countryCategoryHead } from "@/components/site/CategoryPage";
import { categoryBySlug } from "@/data/catalog";

export const Route = createFileRoute("/uk/$category")({
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
    const title = `${category.name} for Sale – Ships to the UK | Gym Equipment Marketplace`;
    const description = `Shop ${category.name.toLowerCase()} for sale, priced in estimated GBP and shipped from US sellers to the UK. Freight and import VAT quoted before you buy.`;
    return countryCategoryHead("uk", category.slug, title, description, category.faqs)();
  },
  component: UkCategoryView,
});

function UkCategoryView() {
  const { category } = Route.useLoaderData();
  return <CategoryPage category={category} />;
}
