import { useUiStore } from "@/stores/ui-store";
import type { Role } from "@/types/api";

const VALID_ROLES: Role[] = ["ADMIN", "INSTRUCTOR", "STUDENT", "INTERVIEWER"];

/**
 * Returns the currently active role.
 * Powered by local role switcher store, making testing and role-switching instant.
 */
export function useRole(): Role {
  const activeRole = useUiStore((s) => s.activeRole);
  return VALID_ROLES.includes(activeRole) ? activeRole : "STUDENT";
}
