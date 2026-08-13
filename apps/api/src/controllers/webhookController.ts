import { z } from "zod";
import { asyncHandler } from "../lib/async-handler.js";
import { prisma } from "../lib/prisma.js";
import { ApiError, sendSuccess } from "../lib/response.js";

const PRESENT_THRESHOLD_MINUTES = 10;

const attendanceReportSchema = z.object({
  classId: z.string().min(1),
  attendees: z.array(
    z.object({
      email: z.string().email(),
      durationMinutes: z.number().min(0),
    }),
  ),
});

/**
 * Google Workspace's real Meet attendance-report webhook is a Workspace-tier-only feature
 * with its own delivery format (via Drive/Gmail), which isn't reproducible for a personal
 * Google account. This accepts a simplified equivalent payload — { classId, attendees: [{
 * email, durationMinutes }] } — and writes real Attendance rows from it, so the rest of the
 * pipeline (PATCH override, attendance review UI) works against real data either way.
 */
export const googleMeetWebhook = asyncHandler(async (req, res) => {
  const expectedSecret = process.env.GOOGLE_WEBHOOK_SECRET;
  if (!expectedSecret) {
    throw ApiError.badRequest("Webhook not configured. Set GOOGLE_WEBHOOK_SECRET to enable it.");
  }
  if (req.header("x-webhook-secret") !== expectedSecret) {
    throw ApiError.unauthorized("Invalid webhook secret");
  }

  const { classId, attendees } = attendanceReportSchema.parse(req.body);

  const cls = await prisma.class.findUnique({ where: { id: classId } });
  if (!cls) throw ApiError.notFound("Class not found");

  const users = await prisma.user.findMany({
    where: { email: { in: attendees.map((a) => a.email) } },
  });
  const userByEmail = new Map(users.map((u) => [u.email, u]));

  let updated = 0;
  for (const attendee of attendees) {
    const user = userByEmail.get(attendee.email);
    if (!user) continue;

    const status = attendee.durationMinutes >= PRESENT_THRESHOLD_MINUTES ? "PRESENT" : attendee.durationMinutes > 0 ? "LATE" : "ABSENT";

    await prisma.attendance.upsert({
      where: { classId_userId: { classId, userId: user.id } },
      update: { status, markedAt: new Date() },
      create: { classId, userId: user.id, status },
    });
    updated += 1;
  }

  return sendSuccess(res, { classId, updated });
});
