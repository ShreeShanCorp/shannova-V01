import { describe, expect, it } from "vitest";
import type { Response } from "express";
import { sendSuccess, sendError } from "../lib/response.js";

function mockResponse() {
  const res = {
    statusCode: 0,
    body: undefined as unknown,
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(payload: unknown) {
      res.body = payload;
      return res;
    },
  };
  return res as unknown as Response & { statusCode: number; body: unknown };
}

describe("response helper", () => {
  it("wraps success payloads in the { data, error, meta } envelope", () => {
    const res = mockResponse();
    sendSuccess(res, { id: "1" }, { meta: { total: 1 } });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ data: { id: "1" }, error: null, meta: { total: 1 } });
  });

  it("wraps error payloads with a null data field", () => {
    const res = mockResponse();
    sendError(res, { status: 404, code: "NOT_FOUND", message: "missing" });

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      data: null,
      error: { message: "missing", code: "NOT_FOUND" },
      meta: null,
    });
  });
});
