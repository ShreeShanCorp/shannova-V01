import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4001),
  DATABASE_URL: z.string().default("file:./dev.db"),
  JWT_SECRET: z.string().default("b8E5$@kP2#fH7zV0qWm9L^xYt3G&nJ44"),
  EMAIL_USER: z.string().default("smartmasjidotpservice@gmail.com"),
  EMAIL_PASS: z.string().default("fyju ahvn tbnt ueqx"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  MEILI_HOST: z.string().default("http://localhost:7700"),
  MEILI_MASTER_KEY: z.string().default("dev_meili_master_key"),
  CLERK_SECRET_KEY: z.string().optional(),
  CLERK_PUBLISHABLE_KEY: z.string().optional(),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
});

export const env = envSchema.parse(process.env);
