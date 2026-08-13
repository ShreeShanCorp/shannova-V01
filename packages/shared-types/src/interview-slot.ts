import { z } from "zod";
import { InterviewStatusSchema } from "./enums.js";

export const InterviewSlotSchema = z.object({
  id: z.string(),
  cohortId: z.string(),
  interviewerId: z.string(),
  candidateId: z.string().nullable(),
  status: InterviewStatusSchema,
  scheduledAt: z.string(),
  durationMinutes: z.number().int(),
  meetingUrl: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type InterviewSlot = z.infer<typeof InterviewSlotSchema>;

export const createInterviewSlotSchema = z.object({
  cohortId: z.string().min(1),
  interviewerId: z.string().min(1),
  candidateId: z.string().min(1).optional(),
  scheduledAt: z.coerce.date(),
  durationMinutes: z.number().int().positive().optional(),
  meetingUrl: z.string().url().optional(),
});
export type CreateInterviewSlotInput = z.infer<typeof createInterviewSlotSchema>;

export const updateInterviewSlotSchema = createInterviewSlotSchema.partial().extend({
  status: InterviewStatusSchema.optional(),
});
export type UpdateInterviewSlotInput = z.infer<typeof updateInterviewSlotSchema>;
