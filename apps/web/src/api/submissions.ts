import { apiRequest } from "@/lib/api-client";
import type { Submission, SubmissionInput, UpdateSubmissionInput, User } from "@/types/api";

export type SubmissionWithUser = Submission & { user: Pick<User, "id" | "firstName" | "lastName" | "email"> };

export function fetchSubmissionsForTask(taskId: string) {
  return apiRequest<SubmissionWithUser[]>({ method: "GET", url: "/submissions", params: { taskId } }).then(
    (r) => r.data,
  );
}

export function fetchMyAllSubmissions() {
  return apiRequest<Submission[]>({ method: "GET", url: "/submissions/mine" }).then(
    (r) => r.data,
  );
}

export function fetchMySubmission(taskId: string) {
  return apiRequest<Submission | null>({ method: "GET", url: "/submissions/me", params: { taskId } }).then(
    (r) => r.data,
  );
}

export function createSubmission(input: SubmissionInput) {
  return apiRequest<Submission>({ method: "POST", url: "/submissions", data: input }).then((r) => r.data);
}

export function updateSubmission(id: string, input: UpdateSubmissionInput) {
  return apiRequest<Submission>({ method: "PATCH", url: `/submissions/${id}`, data: input }).then((r) => r.data);
}

export function saveDraft(taskId: string, content: string) {
  return apiRequest<Submission>({ method: "PATCH", url: "/submissions/draft", data: { taskId, content } }).then(
    (r) => r.data,
  );
}
