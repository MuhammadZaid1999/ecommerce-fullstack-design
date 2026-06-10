import { Router } from "express";
import { getBrands } from "@/controllers/brand.controller";
import { brandQuerySchema } from "@/dtos/brand.dto";
import { validate } from "@/middleware/validate";

export const brandRouter = Router();

brandRouter.get("/", validate(brandQuerySchema, "query"), getBrands);
