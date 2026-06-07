import type { Request, Response } from "express";
import { Brand } from "../models/Brand.js";
import { buildPaginationMeta, getSkip } from "../utils/pagination.js";
import { mapBrand } from "../mappers/catalog.mapper.js";
import type { BrandQueryDto } from "../dtos/brand.dto.js";

export async function getBrands(request: Request, response: Response) {
  const query = request.query as unknown as BrandQueryDto;
  const filter = query.search
    ? { name: { $regex: query.search, $options: "i" } }
    : {};

  const [brands, total] = await Promise.all([
    Brand.find(filter)
      .sort({ name: 1 })
      .skip(getSkip(query.page, query.limit))
      .limit(query.limit)
      .lean(),
    Brand.countDocuments(filter),
  ]);

  return response.json({
    data: brands.map(mapBrand),
    meta: buildPaginationMeta(query.page, query.limit, total),
  });
}
