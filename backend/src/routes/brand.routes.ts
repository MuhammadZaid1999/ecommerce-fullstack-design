import { Router } from "express";
import { getBrands } from "../controllers/brand.controller.js";
import { brandQuerySchema } from "../dtos/brand.dto.js";
import { validate } from "../middleware/validate.js";

export const brandRouter = Router();

brandRouter.get("/", validate(brandQuerySchema, "query"), getBrands);
