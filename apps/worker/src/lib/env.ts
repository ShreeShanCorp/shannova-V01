import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  REDIS_URL: z.string().min(1, "REDIS_URL is required"),
  MEILI_HOST: z.string().default("http://localhost:7700"),
  MEILI_MASTER_KEY: z.string().default("dev_meili_master_key"),
  // Drives the Cloud Run Job deployment: when true, the process drains queued
  // jobs for WORKER_RUN_DURATION_MS then exits, instead of listening forever.
  WORKER_ONESHOT: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
  WORKER_RUN_DURATION_MS: z.coerce.number().int().positive().default(55_000),
});

export const env = envSchema.parse(process.env);
