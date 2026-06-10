import { Category } from "@/models/Category";
import categories from "./data/categories";

export async function seedCategories() {
  await Category.deleteMany({});

  const { root, level1, level2 } = categories;

  // Step 1: root categories
  const roots = await Category.insertMany(root);
  const rootMap = Object.fromEntries(roots.map((c) => [c.name, c._id]));

  // Step 2: level 1
  const l1 = await Category.insertMany(
    level1.map((c: any) => ({ ...c, parentId: rootMap[c.parentId] })),
  );
  const l1Map = Object.fromEntries(l1.map((c) => [c.name, c._id]));

  // Step 3: level 2 (mobile + laptops + fashion children)
  const l2 = await Category.insertMany(
    level2.map((c: any) => ({ ...c, parentId: l1Map[c.parentId] })),
  );

  console.log("Categories seeded successfully.");

  const map = Object.fromEntries(
    [...roots, ...l1, ...l2].map((c) => [c.name.toLowerCase(), c._id]),
  );

  return map;
}
