import { apiRequest } from "@/lib/api-client";
import type { Resource, ResourceInput } from "@/types/api";

export function createResource(input: ResourceInput) {
  return apiRequest<Resource>({ method: "POST", url: "/resources", data: input }).then((r) => r.data);
}

export function updateResource(id: string, input: Partial<ResourceInput>) {
  return apiRequest<Resource>({ method: "PATCH", url: `/resources/${id}`, data: input }).then((r) => r.data);
}

export function deleteResource(id: string) {
  return apiRequest<{ id: string }>({ method: "DELETE", url: `/resources/${id}` }).then((r) => r.data);
}
