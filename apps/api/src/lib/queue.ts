import { Queue } from "bullmq";
import type { Resource } from "@shannova/shared-types";
import { redisConnection } from "./redis.js";

// Job/queue names + payload shape are a contract shared with apps/worker — keep them in sync.
export const QUEUE_NAMES = {
  MEILI_SYNC: "meili-sync",
  TASK_DUE_REMINDER: "task-due-reminder",
} as const;

interface MeiliUpsertJobData {
  index: "resources";
  action: "upsert";
  document: Pick<Resource, "id" | "title" | "type" | "url" | "content" | "topicId">;
}

interface MeiliDeleteJobData {
  index: "resources";
  action: "delete";
  documentId: string;
}

export type MeiliSyncJobData = MeiliUpsertJobData | MeiliDeleteJobData;

export const meiliSyncQueue = new Queue<MeiliSyncJobData>(QUEUE_NAMES.MEILI_SYNC, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: 500,
    removeOnFail: 1000,
  },
});

export interface TaskDueReminderJobData {
  taskId: string;
  title: string;
  dueDate: string;
  studentEmails: string[];
}

export const taskDueReminderQueue = new Queue<TaskDueReminderJobData>(QUEUE_NAMES.TASK_DUE_REMINDER, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: 200,
    removeOnFail: 500,
  },
});

const REMINDER_LEAD_MS = 24 * 60 * 60 * 1000;

/** Schedules the "due tomorrow" reminder for 24h before dueDate. No-ops if that moment
 * has already passed (e.g. a task created with less than 24h until its due date). The
 * student list is snapshotted at enqueue time — enrollment changes in the following 24h
 * won't retroactively add/remove recipients, which is an acceptable tradeoff here. */
export async function scheduleTaskDueReminder(input: {
  taskId: string;
  title: string;
  dueDate: Date | string;
  studentEmails: string[];
}) {
  const dueDate = new Date(input.dueDate);
  const delay = dueDate.getTime() - Date.now() - REMINDER_LEAD_MS;
  if (delay <= 0) return;

  await taskDueReminderQueue.add(
    "remind",
    { ...input, dueDate: dueDate.toISOString() },
    { jobId: `task-due-reminder:${input.taskId}`, delay },
  );
}
