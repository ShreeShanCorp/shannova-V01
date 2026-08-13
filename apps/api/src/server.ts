import { createServer } from "node:http";
import { createApp } from "./app.js";
import { env } from "./lib/env.js";
import { startClassReminderWorker } from "./lib/class-reminder-worker.js";
import { initSocket } from "./lib/socket.js";

const app = createApp();
const httpServer = createServer(app);

initSocket(httpServer);
startClassReminderWorker();

httpServer.listen(env.PORT, () => {
  console.log(`api listening on http://localhost:${env.PORT}`);
  console.log(`swagger docs at http://localhost:${env.PORT}/api/docs`);
});
