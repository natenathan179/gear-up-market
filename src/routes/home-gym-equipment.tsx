import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/CategoryPage";
import { categoryBySlug } from "@/data/catalog";

const category = categoryBySlug("home-gym-equipment")!;

export const Route = createFileRoute("/home-gym-equipment")({
  head: categoryHead(
    "home-gym-equipment",
    "Home Gym Equipment for Sale | Gym Equipment Marketplace",
    "Build your home gym with equipment for sale from trusted sellers: multi-gyms, adjustable dumbbells, folding treadmills, benches and compact racks.",
  ),
  component: () => <CategoryPage category={category} />,
});
