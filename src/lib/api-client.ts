import { getApiBaseUrl } from "./api-url";

/**
 * Error thrown when the API responds with a non-2xx status. Carries the HTTP
 * status so callers (and React Query) can branch on it — e.g. skip retries on
 * 4xx.
 */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Thin `fetch` wrapper for the SIBITA backend.
 *
 * - Prefixes the resolved API base URL.
 * - Sends the better-auth session cookie (`credentials: "include"`).
 * - Serialises/parses JSON and surfaces backend error messages as `ApiError`.
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    credentials: "include",
    ...options,
    headers,
  });

  if (!res.ok) {
    let message = `Permintaan gagal (${res.status}).`;
    try {
      const body = await res.json();
      message = body?.message || body?.error?.message || message;
    } catch {
      // Response body was empty or not JSON — keep the default message.
    }
    throw new ApiError(message, res.status);
  }

  // 204 No Content (and other empty bodies) have nothing to parse.
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export interface UploadResponse {
  success: boolean;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

/**
 * Uploads a file binary to the SIBITA VPS storage.
 * Requests use multipart/form-data.
 */
export async function apiUpload(file: File, category?: string): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  if (category) {
    formData.append("category", category);
  }

  const url = category 
    ? `${getApiBaseUrl()}/api/upload?category=${encodeURIComponent(category)}`
    : `${getApiBaseUrl()}/api/upload`;

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: formData,
    // Do NOT set Headers ("Content-Type") so the browser auto-generates the boundary.
  });

  if (!res.ok) {
    let message = `Unggah berkas gagal (${res.status}).`;
    try {
      const body = await res.json();
      message = body?.error || body?.message || message;
    } catch {
      // Keep default message
    }
    throw new ApiError(message, res.status);
  }

  return res.json() as Promise<UploadResponse>;
}

