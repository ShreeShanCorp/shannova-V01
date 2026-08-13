import { createEnrollmentSchema } from "@shannova/shared-types";
import { asyncHandler } from "../lib/async-handler.js";
import { prisma } from "../lib/prisma.js";
import { ApiError, sendSuccess } from "../lib/response.js";

export const listMyEnrollments = asyncHandler(async (req, res) => {
  if (!req.user) throw ApiError.unauthorized();

  const rows = await prisma.enrollment.findMany({
    where: { userId: req.user.id },
    include: { cohort: true },
    orderBy: { createdAt: "desc" },
  });

  return sendSuccess(res, rows);
});

export const listEnrollments = asyncHandler(async (req, res) => {
  const cohortId = req.query.cohortId as string | undefined;

  const rows = await prisma.enrollment.findMany({
    where: cohortId ? { cohortId } : undefined,
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return sendSuccess(res, rows);
});

export const createEnrollment = asyncHandler(async (req, res) => {
  const data = createEnrollmentSchema.parse(req.body);
  const enrollment = await prisma.enrollment.create({ data, include: { user: true, cohort: true } });
  return sendSuccess(res, enrollment, { status: 201 });
});

export const deleteEnrollment = asyncHandler(async (req, res) => {
  await prisma.enrollment.delete({ where: { id: req.params.id as string } });
  return sendSuccess(res, { id: req.params.id as string });
});
