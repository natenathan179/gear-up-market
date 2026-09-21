import strengthImg from "@/assets/cat-strength.avif";
import cardioImg from "@/assets/cat-cardio.jpg";
import homeImg from "@/assets/cat-home.jpg";
import commercialImg from "@/assets/cat-commercial.jpg";
import weightsImg from "@/assets/cat-weights.jpg";
import accessoriesImg from "@/assets/cat-accessories.webp";

import strengthThumb from "@/assets/cat-strength-thumb.webp";
import cardioThumb from "@/assets/cat-cardio-thumb.webp";
import homeThumb from "@/assets/cat-home-thumb.webp";
import commercialThumb from "@/assets/cat-commercial-thumb.webp";
import weightsThumb from "@/assets/cat-weights-thumb.webp";
import accessoriesThumb from "@/assets/cat-accessories-thumb.webp";

const byCategory: Record<string, string> = {
  "strength-equipment": strengthImg,
  "cardio-equipment": cardioImg,
  "home-gym-equipment": homeImg,
  "commercial-gym-equipment": commercialImg,
  "free-weights": weightsImg,
  "gym-accessories": accessoriesImg,
};

// Same images as categoryImage(), resized for small grid cards (e.g. the
// homepage's "Shop by Category" grid) instead of reusing the full 1600px
// banner used for full-bleed category page headers.
const thumbByCategory: Record<string, string> = {
  "strength-equipment": strengthThumb,
  "cardio-equipment": cardioThumb,
  "home-gym-equipment": homeThumb,
  "commercial-gym-equipment": commercialThumb,
  "free-weights": weightsThumb,
  "gym-accessories": accessoriesThumb,
};

export function categoryImage(categorySlug: string): string {
  return byCategory[categorySlug] ?? strengthImg;
}

export function categoryThumb(categorySlug: string): string {
  return thumbByCategory[categorySlug] ?? strengthThumb;
}
