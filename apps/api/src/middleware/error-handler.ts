import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { ApiError, sendError } from "../lib/response.js";

export function notFoundHandler(req: Request, res: Response) {
  sendError(res, {
    status: 404,
    code: "NOT_FOUND",
    message: `No route matches ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return sendError(res, { status: err.status, code: err.code, message: err.message, details: err.details });
  }

  if (err instanceof ZodError) {
    return sendError(res, {
      status: 400,
      code: "BAD_REQUEST",
      message: "Validation failed",
      details: err.issues.map((issue) => ({ path: issue.path, message: issue.message })),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return sendError(res, {
        status: 409,
        code: "CONFLICT",
        message: "A record with this value already exists",
        details: { target: err.meta?.target },
      });
    }

    if (err.code === "P2003") {
      return sendError(res, {
        status: 400,
        code: "BAD_REQUEST",
        message: "Referenced record does not exist",
      });
    }

    if (err.code === "P2025") {
      return sendError(res, { status: 404, code: "NOT_FOUND", message: "Resource not found" });
    }
  }

  console.error(err);
  return sendError(res, { status: 500, code: "INTERNAL_ERROR", message: "Something went wrong" });
}
