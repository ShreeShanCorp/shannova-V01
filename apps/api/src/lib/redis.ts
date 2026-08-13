import { Redis } from "ioredis";
import { env } from "./env.js";

// BullMQ requires maxRetriesPerRequest: null on connections it manages.
export const redisConnection = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  lazyConnect: true,
  retryStrategy(times) {
    if (times > 2) {
      return null; // Stop trying to reconnect if Redis server is not available
    }
    return Math.min(times * 200, 1000);
  },
});

redisConnection.on("error", (err) => {
  // Silent catch to prevent unhandled error event crash when Redis is offline
  if (process.env.NODE_ENV === "development") {
    // optional debug message
  }
});
