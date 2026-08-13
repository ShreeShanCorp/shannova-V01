import type { Server as HttpServer } from "node:http";
import { verifyToken } from "@clerk/backend";
import { Server } from "socket.io";
import type { Role } from "@shannova/shared-types";
import { env } from "./env.js";
import { prisma } from "./prisma.js";

let ioInstance: Server | null = null;

/** Set once initSocket() runs in server.ts; used by background jobs (e.g. class reminders)
 * that need to emit but don't have direct access to the http server's io instance. */
export function getIo(): Server | null {
  return ioInstance;
}

export function cohortRoom(cohortId: string): string {
  return `cohort:${cohortId}`;
}

export function initSocket(httpServer: HttpServer): Server {
  const io = new Server(httpServer, {
    cors: { origin: env.CORS_ORIGIN, credentials: true },
  });
  ioInstance = io;

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token as string | undefined;
      if (!token) return next(new Error("Unauthorized: missing token"));

      const { sub: clerkId } = await verifyToken(token, { secretKey: env.CLERK_SECRET_KEY });
      const user = await prisma.user.findUnique({ where: { clerkId } });
      if (!user) return next(new Error("Unauthorized: unknown user"));

      socket.data.userId = user.id;
      socket.data.role = user.role;
      next();
    } catch {
      next(new Error("Unauthorized: invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const role = socket.data.role as Role;
    const userId = socket.data.userId as string;
    // Role-scoped rooms let the API broadcast to e.g. all instructors without a fan-out query.
    socket.join(`user:${userId}`);
    socket.join(`role:${role}`);

    void prisma.enrollment
      .findMany({ where: { userId }, select: { cohortId: true } })
      .then((enrollments) => {
        for (const e of enrollments) socket.join(cohortRoom(e.cohortId));
      });

    socket.on("disconnect", () => {
      socket.leave(`role:${role}`);
    });
  });

  return io;
}
