import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { env } from "../config/env.js";
import categories from "./data/categories.js";
import { Category } from "../models/Category.js";

await connectDB(env.mongoUri);

await Category.deleteMany({});

await Category.insertMany(categories);

console.log(`$${categories.length} categories.`);

await mongoose.disconnect();
