import type { Job } from "bullmq";

// Mirrors apps/api/src/lib/queue.ts — queue name + payload shape are a contract
// between the producer (api) and this consumer, keep the two in sync.
export const TASK_DUE_REMINDER_QUEUE_NAME = "task-due-reminder";

export interface TaskDueReminderJobData {
  taskId: string;
  title: string;
  dueDate: string;
  studentEmails: string[];
}

/** No email/push channel is wired up yet (that's Prompt 10's job) — this logs a clear,
 * per-recipient line so the reminder pipeline is provably firing on schedule, and is the
 * exact seam Prompt 10 plugs a real Resend/Twilio/FCM call into later. */
export async function processTaskDueReminderJob(job: Job<TaskDueReminderJobData>): Promise<void> {
  const { taskId, title, dueDate, studentEmails } = job.data;

  if (studentEmails.length === 0) {
    console.log(`[task-due-reminder] task ${taskId} ("${title}") due ${dueDate} — no enrolled students`);
    return;
  }

  console.log(
    `[task-due-reminder] task ${taskId} ("${title}") due ${dueDate} — reminding ${studentEmails.length} student(s): ${studentEmails.join(", ")}`,
  );
}
