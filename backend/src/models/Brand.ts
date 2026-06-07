import { model, Schema, type InferSchemaType } from "mongoose";

const brandSchema = new Schema(
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
  },
  { timestamps: true },
);

export type BrandDocument = InferSchemaType<typeof brandSchema>;

export const Brand = model("Brand", brandSchema);
