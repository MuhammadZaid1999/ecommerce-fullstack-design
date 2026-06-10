import type { Request, Response } from "express";
import {
  categoryQuerySchema,
  type CategoryQueryDto,
} from "@/dtos/category.dto";
import { Category } from "@/models/Category";
import { mapCategory } from "@/mappers/catalog.mapper";
import { buildPaginationMeta, getSkip } from "@/utils/pagination";

export async function getCategories(request: Request, response: Response) {
  const query = request.query as unknown as CategoryQueryDto;
  const filter = categoryQuerySchema.parse(query);
  const mongoFilter: Record<string, unknown> = {};

  if (filter.parentId !== undefined) {
    mongoFilter.parentId = filter.parentId;
  }

  if (filter.search) {
    mongoFilter.name = { $regex: filter.search, $options: "i" };
  }

  const [categories, total] = await Promise.all([
    Category.find(mongoFilter)
      .sort({ parentId: 1, name: 1 })
      .skip(getSkip(filter.page, filter.limit))
      .limit(filter.limit)
      .lean(),
    Category.countDocuments(mongoFilter),
  ]);

  return response.json({
    data: categories.map(mapCategory),
    meta: buildPaginationMeta(filter.page, filter.limit, total),
  });
}
