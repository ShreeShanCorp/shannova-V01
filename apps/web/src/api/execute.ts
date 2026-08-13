import { apiRequest } from "@/lib/api-client";
import type { ExecuteCodeResponse } from "@/types/api";

export function runCode(input: { source_code: string; language_id: number; stdin?: string }) {
  return apiRequest<ExecuteCodeResponse>({ method: "POST", url: "/execute", data: input }).then((r) => r.data);
}
