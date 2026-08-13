import { createTaskSchema, updateTaskSchema } from "@shannova/shared-types";
import { asyncHandler } from "../lib/async-handler.js";
import { getPagination } from "../lib/paginate.js";
import { prisma } from "../lib/prisma.js";
import { scheduleTaskDueReminder } from "../lib/queue.js";
import { ApiError, sendSuccess } from "../lib/response.js";

export const listTasks = asyncHandler(async (req, res) => {
  const cohortId = req.query.cohortId as string | undefined;
  if (!cohortId) throw ApiError.badRequest("cohortId query param is required");

  const { page, pageSize, offset, limit } = getPagination(req);

  const [rows, count] = await Promise.all([
    prisma.task.findMany({
      where: { cohortId },
      skip: offset,
      take: limit,
      orderBy: { dueDate: "asc" },
      include: { topic: { select: { id: true, title: true } } },
    }),
    prisma.task.count({ where: { cohortId } }),
  ]);

  return sendSuccess(res, rows, { meta: { page, pageSize, total: count } });
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await prisma.task.findUnique({
    where: { id: req.params.id as string },
    include: { topic: { select: { id: true, title: true } } },
  });
  if (!task) throw ApiError.notFound();
  return sendSuccess(res, task);
});

export const createTask = asyncHandler(async (req, res) => {
  const data = createTaskSchema.parse(req.body);
  const taskPayload = {
    ...data,
    rubric: data.rubric ? JSON.stringify(data.rubric) : undefined,
  };
  const task = await prisma.task.create({ data: taskPayload as any });

  if (task.dueDate) {
    try {
      const enrollments = await prisma.enrollment.findMany({
        where: { cohortId: task.cohortId, role: "STUDENT" },
        include: { user: { select: { email: true } } },
      });
      await scheduleTaskDueReminder({
        taskId: task.id,
        title: task.title,
        dueDate: task.dueDate,
        studentEmails: enrollments.map((e) => e.user.email),
      });
    } catch {
      // Offline queue fallback
    }
  }

  return sendSuccess(res, task, { status: 201 });
});

export const updateTask = asyncHandler(async (req, res) => {
  const data = updateTaskSchema.parse(req.body);
  const taskPayload = {
    ...data,
    rubric: data.rubric ? JSON.stringify(data.rubric) : undefined,
  };
  const task = await prisma.task.update({ where: { id: req.params.id as string }, data: taskPayload as any });
  return sendSuccess(res, task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  await prisma.task.delete({ where: { id: req.params.id as string } });
  return sendSuccess(res, { id: req.params.id as string });
});
