import { z } from "zod";

export const WeekSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  title: z.string(),
  order: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Week = z.infer<typeof WeekSchema>;

export const createWeekSchema = z.object({
  moduleId: z.string().min(1),
  title: z.string().min(1),
  order: z.number().int().optional(),
});
export type CreateWeekInput = z.infer<typeof createWeekSchema>;

export const updateWeekSchema = createWeekSchema.partial();
export type UpdateWeekInput = z.infer<typeof updateWeekSchema>;
