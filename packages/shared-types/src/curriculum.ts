import { z } from "zod";
import type { Module } from "./module.js";
import type { Resource } from "./resource.js";
import type { Topic } from "./topic.js";
import type { Week } from "./week.js";

export const CurriculumSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  version: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Curriculum = z.infer<typeof CurriculumSchema>;

export const createCurriculumSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  version: z.string().optional(),
});
export type CreateCurriculumInput = z.infer<typeof createCurriculumSchema>;

export const updateCurriculumSchema = createCurriculumSchema.partial();
export type UpdateCurriculumInput = z.infer<typeof updateCurriculumSchema>;

export type TopicWithResources = Topic & { resources: Resource[] };
export type WeekWithTopics = Week & { topics: TopicWithResources[] };
export type ModuleWithWeeks = Module & { weeks: WeekWithTopics[] };
export type CurriculumTree = Curriculum & { modules: ModuleWithWeeks[] };
