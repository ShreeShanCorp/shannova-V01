import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCohort,
  deleteCohort,
  fetchCohort,
  fetchCohortCurriculum,
  fetchCohorts,
  updateCohort,
} from "@/api/cohorts";
import type { CohortInput } from "@/types/api";

export function useCohorts(params?: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ["cohorts", params],
    queryFn: () => fetchCohorts(params),
  });
}

export function useCohort(id: string) {
  return useQuery({
    queryKey: ["cohorts", id],
    queryFn: () => fetchCohort(id),
    enabled: Boolean(id),
  });
}

export function useCohortCurriculum(cohortId: string) {
  return useQuery({
    queryKey: ["cohorts", cohortId, "curriculum"],
    queryFn: () => fetchCohortCurriculum(cohortId),
    enabled: Boolean(cohortId),
  });
}

export function useCreateCohort() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CohortInput) => createCohort(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cohorts"] }),
  });
}

export function useUpdateCohort(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<CohortInput>) => updateCohort(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cohorts"] }),
  });
}

export function useDeleteCohort() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCohort(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cohorts"] }),
  });
}
