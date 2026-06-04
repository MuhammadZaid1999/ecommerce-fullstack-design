import type { Product } from "../types/types";

export function formatCategory(product: Product) {
  return product.parentCategory + " > " + product.category;
}

export function filterBySearch(productList: Product[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return productList;

  return productList.filter(
    (product) =>
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.parentCategory.toLowerCase().includes(normalizedQuery),
  );
}
