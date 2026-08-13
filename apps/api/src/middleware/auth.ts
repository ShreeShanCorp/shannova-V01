import type { NextFunction, Request, Response } from "express";
import { ROLES, type Role } from "@shannova/shared-types";
import { verifyJwtToken } from "../lib/jwt.js";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../lib/response.js";

/** No-op fallback */
export const withClerk = (req: Request, res: Response, next: NextFunction) => {
  next();
};

/**
 * Enhanced attachUser middleware:
 * 1. Checks JWT token in Authorization: Bearer <token>
 * 2. Checks custom x-user-role / x-user-id headers for instant testing
 * 3. Auto provisions user in database if needed
 */
export async function attachUser(req: Request, _res: Response, next: NextFunction) {
  try {
    let userId: string | null = null;
    let userRole: Role | null = null;

    // 1. Check Bearer Token
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const decoded = verifyJwtToken(token);
      if (decoded) {
        userId = decoded.userId;
        userRole = decoded.role as Role;
      }
    }

    // 2. Check Custom Testing Headers
    const requestedRoleHeader = (req.headers["x-user-role"] as string | undefined)?.toUpperCase();
    const requestedUserIdHeader = req.headers["x-user-id"] as string | undefined;

    let user = null;

    if (userId) {
      user = await prisma.user.findUnique({ where: { id: userId } });
    }

    if (!user && requestedUserIdHeader) {
      user = await prisma.user.findUnique({ where: { id: requestedUserIdHeader } });
    }

    if (!user && requestedRoleHeader && (ROLES as readonly string[]).includes(requestedRoleHeader)) {
      user = await prisma.user.findFirst({ where: { role: requestedRoleHeader } });
    }

    if (!user) {
      user = await prisma.user.findFirst({ where: { role: (userRole || requestedRoleHeader || "STUDENT") as string } });
    }

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: `user_${Date.now()}`,
          email: "alex@shannova.com",
          firstName: "Alex",
          lastName: "Rivera",
          role: (userRole || requestedRoleHeader || "STUDENT") as Role,
        },
      });
    }

    req.user = user;
    req.role = user.role as Role;
    next();
  } catch (err) {
    next(err);
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) {
    return next(ApiError.unauthorized());
  }
  next();
}

export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !req.role) {
      return next(ApiError.unauthorized());
    }
    if (!roles.includes(req.role)) {
      return next(ApiError.forbidden(`Requires one of roles: ${roles.join(", ")}`));
    }
    next();
  };
}
