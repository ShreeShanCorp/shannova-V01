import { asyncHandler } from "../lib/async-handler.js";
import { prisma } from "../lib/prisma.js";
import { ApiError, sendSuccess } from "../lib/response.js";

export const listMyProgress = asyncHandler(async (req, res) => {
  if (!req.user) throw ApiError.unauthorized();
  const curriculumId = req.query.curriculumId as string | undefined;

  const rows = await prisma.topicProgress.findMany({
    where: {
      userId: req.user.id,
      ...(curriculumId ? { topic: { week: { module: { curriculumId } } } } : {}),
    },
    select: { topicId: true, completedAt: true },
  });

  return sendSuccess(res, rows);
});

export const markTopicComplete = asyncHandler(async (req, res) => {
  if (!req.user) throw ApiError.unauthorized();
  const topicId = req.params.topicId as string;

  const topic = await prisma.topic.findUnique({ where: { id: topicId } });
  if (!topic) throw ApiError.notFound("Topic not found");

  const record = await prisma.topicProgress.upsert({
    where: { userId_topicId: { userId: req.user.id, topicId } },
    update: {},
    create: { userId: req.user.id, topicId },
  });

  return sendSuccess(res, record, { status: 201 });
});

export const markTopicIncomplete = asyncHandler(async (req, res) => {
  if (!req.user) throw ApiError.unauthorized();
  const topicId = req.params.topicId as string;

  await prisma.topicProgress.deleteMany({ where: { userId: req.user.id, topicId } });
  return sendSuccess(res, { topicId });
});
