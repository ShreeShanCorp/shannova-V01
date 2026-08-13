import { z } from "zod";
import { CohortStatusSchema } from "./enums.js";

export const CohortSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  status: CohortStatusSchema,
  startDate: z.string(),
  endDate: z.string(),
  curriculumId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Cohort = z.infer<typeof CohortSchema>;

export const createCohortSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  status: CohortStatusSchema.optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  curriculumId: z.string().min(1),
});
export type CreateCohortInput = z.infer<typeof createCohortSchema>;

export const updateCohortSchema = createCohortSchema.partial();
export type UpdateCohortInput = z.infer<typeof updateCohortSchema>;
