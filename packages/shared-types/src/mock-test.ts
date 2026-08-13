import { z } from "zod";

export const MockTestSchema = z.object({
  id: z.string(),
  cohortId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  durationMinutes: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type MockTest = z.infer<typeof MockTestSchema>;

export const createMockTestSchema = z.object({
  cohortId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  durationMinutes: z.number().int().positive().optional(),
});
export type CreateMockTestInput = z.infer<typeof createMockTestSchema>;

export const updateMockTestSchema = createMockTestSchema.partial();
export type UpdateMockTestInput = z.infer<typeof updateMockTestSchema>;
