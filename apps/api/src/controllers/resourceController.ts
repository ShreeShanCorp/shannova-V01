import type { Resource } from "@prisma/client";
import { createResourceSchema, updateResourceSchema } from "@shannova/shared-types";
import { asyncHandler } from "../lib/async-handler.js";
import { getPagination } from "../lib/paginate.js";
import { prisma } from "../lib/prisma.js";
import { meiliSyncQueue } from "../lib/queue.js";
import { ApiError, sendSuccess } from "../lib/response.js";

async function enqueueUpsert(record: Resource) {
  try {
    await meiliSyncQueue.add("upsert", {
      index: "resources",
      action: "upsert",
      document: {
        id: record.id,
        title: record.title,
        type: record.type as any,
        url: record.url,
        content: record.content,
        topicId: record.topicId,
      },
    });
  } catch {
    // Offline queue fallback
  }
}

async function enqueueDelete(id: string) {
  try {
    await meiliSyncQueue.add("delete", { index: "resources", action: "delete", documentId: id });
  } catch {
    // Offline queue fallback
  }
}

export const listResources = asyncHandler(async (req, res) => {
  const { page, pageSize, offset, limit } = getPagination(req);

  const [rows, count] = await Promise.all([
    prisma.resource.findMany({ skip: offset, take: limit, orderBy: { order: "asc" } }),
    prisma.resource.count(),
  ]);

  return sendSuccess(res, rows, { meta: { page, pageSize, total: count } });
});

export const getResource = asyncHandler(async (req, res) => {
  const record = await prisma.resource.findUnique({ where: { id: req.params.id as string } });
  if (!record) throw ApiError.notFound();
  return sendSuccess(res, record);
});

export const createResource = asyncHandler(async (req, res) => {
  const data = createResourceSchema.parse(req.body);
  const record = await prisma.resource.create({ data: data as any });
  await enqueueUpsert(record);
  return sendSuccess(res, record, { status: 201 });
});

export const updateResource = asyncHandler(async (req, res) => {
  const data = updateResourceSchema.parse(req.body);
  const record = await prisma.resource.update({ where: { id: req.params.id as string }, data: data as any });
  await enqueueUpsert(record);
  return sendSuccess(res, record);
});

export const deleteResource = asyncHandler(async (req, res) => {
  const id = req.params.id as string;
  await prisma.resource.delete({ where: { id } });
  await enqueueDelete(id);
  return sendSuccess(res, { id });
});
