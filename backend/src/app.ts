import cors from "cors";
import express, {
  type ErrorRequestHandler,
  type Request,
  type Response,
} from "express";
import morgan from "morgan";
import { env } from "@/config/env";
import { brandRouter } from "@/routes/brand.routes";
import { categoryRouter } from "@/routes/category.routes";
import { productRouter } from "@/routes/product.routes";

export const app = express();

app.use(
  cors({
    origin: env.frontendOrigin,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_request: Request, response: Response) => {
  response.json({ status: "ok" });
});

app.use("/api/products", productRouter);
app.use("/api/brands", brandRouter);
app.use("/api/categories", categoryRouter);

app.use((_request: Request, response: Response) => {
  response.status(404).json({ message: "Route not found" });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: "Internal server error" });
};

app.use(errorHandler);
