import strengthImg from "@/assets/cat-strength.jpg";
import cardioImg from "@/assets/cat-cardio.jpg";
import homeImg from "@/assets/cat-home.jpg";
import commercialImg from "@/assets/cat-commercial.jpg";
import weightsImg from "@/assets/cat-weights.jpg";
import accessoriesImg from "@/assets/cat-accessories.jpg";

const byCategory: Record<string, string> = {
  "strength-equipment": strengthImg,
  "cardio-equipment": cardioImg,
  "home-gym-equipment": homeImg,
  "commercial-gym-equipment": commercialImg,
  "free-weights": weightsImg,
  "gym-accessories": accessoriesImg,
};

export function categoryImage(categorySlug: string): string {
  return byCategory[categorySlug] ?? strengthImg;
}
