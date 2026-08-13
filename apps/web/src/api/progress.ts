import { apiRequest } from "@/lib/api-client";
import type { TopicProgress } from "@/types/api";

export function fetchMyProgress(curriculumId?: string) {
  return apiRequest<Pick<TopicProgress, "topicId" | "completedAt">[]>({
    method: "GET",
    url: "/progress",
    params: curriculumId ? { curriculumId } : undefined,
  }).then((r) => r.data);
}

export function markTopicComplete(topicId: string) {
  return apiRequest<TopicProgress>({ method: "POST", url: `/progress/${topicId}` }).then((r) => r.data);
}

export function markTopicIncomplete(topicId: string) {
  return apiRequest<{ topicId: string }>({ method: "DELETE", url: `/progress/${topicId}` }).then((r) => r.data);
}
