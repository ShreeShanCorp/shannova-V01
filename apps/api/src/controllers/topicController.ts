import { createTopicSchema, updateTopicSchema } from "@shannova/shared-types";
import { asyncHandler } from "../lib/async-handler.js";
import { getPagination } from "../lib/paginate.js";
import { prisma } from "../lib/prisma.js";
import { ApiError, sendSuccess } from "../lib/response.js";

export const listTopics = asyncHandler(async (req, res) => {
  const { page, pageSize, offset, limit } = getPagination(req);

  const [rows, count] = await Promise.all([
    prisma.topic.findMany({ skip: offset, take: limit, orderBy: { order: "asc" } }),
    prisma.topic.count(),
  ]);

  return sendSuccess(res, rows, { meta: { page, pageSize, total: count } });
});

export const getTopic = asyncHandler(async (req, res) => {
  const record = await prisma.topic.findUnique({ where: { id: req.params.id as string } });
  if (!record) throw ApiError.notFound();
  return sendSuccess(res, record);
});

export const createTopic = asyncHandler(async (req, res) => {
  const data = createTopicSchema.parse(req.body);
  const record = await prisma.topic.create({ data });
  return sendSuccess(res, record, { status: 201 });
});

export const updateTopic = asyncHandler(async (req, res) => {
  const data = updateTopicSchema.parse(req.body);
  const record = await prisma.topic.update({ where: { id: req.params.id as string }, data });
  return sendSuccess(res, record);
});

export const deleteTopic = asyncHandler(async (req, res) => {
  await prisma.topic.delete({ where: { id: req.params.id as string } });
  return sendSuccess(res, { id: req.params.id as string });
});
