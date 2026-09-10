import { queryOptions } from "@tanstack/react-query";
import { fetchProducts, fetchReviews } from "@/lib/products.functions";

export const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: () => fetchProducts(),
  staleTime: 60_000,
});

export const reviewsQueryOptions = queryOptions({
  queryKey: ["reviews"],
  queryFn: () => fetchReviews(),
  staleTime: 60_000,
});
