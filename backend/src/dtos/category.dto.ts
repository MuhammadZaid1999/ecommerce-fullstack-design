import { z } from "zod";
import { entityIdSchema } from "./common.dto";

export const categoryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  parentId: entityIdSchema.nullish(),
  search: z.string().trim().max(120).optional(),
});

export const createCategorySchema = z.object({
  id: entityIdSchema,
  name: z.string().trim().min(2).max(120),
  parentId: entityIdSchema.nullable().optional(),
});

export type CategoryQueryDto = z.infer<typeof categoryQuerySchema>;
export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
