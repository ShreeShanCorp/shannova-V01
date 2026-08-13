import { apiRequest } from "@/lib/api-client";
import type { ApiMeta, Cohort, CohortInput, CurriculumTree } from "@/types/api";

export function fetchCohorts(params?: { page?: number; pageSize?: number }) {
  return apiRequest<Cohort[]>({ method: "GET", url: "/cohorts", params });
}

export function fetchCohort(id: string) {
  return apiRequest<Cohort>({ method: "GET", url: `/cohorts/${id}` }).then((r) => r.data);
}

export function fetchCohortCurriculum(id: string) {
  return apiRequest<CurriculumTree>({ method: "GET", url: `/cohorts/${id}/curriculum` }).then((r) => r.data);
}

export function createCohort(input: CohortInput) {
  return apiRequest<Cohort>({ method: "POST", url: "/cohorts", data: input }).then((r) => r.data);
}

export function updateCohort(id: string, input: Partial<CohortInput>) {
  return apiRequest<Cohort>({ method: "PATCH", url: `/cohorts/${id}`, data: input }).then((r) => r.data);
}

export function deleteCohort(id: string) {
  return apiRequest<{ id: string }>({ method: "DELETE", url: `/cohorts/${id}` }).then((r) => r.data);
}

export type CohortListResult = { items: Cohort[]; meta: ApiMeta | null };
