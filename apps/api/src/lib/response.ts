import type { Response } from "express";

export interface ApiMeta {
  page?: number;
  pageSize?: number;
  total?: number;
  [key: string]: unknown;
}

export interface ApiSuccessBody<T> {
  data: T;
  error: null;
  meta: ApiMeta | null;
}

export interface ApiErrorBody {
  data: null;
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
  meta: ApiMeta | null;
}

export type ApiResponseBody<T> = ApiSuccessBody<T> | ApiErrorBody;

export function sendSuccess<T>(
  res: Response,
  data: T,
  options: { status?: number; meta?: ApiMeta } = {},
): Response {
  const body: ApiSuccessBody<T> = {
    data,
    error: null,
    meta: options.meta ?? null,
  };
  return res.status(options.status ?? 200).json(body);
}

export function sendError(
  res: Response,
  options: { status?: number; message: string; code?: string; details?: unknown },
): Response {
  const body: ApiErrorBody = {
    data: null,
    error: {
      message: options.message,
      code: options.code ?? "INTERNAL_ERROR",
      ...(options.details !== undefined ? { details: options.details } : {}),
    },
    meta: null,
  };
  return res.status(options.status ?? 500).json(body);
}

export class ApiError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  static badRequest(message: string, details?: unknown) {
    return new ApiError(400, "BAD_REQUEST", message, details);
  }

  static unauthorized(message = "Authentication required") {
    return new ApiError(401, "UNAUTHORIZED", message);
  }

  static forbidden(message = "You do not have permission to perform this action") {
    return new ApiError(403, "FORBIDDEN", message);
  }

  static notFound(message = "Resource not found") {
    return new ApiError(404, "NOT_FOUND", message);
  }

  static conflict(message: string, details?: unknown) {
    return new ApiError(409, "CONFLICT", message, details);
  }
}
