import mongoose from "mongoose";

export async function connectDB(uri: string) {
  if (!uri) {
    throw new Error("MONGODB_URI is required");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
}
