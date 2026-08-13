import { apiRequest } from "@/lib/api-client";
import type { Module, ModuleInput } from "@/types/api";

export function createModule(input: ModuleInput) {
  return apiRequest<Module>({ method: "POST", url: "/modules", data: input }).then((r) => r.data);
}

export function updateModule(id: string, input: Partial<ModuleInput>) {
  return apiRequest<Module>({ method: "PATCH", url: `/modules/${id}`, data: input }).then((r) => r.data);
}

export function deleteModule(id: string) {
  return apiRequest<{ id: string }>({ method: "DELETE", url: `/modules/${id}` }).then((r) => r.data);
}
