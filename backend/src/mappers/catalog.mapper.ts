import type { BrandDocument } from "../models/Brand.js";
import type { CategoryDocument } from "../models/Category.js";
import type { ProductDocument } from "../models/Product.js";

type ProductLike = ProductDocument & { createdAt?: Date; updatedAt?: Date };
type CategoryLike = CategoryDocument & { createdAt?: Date; updatedAt?: Date };

export function mapBrand(brand: BrandDocument) {
  return {
    id: brand.id,
    name: brand.name,
  };
}

export function mapCategory(category: CategoryLike) {
  return {
    id: category.id,
    name: category.name,
    parentId: category.parentId ?? null,
  };
}

export function mapProduct(
  product: ProductLike,
  brandsById: Map<string, BrandDocument>,
  categoriesById: Map<string, CategoryDocument>,
) {
  const brand = brandsById.get(product.brand);
  const category = categoriesById.get(product.category);
  const parentCategory =
    category?.parentId ? categoriesById.get(category.parentId) : undefined;

  return {
    id: product.id,
    name: product.name,
    brand: brand?.name ?? product.brand,
    brandId: product.brand,
    parentCategory: parentCategory?.name ?? "",
    parentCategoryId: category?.parentId ?? null,
    category: category?.name ?? product.category,
    categoryId: product.category,
    price: product.price,
    rating: product.rating,
    image: product.image,
    description: product.description,
    details: product.details,
    featured: product.featured,
    newest: product.newest,
  };
}
