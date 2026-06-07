import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";

type RequestKey = "body" | "query" | "params";

export function validate(schema: ZodSchema, key: RequestKey) {
  return (request: Request, response: Response, next: NextFunction) => {
    const result = schema.safeParse(request[key]);

    if (!result.success) {
      return response.status(400).json({
        message: "Validation failed",
        errors: formatZodError(result.error),
      });
    }

    (request as unknown as Record<RequestKey, unknown>)[key] = result.data;
    return next();
  };
}

function formatZodError(error: ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
}
