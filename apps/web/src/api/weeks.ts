import { apiRequest } from "@/lib/api-client";
import type { Week, WeekInput } from "@/types/api";

export function createWeek(input: WeekInput) {
  return apiRequest<Week>({ method: "POST", url: "/weeks", data: input }).then((r) => r.data);
}

export function updateWeek(id: string, input: Partial<WeekInput>) {
  return apiRequest<Week>({ method: "PATCH", url: `/weeks/${id}`, data: input }).then((r) => r.data);
}

export function deleteWeek(id: string) {
  return apiRequest<{ id: string }>({ method: "DELETE", url: `/weeks/${id}` }).then((r) => r.data);
}
