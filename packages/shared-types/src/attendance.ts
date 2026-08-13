import { z } from "zod";
import { AttendanceStatusSchema } from "./enums.js";

export const AttendanceSchema = z.object({
  id: z.string(),
  classId: z.string(),
  userId: z.string(),
  status: AttendanceStatusSchema,
  markedAt: z.string(),
});
export type Attendance = z.infer<typeof AttendanceSchema>;

export const createAttendanceSchema = z.object({
  classId: z.string().min(1),
  userId: z.string().min(1),
  status: AttendanceStatusSchema.optional(),
});
export type CreateAttendanceInput = z.infer<typeof createAttendanceSchema>;

export const updateAttendanceSchema = z.object({
  status: AttendanceStatusSchema,
});
export type UpdateAttendanceInput = z.infer<typeof updateAttendanceSchema>;
