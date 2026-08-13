import { z } from "zod";
import { ChatThreadTypeSchema } from "./enums.js";

export const ChatThreadSchema = z.object({
  id: z.string(),
  cohortId: z.string().nullable(),
  type: ChatThreadTypeSchema,
  title: z.string().nullable(),
  participantIds: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ChatThread = z.infer<typeof ChatThreadSchema>;

export const createChatThreadSchema = z.object({
  cohortId: z.string().min(1).optional(),
  type: ChatThreadTypeSchema.optional(),
  title: z.string().optional(),
  participantIds: z.array(z.string().min(1)).min(1),
});
export type CreateChatThreadInput = z.infer<typeof createChatThreadSchema>;

export const MessageSchema = z.object({
  id: z.string(),
  threadId: z.string(),
  senderId: z.string(),
  content: z.string(),
  createdAt: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

export const createMessageSchema = z.object({
  threadId: z.string().min(1),
  content: z.string().min(1),
});
export type CreateMessageInput = z.infer<typeof createMessageSchema>;
