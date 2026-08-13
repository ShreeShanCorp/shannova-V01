import { scheduleClassSchema } from "@shannova/shared-types";
import { asyncHandler } from "../lib/async-handler.js";
import { scheduleClassReminder } from "../lib/class-reminder-queue.js";
import { createMeetEvent } from "../lib/google-calendar.js";
import { prisma } from "../lib/prisma.js";
import { ApiError, sendSuccess } from "../lib/response.js";

export const createClass = asyncHandler(async (req, res) => {
  if (!req.user) throw ApiError.unauthorized();
  const data = scheduleClassSchema.parse(req.body);
  const instructorId = data.instructorId ?? req.user.id;

  const enrollments = await prisma.enrollment.findMany({
    where: { cohortId: data.cohortId },
    include: { user: { select: { id: true, email: true } } },
  });

  const instructor = await prisma.user.findUnique({ where: { id: instructorId } });
  if (!instructor) throw ApiError.badRequest("Unknown instructorId");

  const attendeeEmails = [...enrollments.map((e) => e.user.email), instructor.email];

  const meetEvent = await createMeetEvent({
    summary: data.title,
    description: data.description,
    startTime: data.startTime,
    endTime: data.endTime,
    attendeeEmails,
  });

  const cls = await prisma.class.create({
    data: {
      cohortId: data.cohortId,
      instructorId,
      topicId: data.topicId,
      title: data.title,
      description: data.description,
      startTime: data.startTime,
      endTime: data.endTime,
      meetingUrl: meetEvent?.meetUrl ?? null,
      calendarEventId: meetEvent?.eventId ?? null,
    },
  });

  if (enrollments.length > 0) {
    await prisma.attendance.createMany({
      data: enrollments.map((e) => ({ classId: cls.id, userId: e.userId })),
    });
  }

  await scheduleClassReminder(cls.id, cls.startTime);

  return sendSuccess(res, cls, { status: 201 });
});

export const listUpcomingClasses = asyncHandler(async (req, res) => {
  if (!req.user) throw ApiError.unauthorized();

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: req.user.id },
    select: { cohortId: true },
  });
  const cohortIds = enrollments.map((e) => e.cohortId);

  const classes = await prisma.class.findMany({
    where: {
      status: "SCHEDULED",
      startTime: { gte: new Date() },
      OR: [{ cohortId: { in: cohortIds } }, { instructorId: req.user.id }],
    },
    orderBy: { startTime: "asc" },
    take: 10,
    include: {
      topic: { select: { id: true, title: true } },
      instructor: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
  });

  return sendSuccess(res, classes);
});

export const listClasses = asyncHandler(async (req, res) => {
  const cohortId = req.query.cohortId as string | undefined;
  if (!cohortId) throw ApiError.badRequest("cohortId query param is required");

  const classes = await prisma.class.findMany({
    where: { cohortId },
    orderBy: { startTime: "desc" },
    include: {
      topic: { select: { id: true, title: true } },
      instructor: { select: { id: true, firstName: true, lastName: true, email: true } },
      _count: { select: { attendance: true } },
    },
  });

  return sendSuccess(res, classes);
});

export const getClass = asyncHandler(async (req, res) => {
  const cls = await prisma.class.findUnique({
    where: { id: req.params.id as string },
    include: {
      topic: { select: { id: true, title: true } },
      instructor: { select: { id: true, firstName: true, lastName: true, email: true } },
      attendance: {
        include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
        orderBy: { markedAt: "asc" },
      },
    },
  });
  if (!cls) throw ApiError.notFound();
  return sendSuccess(res, cls);
});
