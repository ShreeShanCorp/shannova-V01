import { createServer } from "node:http";
import { createApp } from "./app.js";
import { env } from "./lib/env.js";
import { startClassReminderWorker } from "./lib/class-reminder-worker.js";
import { initSocket } from "./lib/socket.js";
import { prisma } from "./lib/prisma.js";

const app = createApp();
const httpServer = createServer(app);

initSocket(httpServer);
startClassReminderWorker();

const port = Number(process.env.PORT) || env.PORT || 4001;

httpServer.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Shan Nova API listening on http://0.0.0.0:${port}`);
  console.log(`📑 Swagger Documentation at http://localhost:${port}/api/docs`);
});

// Graceful Shutdown for Cloud Run and Container Orchestration
async function gracefulShutdown(signal: string) {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  
  httpServer.close(async () => {
    console.log("🔌 Closed remaining active HTTP connections.");
    try {
      await prisma.$disconnect();
      console.log("🗄️ Disconnected from PostgreSQL database.");
      process.exit(0);
    } catch (err) {
      console.error("Error during database disconnect:", err);
      process.exit(1);
    }
  });

  // Force close after 10s timeout
  setTimeout(() => {
    console.error("⚠️ Forced shutdown after timeout.");
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
