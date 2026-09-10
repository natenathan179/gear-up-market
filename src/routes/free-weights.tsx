import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/CategoryPage";
import { categoryBySlug } from "@/data/catalog";

const category = categoryBySlug("free-weights")!;

export const Route = createFileRoute("/free-weights")({
  head: categoryHead(
    "free-weights",
    "Free Weights for Sale – Dumbbells & Plates | Gym Equipment Marketplace",
    "Shop free weights for sale: dumbbell sets, barbells, weight plates, bumper plates, kettlebells and storage racks, new and used.",
  ),
  component: () => <CategoryPage category={category} />,
});
