import { z } from "zod";

export const TopicSchema = z.object({
  id: z.string(),
  weekId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  order: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Topic = z.infer<typeof TopicSchema>;

export const createTopicSchema = z.object({
  weekId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  order: z.number().int().optional(),
});
export type CreateTopicInput = z.infer<typeof createTopicSchema>;

export const updateTopicSchema = createTopicSchema.partial();
export type UpdateTopicInput = z.infer<typeof updateTopicSchema>;
