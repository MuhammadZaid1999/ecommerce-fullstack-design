import brands from "./data/brands";
import { Brand } from "@/models/Brand";

export async function seedBrands() {
  await Brand.deleteMany({});

  const brand = await Brand.insertMany(brands);

  console.log(`brands seeded successfully.`);

  const map = Object.fromEntries(
    brand.map((b) => [b.name.toLowerCase(), b._id]),
  );

  return map;
}
