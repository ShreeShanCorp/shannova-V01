import { Queue } from "bullmq";
import { redisConnection } from "./redis.js";

export const CLASS_REMINDER_QUEUE_NAME = "class-reminder";
const REMINDER_LEAD_MS = 5 * 60 * 1000;

export interface ClassReminderJobData {
  classId: string;
}

export const classReminderQueue = new Queue<ClassReminderJobData>(CLASS_REMINDER_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: 200,
    removeOnFail: 500,
  },
});

/** Schedules the "starting soon" reminder for 5 minutes before startTime. No-ops if that
 * moment has already passed (e.g. a class created less than 5 minutes out). */
export async function scheduleClassReminder(classId: string, startTime: Date) {
  const delay = startTime.getTime() - Date.now() - REMINDER_LEAD_MS;
  if (delay <= 0) return;

  await classReminderQueue.add(
    "remind",
    { classId },
    { jobId: `class-reminder:${classId}`, delay },
  );
}

export async function cancelClassReminder(classId: string) {
  const job = await classReminderQueue.getJob(`class-reminder:${classId}`);
  if (job) await job.remove();
}
