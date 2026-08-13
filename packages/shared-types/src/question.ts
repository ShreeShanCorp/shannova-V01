import { z } from "zod";
import { QuestionTypeSchema } from "./enums.js";

export const QuestionSchema = z.object({
  id: z.string(),
  mockTestId: z.string(),
  type: QuestionTypeSchema,
  prompt: z.string(),
  options: z.array(z.string()).nullable(),
  correctAnswer: z.string().nullable(),
  points: z.number().int(),
  order: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Question = z.infer<typeof QuestionSchema>;

export const createQuestionSchema = z.object({
  mockTestId: z.string().min(1),
  type: QuestionTypeSchema.optional(),
  prompt: z.string().min(1),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().optional(),
  points: z.number().int().positive().optional(),
  order: z.number().int().optional(),
});
export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;

export const updateQuestionSchema = createQuestionSchema.partial();
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;
