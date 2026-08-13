import { apiRequest } from "@/lib/api-client";
import type { Curriculum, CurriculumInput, CurriculumTree } from "@/types/api";

export function fetchCurricula(params?: { page?: number; pageSize?: number }) {
  return apiRequest<Curriculum[]>({ method: "GET", url: "/curricula", params });
}

export function fetchCurriculum(id: string) {
  return apiRequest<Curriculum>({ method: "GET", url: `/curricula/${id}` }).then((r) => r.data);
}

export function fetchCurriculumTree(id: string) {
  return apiRequest<CurriculumTree>({ method: "GET", url: `/curricula/${id}/tree` }).then((r) => r.data);
}

export function createCurriculum(input: CurriculumInput) {
  return apiRequest<Curriculum>({ method: "POST", url: "/curricula", data: input }).then((r) => r.data);
}

export function updateCurriculum(id: string, input: Partial<CurriculumInput>) {
  return apiRequest<Curriculum>({ method: "PATCH", url: `/curricula/${id}`, data: input }).then((r) => r.data);
}

export function deleteCurriculum(id: string) {
  return apiRequest<{ id: string }>({ method: "DELETE", url: `/curricula/${id}` }).then((r) => r.data);
}
