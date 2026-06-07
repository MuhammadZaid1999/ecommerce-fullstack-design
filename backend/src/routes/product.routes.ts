import { Router } from "express";
import { z } from "zod";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { entityIdSchema } from "../dtos/common.dto.js";
import {
  createProductSchema,
  productQuerySchema,
  updateProductSchema,
} from "../dtos/product.dto.js";
import { validate } from "../middleware/validate.js";

const idParamSchema = z.object({ id: entityIdSchema });

export const productRouter = Router();

productRouter.get("/", validate(productQuerySchema, "query"), getProducts);
productRouter.get("/:id", validate(idParamSchema, "params"), getProductById);
productRouter.post("/", validate(createProductSchema, "body"), createProduct);
productRouter.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateProductSchema, "body"),
  updateProduct,
);
productRouter.delete("/:id", validate(idParamSchema, "params"), deleteProduct);
