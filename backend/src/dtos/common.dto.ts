import { z } from "zod";

export const entityIdSchema = z
  .string()
  .trim()
  .min(2, "id must contain at least 2 characters")
  .max(80, "id must contain at most 80 characters")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "id must be lowercase kebab-case",
  );

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
});

export type PaginationQueryDto = z.infer<typeof paginationQuerySchema>;
