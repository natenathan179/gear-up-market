import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/CategoryPage";
import { categoryBySlug } from "@/data/catalog";

const category = categoryBySlug("strength-equipment")!;

export const Route = createFileRoute("/strength-equipment")({
  head: categoryHead(
    "strength-equipment",
    "Strength Equipment for Sale – New & Used | Gym Equipment Marketplace",
    "Shop strength training equipment for sale: power racks, smith machines, cable machines, functional trainers, benches and plate loaded machines, new and used.",
  ),
  component: () => <CategoryPage category={category} />,
});
