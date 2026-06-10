import { model, Schema, type InferSchemaType } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export type BrandDocument = InferSchemaType<typeof brandSchema>;

export const Brand = model("Brand", brandSchema);
