import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { sendSuccess } from "../lib/response.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  let dbStatus = "connected";
  let dbLatencyMs = 0;

  try {
    const start = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    dbLatencyMs = Date.now() - start;
  } catch (error) {
    dbStatus = "disconnected";
  }

  const memoryUsage = process.memoryUsage();

  return sendSuccess(res, {
    status: dbStatus === "connected" ? "healthy" : "degraded",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbStatus,
      latencyMs: dbLatencyMs,
    },
    memory: {
      rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
      heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
    },
  });
});
