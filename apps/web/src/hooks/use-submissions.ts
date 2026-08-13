import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubmission,
  fetchMyAllSubmissions,
  fetchMySubmission,
  fetchSubmissionsForTask,
  saveDraft,
  updateSubmission,
} from "@/api/submissions";
import type { SubmissionInput, UpdateSubmissionInput } from "@/types/api";

export function useSubmissionsForTask(taskId: string) {
  return useQuery({
    queryKey: ["submissions", "task", taskId],
    queryFn: () => fetchSubmissionsForTask(taskId),
    enabled: Boolean(taskId),
  });
}

export function useMySubmissions() {
  return useQuery({
    queryKey: ["submissions", "me", "all"],
    queryFn: () => fetchMyAllSubmissions(),
  });
}

export function useMySubmission(taskId: string) {
  return useQuery({
    queryKey: ["submissions", "me", taskId],
    queryFn: () => fetchMySubmission(taskId),
    enabled: Boolean(taskId),
  });
}

export function useCreateSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: SubmissionInput) => createSubmission(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["submissions"] }),
  });
}

export function useUpdateSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateSubmissionInput }) => updateSubmission(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["submissions"] }),
  });
}

/** Deliberately doesn't invalidate the submissions query cache — this fires every 30s
 * while typing and shouldn't trigger a visible refetch/flicker each time. */
export function useSaveDraft() {
  return useMutation({
    mutationFn: ({ taskId, content }: { taskId: string; content: string }) => saveDraft(taskId, content),
  });
}
