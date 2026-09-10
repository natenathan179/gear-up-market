import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/CategoryPage";
import { categoryBySlug } from "@/data/catalog";

const category = categoryBySlug("gym-accessories")!;

export const Route = createFileRoute("/gym-accessories")({
  head: categoryHead(
    "gym-accessories",
    "Gym Accessories for Sale | Gym Equipment Marketplace",
    "Shop gym accessories for sale: gym flooring, mats, resistance bands, lifting belts, medicine balls and storage for home and commercial gyms.",
  ),
  component: () => <CategoryPage category={category} />,
});
