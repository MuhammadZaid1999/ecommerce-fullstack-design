import { Router } from "express";
import { getCategories } from "@/controllers/category.controller";
import { categoryQuerySchema } from "@/dtos/category.dto";
import { validate } from "@/middleware/validate";

export const categoryRouter = Router();

categoryRouter.get("/", validate(categoryQuerySchema, "query"), getCategories);
