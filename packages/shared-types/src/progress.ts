import { z } from "zod";

export const TopicProgressSchema = z.object({
  id: z.string(),
  userId: z.string(),
  topicId: z.string(),
  completedAt: z.string(),
});
export type TopicProgress = z.infer<typeof TopicProgressSchema>;
