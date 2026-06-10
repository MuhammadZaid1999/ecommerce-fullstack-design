import { Product } from "@/models/Product";
import products from "./data/products";

export async function seedProducts(
  brandMap: Record<string, any>,
  categoryMap: Record<string, any>,
) {
  await Product.deleteMany({});

  await Product.insertMany(
    products.map((p: any) => ({
      ...p,
      brand: brandMap[p.brand.toLowerCase()],
      category: categoryMap[p.category.toLowerCase()],
    })),
  );

  console.log("products seeded successfully.");
}
