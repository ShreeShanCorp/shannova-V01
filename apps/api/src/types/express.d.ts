import type { User } from "@prisma/client";
import type { Role } from "@shannova/shared-types";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      role?: Role;
    }
  }
}

export {};
