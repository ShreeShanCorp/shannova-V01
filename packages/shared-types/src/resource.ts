import { z } from "zod";
import { ResourceTypeSchema } from "./enums.js";

export const ResourceSchema = z.object({
  id: z.string(),
  topicId: z.string(),
  title: z.string(),
  type: ResourceTypeSchema,
  url: z.string().nullable(),
  content: z.string().nullable(),
  order: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Resource = z.infer<typeof ResourceSchema>;

export const createResourceSchema = z.object({
  topicId: z.string().min(1),
  title: z.string().min(1),
  type: ResourceTypeSchema.optional(),
  url: z.string().url().optional(),
  content: z.string().optional(),
  order: z.number().int().optional(),
});
export type CreateResourceInput = z.infer<typeof createResourceSchema>;

export const updateResourceSchema = createResourceSchema.partial();
export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
