import { apiRequest } from "@/lib/api-client";
import type { Cohort, Enrollment, EnrollmentInput, User } from "@/types/api";

export function fetchMyEnrollments() {
  return apiRequest<(Enrollment & { cohort: Cohort })[]>({ method: "GET", url: "/enrollments/me" }).then(
    (r) => r.data,
  );
}

export function fetchEnrollments(cohortId?: string) {
  return apiRequest<(Enrollment & { user: User })[]>({
    method: "GET",
    url: "/enrollments",
    params: cohortId ? { cohortId } : undefined,
  }).then((r) => r.data);
}

export function createEnrollment(input: EnrollmentInput) {
  return apiRequest<Enrollment>({ method: "POST", url: "/enrollments", data: input }).then((r) => r.data);
}

export function deleteEnrollment(id: string) {
  return apiRequest<{ id: string }>({ method: "DELETE", url: `/enrollments/${id}` }).then((r) => r.data);
}
