import { apiRequest } from "@/lib/api-client";
import type { Class, ScheduleClassInput, User } from "@/types/api";

export type ClassWithRelations = Class & {
  topic: { id: string; title: string } | null;
  instructor: Pick<User, "id" | "firstName" | "lastName" | "email">;
};

export function fetchUpcomingClasses() {
  return apiRequest<ClassWithRelations[]>({ method: "GET", url: "/classes/upcoming" }).then((r) => r.data);
}

export function fetchClasses(cohortId: string) {
  return apiRequest<ClassWithRelations[]>({ method: "GET", url: "/classes", params: { cohortId } }).then(
    (r) => r.data,
  );
}

export function fetchClass(id: string) {
  return apiRequest<
    ClassWithRelations & {
      attendance: { id: string; userId: string; status: string; user: Pick<User, "id" | "firstName" | "lastName" | "email"> }[];
    }
  >({ method: "GET", url: `/classes/${id}` }).then((r) => r.data);
}

export function createClass(input: ScheduleClassInput) {
  return apiRequest<Class>({ method: "POST", url: "/classes", data: input }).then((r) => r.data);
}
