import { apiRequest } from "@/lib/api-client";
import type { User } from "@/types/api";

export function fetchCurrentUser() {
  return apiRequest<User>({ method: "GET", url: "/users/me" }).then((r) => r.data);
}

/** ADMIN only. */
export function fetchUsers(params?: { page?: number; pageSize?: number }) {
  return apiRequest<User[]>({ method: "GET", url: "/users", params }).then((r) => r.data);
}
