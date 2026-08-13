import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { healthRouter } from "./health.js";
import { authRouter } from "./auth.js";
import { usersRouter } from "./users.js";
import { cohortsRouter } from "./cohorts.js";
import { curriculaRouter } from "./curricula.js";
import { modulesRouter } from "./modules.js";
import { weeksRouter } from "./weeks.js";
import { topicsRouter } from "./topics.js";
import { resourcesRouter } from "./resources.js";
import { progressRouter } from "./progress.js";
import { uploadsRouter } from "./uploads.js";
import { enrollmentsRouter } from "./enrollments.js";
import { classesRouter } from "./classes.js";
import { attendanceRouter } from "./attendance.js";
import { webhooksRouter } from "./webhooks.js";
import { tasksRouter } from "./tasks.js";
import { submissionsRouter } from "./submissions.js";
import { executeRouter } from "./execute.js";

export const v1Router = Router();

// Public routes: health, auth, code execution sandbox, webhooks
v1Router.use("/health", healthRouter);
v1Router.use("/auth", authRouter);
v1Router.use("/execute", executeRouter);
v1Router.use("/webhooks", webhooksRouter);

// Protected routes (uses JWT token or active local session)
v1Router.use(requireAuth);
v1Router.use("/users", usersRouter);
v1Router.use("/cohorts", cohortsRouter);
v1Router.use("/curricula", curriculaRouter);
v1Router.use("/modules", modulesRouter);
v1Router.use("/weeks", weeksRouter);
v1Router.use("/topics", topicsRouter);
v1Router.use("/resources", resourcesRouter);
v1Router.use("/progress", progressRouter);
v1Router.use("/uploads", uploadsRouter);
v1Router.use("/enrollments", enrollmentsRouter);
v1Router.use("/classes", classesRouter);
v1Router.use("/attendance", attendanceRouter);
v1Router.use("/tasks", tasksRouter);
v1Router.use("/submissions", submissionsRouter);
