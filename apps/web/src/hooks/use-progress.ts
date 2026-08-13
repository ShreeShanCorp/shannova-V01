import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMyProgress, markTopicComplete, markTopicIncomplete } from "@/api/progress";

export function useMyProgress(curriculumId?: string) {
  return useQuery({
    queryKey: ["progress", curriculumId ?? "all"],
    queryFn: () => fetchMyProgress(curriculumId),
  });
}

export function useSetTopicProgress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ topicId, completed }: { topicId: string; completed: boolean }) =>
      completed ? markTopicComplete(topicId) : markTopicIncomplete(topicId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["progress"] }),
  });
}
