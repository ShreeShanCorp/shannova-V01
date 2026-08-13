import { z } from "zod";

export const ModuleSchema = z.object({
  id: z.string(),
  curriculumId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  order: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Module = z.infer<typeof ModuleSchema>;

export const createModuleSchema = z.object({
  curriculumId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  order: z.number().int().optional(),
});
export type CreateModuleInput = z.infer<typeof createModuleSchema>;

export const updateModuleSchema = createModuleSchema.partial();
export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;
