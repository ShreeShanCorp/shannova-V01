import { apiRequest } from "@/lib/api-client";
import type { Topic, TopicInput } from "@/types/api";

export function createTopic(input: TopicInput) {
  return apiRequest<Topic>({ method: "POST", url: "/topics", data: input }).then((r) => r.data);
}

export function updateTopic(id: string, input: Partial<TopicInput>) {
  return apiRequest<Topic>({ method: "PATCH", url: `/topics/${id}`, data: input }).then((r) => r.data);
}

export function deleteTopic(id: string) {
  return apiRequest<{ id: string }>({ method: "DELETE", url: `/topics/${id}` }).then((r) => r.data);
}
