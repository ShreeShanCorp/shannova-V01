import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useRole } from "@/hooks/use-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import type { Role } from "@/types/api";

/**
 * Route & Auth Guard:
 * 1. Requires an active authentication token or role session (redirects to /sign-in otherwise)
 * 2. Enforces allowed role permissions (redirects to /unauthorized if role does not match)
 */
export function RoleGuard({ allow }: { allow: Role[] }) {
  const role = useRole();
  const navigate = useNavigate();

  const token = typeof window !== "undefined"
    ? (localStorage.getItem("shannova_token") || localStorage.getItem("kickstart_token"))
    : null;

  useEffect(() => {
    // 1. Strictly require authentication token
    if (!token) {
      void navigate({ to: "/sign-in" });
      return;
    }

    // 2. Enforce role permissions
    if (role && !allow.includes(role)) {
      void navigate({ to: "/unauthorized" });
    }
  }, [token, role, allow, navigate]);

  if (!token) {
    return null;
  }

  if (!role || !allow.includes(role)) {
    return null;
  }

  return <Outlet />;
}
