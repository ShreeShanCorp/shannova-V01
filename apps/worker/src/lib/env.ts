import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  REDIS_URL: z.string().min(1, "REDIS_URL is required"),
  MEILI_HOST: z.string().default("http://localhost:7700"),
  MEILI_MASTER_KEY: z.string().default("dev_meili_master_key"),
});

export const env = envSchema.parse(process.env);
