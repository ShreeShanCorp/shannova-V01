import axios, { type AxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/types/api";
import { useUiStore } from "@/stores/ui-store";

type TokenGetter = () => Promise<string | null>;
let customTokenGetter: TokenGetter = async () => null;

export function setApiTokenGetter(fn: TokenGetter) {
  customTokenGetter = fn;
}

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4001/api/v1",
});

httpClient.interceptors.request.use(async (config) => {
  // 1. Attach JWT token from localStorage or custom getter
  let token = localStorage.getItem("kickstart_token");
  if (!token) {
    token = await customTokenGetter();
  }
  
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  // 2. Attach active role in headers
  const activeRole = useUiStore.getState().activeRole;
  if (activeRole) {
    config.headers.set("x-user-role", activeRole);
  }

  return config;
});

export class ApiRequestError extends Error {
  code: string;
  status: number;
  details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/** Unwraps the { data, error, meta } envelope and throws ApiRequestError on failure. */
export async function apiRequest<T>(config: AxiosRequestConfig): Promise<{ data: T; meta: ApiResponse<T>["meta"] }> {
  try {
    const res = await httpClient.request<ApiResponse<T>>(config);
    if (res.data.error) {
      throw new ApiRequestError(res.status, res.data.error.code, res.data.error.message, res.data.error.details);
    }
    return { data: res.data.data as T, meta: res.data.meta };
  } catch (err) {
    if (axios.isAxiosError<ApiResponse<T>>(err) && err.response) {
      const body = err.response.data;
      throw new ApiRequestError(
        err.response.status,
        body?.error?.code ?? "UNKNOWN_ERROR",
        body?.error?.message ?? err.message,
        body?.error?.details,
      );
    }
    throw err;
  }
}
