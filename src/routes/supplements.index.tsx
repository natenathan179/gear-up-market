import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/CategoryPage";
import { categoryBySlug } from "@/data/catalog";

const category = categoryBySlug("supplements")!;

export const Route = createFileRoute("/supplements/")({
  head: categoryHead(
    "supplements",
    "Sports Supplements for Sale | Gym Equipment Marketplace",
    "Shop genuine Dragon Pharma supplements for sale: pre-workout, whey protein, creatine, amino acids, vitamins and health essentials. Factory sealed, fast nationwide shipping.",
    category.faqs,
  ),
  component: () => <CategoryPage category={category} />,
});
