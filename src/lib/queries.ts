import { queryOptions } from "@tanstack/react-query";
import { fetchProductDetail, fetchProducts, fetchReviews } from "@/lib/products.functions";

export const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: () => fetchProducts(),
  staleTime: 60_000,
});

export function productDetailQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ["product", slug],
    queryFn: () => fetchProductDetail({ data: slug }),
    staleTime: 60_000,
  });
}

export const reviewsQueryOptions = queryOptions({
  queryKey: ["reviews"],
  queryFn: () => fetchReviews(),
  staleTime: 60_000,
});
