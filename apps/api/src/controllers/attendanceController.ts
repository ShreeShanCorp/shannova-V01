import { updateAttendanceSchema } from "@shannova/shared-types";
import { asyncHandler } from "../lib/async-handler.js";
import { prisma } from "../lib/prisma.js";
import { sendSuccess } from "../lib/response.js";

export const updateAttendance = asyncHandler(async (req, res) => {
  const { status } = updateAttendanceSchema.parse(req.body);
  const record = await prisma.attendance.update({
    where: { id: req.params.id as string },
    data: { status, markedAt: new Date() },
  });
  return sendSuccess(res, record);
});
