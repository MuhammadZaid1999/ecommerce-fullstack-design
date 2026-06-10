import { model, Schema, type InferSchemaType } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export type CategoryDocument = InferSchemaType<typeof categorySchema>;

export const Category = model("Category", categorySchema);
