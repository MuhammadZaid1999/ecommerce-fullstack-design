import { model, Schema, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
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
  {
    timestamps: true,
  },
);

productSchema.index({ name: "text", description: "text" });

export type ProductDocument = InferSchemaType<typeof productSchema>;

export const Product = model("Product", productSchema);
