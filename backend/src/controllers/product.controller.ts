import type { Request, Response } from "express";
import type {
  CreateProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from "../dtos/product.dto.js";
import { Brand } from "../models/Brand.js";
import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { mapProduct } from "../mappers/catalog.mapper.js";
import { buildPaginationMeta, getSkip } from "../utils/pagination.js";

export async function getProducts(request: Request, response: Response) {
  const query = request.query as unknown as ProductQueryDto;
  const filter: Record<string, unknown> = {};

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } },
    ];
  }

  if (query.brand) filter.brand = query.brand;
  if (query.category) filter.category = query.category;
  if (query.featured !== undefined) filter.featured = query.featured;
  if (query.newest !== undefined) filter.newest = query.newest;

  if (query.parentCategory) {
    const childCategories = await Category.find({
      parentId: query.parentCategory,
    })
      .select("id")
      .lean();
    filter.category = { $in: childCategories.map((category) => category.id) };
  }

  const sort = getProductSort(query.sort);
  const [products, total, brands, categories] = await Promise.all([
    Product.find(filter)
      .sort(sort)
      .skip(getSkip(query.page, query.limit))
      .limit(query.limit)
      .lean(),
    Product.countDocuments(filter),
    Brand.find().lean(),
    Category.find().lean(),
  ]);

  const brandsById = new Map(brands.map((brand) => [brand.id, brand]));
  const categoriesById = new Map(
    categories.map((category) => [category.id, category]),
  );

  return response.json({
    data: products.map((product) =>
      mapProduct(product, brandsById, categoriesById),
    ),
    meta: buildPaginationMeta(query.page, query.limit, total),
  });
}

export async function getProductById(request: Request, response: Response) {
  const { id } = request.params;
  const [product, brands, categories] = await Promise.all([
    Product.findOne({ id }).lean(),
    Brand.find().lean(),
    Category.find().lean(),
  ]);

  if (!product) {
    return response.status(404).json({ message: "Product not found" });
  }

  const brandsById = new Map(brands.map((brand) => [brand.id, brand]));
  const categoriesById = new Map(
    categories.map((category) => [category.id, category]),
  );

  return response.json({
    data: mapProduct(product, brandsById, categoriesById),
  });
}

export async function createProduct(request: Request, response: Response) {
  const dto = request.body as CreateProductDto;
  const relationshipError = await validateProductRelationships(dto);

  if (relationshipError) {
    return response.status(400).json({ message: relationshipError });
  }

  try {
    const product = await Product.create(dto);
    const mappedProduct = await getMappedProduct(product.id);
    return response.status(201).json({ data: mappedProduct });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return response.status(409).json({ message: "Product id already exists" });
    }
    throw error;
  }
}

export async function updateProduct(request: Request, response: Response) {
  const { id } = request.params;
  const dto = request.body as UpdateProductDto;
  const relationshipError = await validateProductRelationships(dto);

  if (relationshipError) {
    return response.status(400).json({ message: relationshipError });
  }

  const product = await Product.findOneAndUpdate({ id }, dto, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return response.status(404).json({ message: "Product not found" });
  }

  const mappedProduct = await getMappedProduct(product.id);
  return response.json({ data: mappedProduct });
}

export async function deleteProduct(request: Request, response: Response) {
  const { id } = request.params;
  const product = await Product.findOneAndDelete({ id });

  if (!product) {
    return response.status(404).json({ message: "Product not found" });
  }

  return response.status(204).send();
}

async function validateProductRelationships(
  dto: Partial<Pick<CreateProductDto, "brand" | "category">>,
) {
  const [brand, category] = await Promise.all([
    dto.brand ? Brand.exists({ id: dto.brand }) : true,
    dto.category ? Category.exists({ id: dto.category }) : true,
  ]);

  if (!brand) return "Brand does not exist";
  if (!category) return "Category does not exist";
  return null;
}

async function getMappedProduct(productId: string) {
  const [product, brands, categories] = await Promise.all([
    Product.findOne({ id: productId }).lean(),
    Brand.find().lean(),
    Category.find().lean(),
  ]);

  if (!product) return null;

  return mapProduct(
    product,
    new Map(brands.map((brand) => [brand.id, brand])),
    new Map(categories.map((category) => [category.id, category])),
  );
}

function getProductSort(sort: ProductQueryDto["sort"]): Record<string, 1 | -1> {
  if (sort === "price_asc") return { price: 1 };
  if (sort === "price_desc") return { price: -1 };
  if (sort === "rating_desc") return { rating: -1 };
  if (sort === "name_asc") return { name: 1 };
  return { createdAt: -1 };
}

function isDuplicateKeyError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}
