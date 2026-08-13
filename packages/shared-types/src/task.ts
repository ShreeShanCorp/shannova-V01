import { z } from "zod";
import { TaskTypeSchema } from "./enums.js";

const rubricSchema = z.array(z.object({ criterion: z.string(), points: z.number() })).nullable();

export const TaskSchema = z.object({
  id: z.string(),
  cohortId: z.string(),
  topicId: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  type: TaskTypeSchema,
  points: z.number().int(),
  rubric: rubricSchema,
  dueDate: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Task = z.infer<typeof TaskSchema>;

export const createTaskSchema = z.object({
  cohortId: z.string().min(1),
  topicId: z.string().min(1).optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  type: TaskTypeSchema.optional(),
  points: z.number().int().optional(),
  rubric: z.array(z.object({ criterion: z.string(), points: z.number() })).optional(),
  dueDate: z.coerce.date().optional(),
});
export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = createTaskSchema.partial();
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
