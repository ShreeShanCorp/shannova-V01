import { Worker } from "bullmq";
import { sendPushNotification } from "./fcm.js";
import { prisma } from "./prisma.js";
import { redisConnection } from "./redis.js";
import { cohortRoom, getIo } from "./socket.js";
import { CLASS_REMINDER_QUEUE_NAME, type ClassReminderJobData } from "./class-reminder-queue.js";

/** Runs in the api process (not apps/worker) because it needs direct access to the
 * Socket.io server instance created in server.ts. */
export function startClassReminderWorker() {
  try {
    const worker = new Worker<ClassReminderJobData>(
      CLASS_REMINDER_QUEUE_NAME,
      async (job) => {
        const cls = await prisma.class.findUnique({ where: { id: job.data.classId } });
        if (!cls || cls.status !== "SCHEDULED") return;

        const enrollments = await prisma.enrollment.findMany({
          where: { cohortId: cls.cohortId },
          select: { userId: true },
        });
        const recipientIds = [...new Set([...enrollments.map((e) => e.userId), cls.instructorId])];

        getIo()
          ?.to(cohortRoom(cls.cohortId))
          .emit("class:starting_soon", {
            classId: cls.id,
            title: cls.title,
            startTime: cls.startTime,
            meetingUrl: cls.meetingUrl,
          });

        await sendPushNotification(recipientIds, {
          title: "Class starting soon",
          body: `${cls.title} starts in 5 minutes`,
        });
      },
      { connection: redisConnection },
    );

    worker.on("failed", (job, err) => {
      console.error(`[class-reminder] job ${job?.id} failed:`, err.message);
    });

    worker.on("error", () => {
      // Graceful offline fallback
    });

    return worker;
  } catch (err) {
    console.warn("[class-reminder] Background worker skipped (offline Redis).");
    return null;
  }
}
