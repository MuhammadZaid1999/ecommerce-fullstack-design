import { model, Schema, type InferSchemaType } from "mongoose";

const categorySchema = new Schema(
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
    parentId: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

categorySchema.index({ parentId: 1 });

export type CategoryDocument = InferSchemaType<typeof categorySchema>;

export const Category = model("Category", categorySchema);
