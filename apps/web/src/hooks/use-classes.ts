import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClass, fetchClass, fetchClasses, fetchUpcomingClasses } from "@/api/classes";
import type { ScheduleClassInput } from "@/types/api";

export function useUpcomingClasses() {
  return useQuery({
    queryKey: ["classes", "upcoming"],
    queryFn: fetchUpcomingClasses,
    refetchInterval: 60_000,
  });
}

export function useClasses(cohortId: string) {
  return useQuery({
    queryKey: ["classes", "cohort", cohortId],
    queryFn: () => fetchClasses(cohortId),
    enabled: Boolean(cohortId),
  });
}

export function useClass(id: string) {
  return useQuery({
    queryKey: ["classes", id],
    queryFn: () => fetchClass(id),
    enabled: Boolean(id),
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ScheduleClassInput) => createClass(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["classes"] }),
  });
}
