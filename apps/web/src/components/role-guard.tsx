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
  const { data: user, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("kickstart_token");
    
    // If not authenticated and no role selected, redirect to sign-in
    if (!token && !role) {
      void navigate({ to: "/sign-in" });
      return;
    }

    // If role is selected but not allowed for this route, redirect to unauthorized
    if (role && !allow.includes(role)) {
      void navigate({ to: "/unauthorized" });
    }
  }, [role, allow, navigate]);

  if (!role || !allow.includes(role)) {
    return null;
  }

  return <Outlet />;
}
