import { Router } from "express";
import { getCategories } from "../controllers/category.controller.js";
import { categoryQuerySchema } from "../dtos/category.dto.js";
import { validate } from "../middleware/validate.js";

export const categoryRouter = Router();

categoryRouter.get("/", validate(categoryQuerySchema, "query"), getCategories);
