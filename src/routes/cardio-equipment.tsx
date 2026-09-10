import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/CategoryPage";
import { categoryBySlug } from "@/data/catalog";

const category = categoryBySlug("cardio-equipment")!;

export const Route = createFileRoute("/cardio-equipment")({
  head: categoryHead(
    "cardio-equipment",
    "Cardio Equipment for Sale – Treadmills & Bikes | Gym Equipment Marketplace",
    "Shop cardio equipment for sale: commercial treadmills, exercise bikes, spin bikes, ellipticals, rowing machines and stair climbers, new and used.",
  ),
  component: () => <CategoryPage category={category} />,
});
