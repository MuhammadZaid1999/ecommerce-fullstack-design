import { z } from "zod";
import { entityIdSchema } from "./common.dto";

const booleanQuerySchema = z
  .string()
  .trim()
  .toLowerCase()
  .transform((value, ctx) => {
    if (value === "true") return true;
    if (value === "false") return false;

    ctx.addIssue({
      code: "custom",
      message: "Expected true or false",
    });
    return z.NEVER;
  });

const productBaseSchema = z.object({
  name: z.string().trim().min(2).max(160),
  brand: entityIdSchema,
  category: entityIdSchema,
  price: z.number().min(0),
  rating: z.number().min(0).max(5),
  image: z.string().trim().url(),
  description: z.string().trim().min(10).max(1200),
  details: z.array(z.string().trim().min(1).max(180)).default([]),
  featured: z.boolean().optional().default(false),
  newest: z.boolean().optional().default(false),
});

export const createProductSchema = productBaseSchema.extend({
  id: entityIdSchema,
});

export const updateProductSchema = productBaseSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });

export const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  search: z.string().trim().max(120).optional(),
  brand: entityIdSchema.optional(),
  category: entityIdSchema.optional(),
  parentCategory: entityIdSchema.optional(),
  featured: booleanQuerySchema.optional(),
  newest: booleanQuerySchema.optional(),
  sort: z
    .enum(["newest", "price_asc", "price_desc", "rating_desc", "name_asc"])
    .default("newest"),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
export type ProductQueryDto = z.infer<typeof productQuerySchema>;
