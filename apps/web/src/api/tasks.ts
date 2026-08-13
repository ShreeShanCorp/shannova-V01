import { apiRequest } from "@/lib/api-client";
import type { Task, TaskInput } from "@/types/api";

export type TaskWithTopic = Task & { topic: { id: string; title: string } | null };

export function fetchTasks(cohortId: string) {
  return apiRequest<TaskWithTopic[]>({ method: "GET", url: "/tasks", params: { cohortId } });
}

export function fetchTask(id: string) {
  return apiRequest<TaskWithTopic>({ method: "GET", url: `/tasks/${id}` }).then((r) => r.data);
}

export function createTask(input: TaskInput) {
  return apiRequest<Task>({ method: "POST", url: "/tasks", data: input }).then((r) => r.data);
}

export function updateTask(id: string, input: Partial<TaskInput>) {
  return apiRequest<Task>({ method: "PATCH", url: `/tasks/${id}`, data: input }).then((r) => r.data);
}

export function deleteTask(id: string) {
  return apiRequest<{ id: string }>({ method: "DELETE", url: `/tasks/${id}` }).then((r) => r.data);
}
