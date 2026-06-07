import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { env } from "../config/env.js";
import brands from "./data/brands.js";
import { Brand } from "../models/Brand.js";

await connectDB(env.mongoUri);

await Brand.deleteMany({});

await Brand.insertMany(brands);

console.log(`$${brands.length} brands.`);

await mongoose.disconnect();
