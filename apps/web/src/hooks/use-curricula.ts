import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCurriculum,
  deleteCurriculum,
  fetchCurriculum,
  fetchCurricula,
  fetchCurriculumTree,
  updateCurriculum,
} from "@/api/curricula";
import type { CurriculumInput } from "@/types/api";

export function useCurricula(params?: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ["curricula", params],
    queryFn: () => fetchCurricula(params),
  });
}

export function useCurriculum(id: string) {
  return useQuery({
    queryKey: ["curricula", id],
    queryFn: () => fetchCurriculum(id),
    enabled: Boolean(id),
  });
}

export function useCurriculumTree(id: string) {
  return useQuery({
    queryKey: ["curricula", id, "tree"],
    queryFn: () => fetchCurriculumTree(id),
    enabled: Boolean(id),
  });
}

export function useCreateCurriculum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CurriculumInput) => createCurriculum(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["curricula"] }),
  });
}

export function useUpdateCurriculum(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<CurriculumInput>) => updateCurriculum(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["curricula"] }),
  });
}

export function useDeleteCurriculum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCurriculum(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["curricula"] }),
  });
}
