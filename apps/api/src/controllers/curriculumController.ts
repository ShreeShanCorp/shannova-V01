import { createCurriculumSchema, updateCurriculumSchema } from "@shannova/shared-types";
import { asyncHandler } from "../lib/async-handler.js";
import { curriculumTreeInclude } from "../lib/curriculum-tree.js";
import { getPagination } from "../lib/paginate.js";
import { prisma } from "../lib/prisma.js";
import { ApiError, sendSuccess } from "../lib/response.js";

export const listCurricula = asyncHandler(async (req, res) => {
  const { page, pageSize, offset, limit } = getPagination(req);

  const [rows, count] = await Promise.all([
    prisma.curriculum.findMany({ skip: offset, take: limit, orderBy: { createdAt: "desc" } }),
    prisma.curriculum.count(),
  ]);

  return sendSuccess(res, rows, { meta: { page, pageSize, total: count } });
});

export const getCurriculum = asyncHandler(async (req, res) => {
  const curriculum = await prisma.curriculum.findUnique({ where: { id: req.params.id as string } });
  if (!curriculum) throw ApiError.notFound();
  return sendSuccess(res, curriculum);
});

export const getCurriculumTree = asyncHandler(async (req, res) => {
  const curriculum = await prisma.curriculum.findUnique({
    where: { id: req.params.id as string },
    include: curriculumTreeInclude,
  });
  if (!curriculum) throw ApiError.notFound();
  return sendSuccess(res, curriculum);
});

export const createCurriculum = asyncHandler(async (req, res) => {
  const data = createCurriculumSchema.parse(req.body);
  const curriculum = await prisma.curriculum.create({ data });
  return sendSuccess(res, curriculum, { status: 201 });
});

export const updateCurriculum = asyncHandler(async (req, res) => {
  const data = updateCurriculumSchema.parse(req.body);
  const curriculum = await prisma.curriculum.update({ where: { id: req.params.id as string }, data });
  return sendSuccess(res, curriculum);
});

export const deleteCurriculum = asyncHandler(async (req, res) => {
  await prisma.curriculum.delete({ where: { id: req.params.id as string } });
  return sendSuccess(res, { id: req.params.id as string });
});
