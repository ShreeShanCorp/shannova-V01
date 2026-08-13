import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEnrollment, deleteEnrollment, fetchEnrollments, fetchMyEnrollments } from "@/api/enrollments";
import type { EnrollmentInput } from "@/types/api";

export function useMyEnrollments() {
  return useQuery({
    queryKey: ["enrollments", "me"],
    queryFn: fetchMyEnrollments,
  });
}

export function useEnrollments(cohortId?: string) {
  return useQuery({
    queryKey: ["enrollments", cohortId ?? "all"],
    queryFn: () => fetchEnrollments(cohortId),
    enabled: Boolean(cohortId),
  });
}

export function useCreateEnrollment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: EnrollmentInput) => createEnrollment(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["enrollments"] }),
  });
}

export function useDeleteEnrollment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEnrollment(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["enrollments"] }),
  });
}
