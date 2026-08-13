import { clerkClient } from "@clerk/express";
import { updateUserRoleSchema } from "@shannova/shared-types";
import { asyncHandler } from "../lib/async-handler.js";
import { getPagination } from "../lib/paginate.js";
import { prisma } from "../lib/prisma.js";
import { ApiError, sendSuccess } from "../lib/response.js";

export const getMe = asyncHandler(async (req, res) => {
  if (!req.user) throw ApiError.unauthorized();
  return sendSuccess(res, req.user);
});

export const listUsers = asyncHandler(async (req, res) => {
  const { page, pageSize, offset, limit } = getPagination(req);

  const [rows, count] = await Promise.all([
    prisma.user.findMany({ skip: offset, take: limit, orderBy: { createdAt: "desc" } }),
    prisma.user.count(),
  ]);

  return sendSuccess(res, rows, { meta: { page, pageSize, total: count } });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = updateUserRoleSchema.parse(req.body);
  const user = await prisma.user.update({ where: { id: req.params.id as string }, data: { role } });

  // Keep Clerk's publicMetadata in sync so it's available in the frontend session claims too.
  await clerkClient.users.updateUserMetadata(user.clerkId, {
    publicMetadata: { role },
  });

  return sendSuccess(res, user);
});
