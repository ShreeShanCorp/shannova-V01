import { z } from "zod";
import { ClassStatusSchema } from "./enums.js";

export const ClassSchema = z.object({
  id: z.string(),
  cohortId: z.string(),
  instructorId: z.string(),
  topicId: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  status: ClassStatusSchema,
  startTime: z.string(),
  endTime: z.string(),
  meetingUrl: z.string().nullable(),
  calendarEventId: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Class = z.infer<typeof ClassSchema>;

/** Client-facing payload for scheduling a class. meetingUrl is never accepted from the
 * client — the server derives it from the Google Calendar service (or leaves it null). */
export const scheduleClassSchema = z.object({
  cohortId: z.string().min(1),
  instructorId: z.string().min(1).optional(),
  topicId: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  meetingUrl: z.string().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
});
export type ScheduleClassInput = z.infer<typeof scheduleClassSchema>;

export const updateClassSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  topicId: z.string().optional(),
  status: ClassStatusSchema.optional(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date().optional(),
});
export type UpdateClassInput = z.infer<typeof updateClassSchema>;
