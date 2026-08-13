import { createSubmissionSchema, updateSubmissionSchema } from "@shannova/shared-types";
import { asyncHandler } from "../lib/async-handler.js";
import { prisma } from "../lib/prisma.js";
import { ApiError, sendSuccess } from "../lib/response.js";

export const listSubmissionsForTask = asyncHandler(async (req, res) => {
  const taskId = req.query.taskId as string | undefined;
  if (!taskId) throw ApiError.badRequest("taskId query param is required");

  const rows = await prisma.submission.findMany({
    where: { taskId },
    include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return sendSuccess(res, rows);
});

export const getMyAllSubmissions = asyncHandler(async (req, res) => {
  if (!req.user) throw ApiError.unauthorized();
  const rows = await prisma.submission.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
  });
  return sendSuccess(res, rows);
});

export const getMySubmission = asyncHandler(async (req, res) => {
  if (!req.user) throw ApiError.unauthorized();
  const taskId = req.query.taskId as string | undefined;
  if (!taskId) throw ApiError.badRequest("taskId query param is required");

  const submission = await prisma.submission.findUnique({
    where: { taskId_userId: { taskId, userId: req.user.id } },
  });

  return sendSuccess(res, submission);
});

export const createSubmission = asyncHandler(async (req, res) => {
  if (!req.user) throw ApiError.unauthorized();
  const data = createSubmissionSchema.parse(req.body);

  if (!data.content && !data.fileUrl) {
    throw ApiError.badRequest("Provide content or fileUrl");
  }

  const task = await prisma.task.findUnique({ where: { id: data.taskId } });
  if (!task) throw ApiError.notFound("Task not found");

  const submittedAt = new Date();
  const status = task.dueDate && submittedAt > task.dueDate ? "LATE" : "SUBMITTED";

  const submission = await prisma.submission.upsert({
    where: { taskId_userId: { taskId: data.taskId, userId: req.user.id } },
    update: { content: data.content, fileUrl: data.fileUrl, status, submittedAt },
    create: {
      taskId: data.taskId,
      userId: req.user.id,
      content: data.content,
      fileUrl: data.fileUrl,
      status,
      submittedAt,
    },
  });

  return sendSuccess(res, submission, { status: 201 });
});

/**
 * Autosave for in-progress code/content. Deliberately keyed by taskId (not a submission
 * id) since a draft can exist before the student has ever formally submitted — there's no
 * id to PATCH against yet at that point. Only touches `content`; never changes status or
 * submittedAt, so it can't accidentally mark a draft as SUBMITTED.
 */
export const saveDraft = asyncHandler(async (req, res) => {
  if (!req.user) throw ApiError.unauthorized();
  const { taskId, content } = req.body as { taskId?: string; content?: string };
  if (!taskId || typeof content !== "string") {
    throw ApiError.badRequest("taskId and content are required");
  }

  const submission = await prisma.submission.upsert({
    where: { taskId_userId: { taskId, userId: req.user.id } },
    update: { content },
    create: { taskId, userId: req.user.id, content },
  });

  return sendSuccess(res, submission);
});

export const updateSubmission = asyncHandler(async (req, res) => {
  const data = updateSubmissionSchema.parse(req.body);

  const submission = await prisma.submission.update({
    where: { id: req.params.id as string },
    data: {
      ...data,
      gradedAt: data.grade !== undefined || data.status === "GRADED" ? new Date() : undefined,
    },
  });

  return sendSuccess(res, submission);
});
