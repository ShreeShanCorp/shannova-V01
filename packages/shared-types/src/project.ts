import { z } from "zod";
import { ProjectStatusSchema } from "./enums.js";

export const ProjectSchema = z.object({
  id: z.string(),
  cohortId: z.string(),
  ownerId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: ProjectStatusSchema,
  repoUrl: z.string().nullable(),
  liveUrl: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const createProjectSchema = z.object({
  cohortId: z.string().min(1),
  ownerId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  status: ProjectStatusSchema.optional(),
  repoUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
});
export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
