import { z } from "zod";
import { SubmissionStatusSchema } from "./enums.js";

export const SubmissionSchema = z.object({
  id: z.string(),
  taskId: z.string(),
  userId: z.string(),
  status: SubmissionStatusSchema,
  content: z.string().nullable(),
  fileUrl: z.string().nullable(),
  grade: z.number().int().nullable(),
  feedback: z.string().nullable(),
  submittedAt: z.string().nullable(),
  gradedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Submission = z.infer<typeof SubmissionSchema>;

export const createSubmissionSchema = z.object({
  taskId: z.string().min(1),
  content: z.string().optional(),
  fileUrl: z.string().url().optional(),
});
export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>;

export const updateSubmissionSchema = z.object({
  status: SubmissionStatusSchema.optional(),
  content: z.string().optional(),
  fileUrl: z.string().url().optional(),
  grade: z.number().int().min(0).optional(),
  feedback: z.string().optional(),
});
export type UpdateSubmissionInput = z.infer<typeof updateSubmissionSchema>;
