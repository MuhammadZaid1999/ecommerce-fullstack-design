import { model, Schema, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      ref: "Brand",
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      ref: "Category",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    newest: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

productSchema.index({ brand: 1 });
productSchema.index({ category: 1 });
productSchema.index({ name: "text", description: "text" });

export type ProductDocument = InferSchemaType<typeof productSchema>;

export const Product = model("Product", productSchema);
