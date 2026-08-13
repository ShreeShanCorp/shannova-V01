import { z } from "zod";
import { EnrollmentRoleSchema } from "./enums.js";

export const EnrollmentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  cohortId: z.string(),
  role: EnrollmentRoleSchema,
  createdAt: z.string(),
});
export type Enrollment = z.infer<typeof EnrollmentSchema>;

export const createEnrollmentSchema = z.object({
  userId: z.string().min(1),
  cohortId: z.string().min(1),
  role: EnrollmentRoleSchema.optional(),
});
export type CreateEnrollmentInput = z.infer<typeof createEnrollmentSchema>;
