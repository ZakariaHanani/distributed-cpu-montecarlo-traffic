export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function getBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_AUTH_BASE_URL ?? "http://localhost:8081";
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

function clearAuthStorage() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("auth_token");
  window.localStorage.removeItem("auth_display_name");
  window.localStorage.removeItem("auth_role");
  window.localStorage.removeItem("auth_name");
  window.dispatchEvent(new Event("auth:changed"));
}

export async function apiFetchJson<TResponse>(
  path: string,
  init: Omit<RequestInit, "body"> & {
    body?: unknown;
    auth?: boolean;
    onUnauthorized?: () => void;
  }
): Promise<TResponse> {
  const url = `${getBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const token =
    init.auth && typeof window !== "undefined"
      ? window.localStorage.getItem("auth_token")
      : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };

  if (init.auth) {
    if (!token) {
      clearAuthStorage();
      init.onUnauthorized?.();
      throw new ApiError("Not authenticated", 401);
    }
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...init,
    headers,
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });

  if (res.status === 401) {
    clearAuthStorage();
    init.onUnauthorized?.();
  }

  if (!res.ok) {
    const contentType = res.headers.get("content-type") ?? "";
    const json = contentType.includes("application/json")
      ? ((await res.json().catch(() => null)) as {
          error?: string;
          message?: string;
        } | null)
      : null;
    const text = json ? null : await res.text().catch(() => null);
    const message =
      (json?.error && typeof json.error === "string" && json.error) ||
      (json?.message && typeof json.message === "string" && json.message) ||
      (text && text.trim()) ||
      "Request failed";
    throw new ApiError(message, res.status);
  }

  return (await res.json()) as TResponse;
}

