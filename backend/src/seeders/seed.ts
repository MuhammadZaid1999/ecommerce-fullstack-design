import mongoose from "mongoose";
import { connectDB } from "@/config/db";
import { seedBrands } from "./brands-seed";
import { seedCategories } from "./categories-seed";
import { seedProducts } from "./products-seed";

async function runSeeder() {
  await connectDB();

  const brandMap = await seedBrands();
  const categoryMap = await seedCategories();
  await seedProducts(brandMap, categoryMap);

  console.log("all seeders completed successfully.");

  await mongoose.disconnect();
}

runSeeder().catch((err) => {
  console.error(err);
  process.exit(1);
});
