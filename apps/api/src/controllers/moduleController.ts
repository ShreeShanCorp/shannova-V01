import { createModuleSchema, updateModuleSchema } from "@shannova/shared-types";
import { asyncHandler } from "../lib/async-handler.js";
import { getPagination } from "../lib/paginate.js";
import { prisma } from "../lib/prisma.js";
import { ApiError, sendSuccess } from "../lib/response.js";

export const listModules = asyncHandler(async (req, res) => {
  const { page, pageSize, offset, limit } = getPagination(req);

  const [rows, count] = await Promise.all([
    prisma.module.findMany({ skip: offset, take: limit, orderBy: { order: "asc" } }),
    prisma.module.count(),
  ]);

  return sendSuccess(res, rows, { meta: { page, pageSize, total: count } });
});

export const getModule = asyncHandler(async (req, res) => {
  const record = await prisma.module.findUnique({ where: { id: req.params.id as string } });
  if (!record) throw ApiError.notFound();
  return sendSuccess(res, record);
});

export const createModule = asyncHandler(async (req, res) => {
  const data = createModuleSchema.parse(req.body);
  const record = await prisma.module.create({ data });
  return sendSuccess(res, record, { status: 201 });
});

export const updateModule = asyncHandler(async (req, res) => {
  const data = updateModuleSchema.parse(req.body);
  const record = await prisma.module.update({ where: { id: req.params.id as string }, data });
  return sendSuccess(res, record);
});

export const deleteModule = asyncHandler(async (req, res) => {
  await prisma.module.delete({ where: { id: req.params.id as string } });
  return sendSuccess(res, { id: req.params.id as string });
});
