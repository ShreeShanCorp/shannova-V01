import { createWeekSchema, updateWeekSchema } from "@shannova/shared-types";
import { asyncHandler } from "../lib/async-handler.js";
import { getPagination } from "../lib/paginate.js";
import { prisma } from "../lib/prisma.js";
import { ApiError, sendSuccess } from "../lib/response.js";

export const listWeeks = asyncHandler(async (req, res) => {
  const { page, pageSize, offset, limit } = getPagination(req);

  const [rows, count] = await Promise.all([
    prisma.week.findMany({ skip: offset, take: limit, orderBy: { order: "asc" } }),
    prisma.week.count(),
  ]);

  return sendSuccess(res, rows, { meta: { page, pageSize, total: count } });
});

export const getWeek = asyncHandler(async (req, res) => {
  const record = await prisma.week.findUnique({ where: { id: req.params.id as string } });
  if (!record) throw ApiError.notFound();
  return sendSuccess(res, record);
});

export const createWeek = asyncHandler(async (req, res) => {
  const data = createWeekSchema.parse(req.body);
  const record = await prisma.week.create({ data });
  return sendSuccess(res, record, { status: 201 });
});

export const updateWeek = asyncHandler(async (req, res) => {
  const data = updateWeekSchema.parse(req.body);
  const record = await prisma.week.update({ where: { id: req.params.id as string }, data });
  return sendSuccess(res, record);
});

export const deleteWeek = asyncHandler(async (req, res) => {
  await prisma.week.delete({ where: { id: req.params.id as string } });
  return sendSuccess(res, { id: req.params.id as string });
});
