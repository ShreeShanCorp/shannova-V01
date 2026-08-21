import { Worker } from "bullmq";
import { env } from "./lib/env.js";
import { ensureResourcesIndex } from "./lib/meilisearch.js";
import { redisConnection } from "./lib/redis.js";
import { MEILI_SYNC_QUEUE_NAME, processMeiliSyncJob } from "./jobs/meili-sync.js";
import { TASK_DUE_REMINDER_QUEUE_NAME, processTaskDueReminderJob } from "./jobs/task-due-reminder.js";

await ensureResourcesIndex();

const meiliWorker = new Worker(MEILI_SYNC_QUEUE_NAME, processMeiliSyncJob, {
  connection: redisConnection,
  concurrency: 5,
});

meiliWorker.on("completed", (job) => {
  console.log(`[meili-sync] completed job ${job.id}`);
});

meiliWorker.on("failed", (job, err) => {
  console.error(`[meili-sync] job ${job?.id} failed:`, err.message);
});

const taskReminderWorker = new Worker(TASK_DUE_REMINDER_QUEUE_NAME, processTaskDueReminderJob, {
  connection: redisConnection,
  concurrency: 5,
});

taskReminderWorker.on("completed", (job) => {
  console.log(`[task-due-reminder] completed job ${job.id}`);
});

taskReminderWorker.on("failed", (job, err) => {
  console.error(`[task-due-reminder] job ${job?.id} failed:`, err.message);
});

console.log(
  `worker listening for "${MEILI_SYNC_QUEUE_NAME}" and "${TASK_DUE_REMINDER_QUEUE_NAME}" jobs (env: ${env.NODE_ENV})`,
);

async function shutdown() {
  console.log("worker shutting down...");
  await Promise.all([meiliWorker.close(), taskReminderWorker.close()]);
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Cloud Run Job mode: a scheduler triggers this job periodically, so it drains
// whatever's queued for a bounded window and exits, rather than listening forever
// like the always-on docker-compose deployment.
if (env.WORKER_ONESHOT) {
  setTimeout(shutdown, env.WORKER_RUN_DURATION_MS);
}
