import { createCohortSchema, updateCohortSchema } from "@shannova/shared-types";
import { asyncHandler } from "../lib/async-handler.js";
import { curriculumTreeInclude } from "../lib/curriculum-tree.js";
import { getPagination } from "../lib/paginate.js";
import { prisma } from "../lib/prisma.js";
import { ApiError, sendSuccess } from "../lib/response.js";

export const listCohorts = asyncHandler(async (req, res) => {
  const { page, pageSize, offset, limit } = getPagination(req);

  const [rows, count] = await Promise.all([
    prisma.cohort.findMany({
      skip: offset,
      take: limit,
      orderBy: { startDate: "desc" },
      include: { curriculum: true },
    }),
    prisma.cohort.count(),
  ]);

  return sendSuccess(res, rows, { meta: { page, pageSize, total: count } });
});

export const getCohort = asyncHandler(async (req, res) => {
  const cohort = await prisma.cohort.findUnique({
    where: { id: req.params.id as string },
    include: { curriculum: true },
  });
  if (!cohort) throw ApiError.notFound();
  return sendSuccess(res, cohort);
});

export const getCohortCurriculum = asyncHandler(async (req, res) => {
  const cohort = await prisma.cohort.findUnique({ where: { id: req.params.id as string } });
  if (!cohort) throw ApiError.notFound();

  const curriculum = await prisma.curriculum.findUnique({
    where: { id: cohort.curriculumId },
    include: curriculumTreeInclude,
  });
  if (!curriculum) throw ApiError.notFound();

  return sendSuccess(res, curriculum);
});

export const createCohort = asyncHandler(async (req, res) => {
  const data = createCohortSchema.parse(req.body);
  const cohort = await prisma.cohort.create({ data });
  return sendSuccess(res, cohort, { status: 201 });
});

export const updateCohort = asyncHandler(async (req, res) => {
  const data = updateCohortSchema.parse(req.body);
  const cohort = await prisma.cohort.update({ where: { id: req.params.id as string }, data });
  return sendSuccess(res, cohort);
});

export const deleteCohort = asyncHandler(async (req, res) => {
  await prisma.cohort.delete({ where: { id: req.params.id as string } });
  return sendSuccess(res, { id: req.params.id as string });
});
