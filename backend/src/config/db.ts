import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB() {
  const uri = env.mongoUri;
  if (!uri) {
    throw new Error("MONGODB_URI is required");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
}
