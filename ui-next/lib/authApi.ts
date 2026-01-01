export type SignupPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = {
  usernameOrEmail: string;
  password: string;
};

export type ResetPayload = {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
};

export type UserRole = "USER" | "ADMIN";

const TOKEN_KEY = "auth_token";
const DISPLAY_NAME_KEY = "auth_display_name";
const AUTH_ROLE_KEY = "auth_role";
const AUTH_NAME_KEY = "auth_name";

function getBaseUrl() {
  const raw =
    process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ?? "http://localhost:8082";
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function requestJson<TResponse>(
  path: string,
  init: Omit<RequestInit, "body"> & { body?: unknown }
): Promise<TResponse> {
  const url = `${getBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });

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

async function authedRequestJson<TResponse>(
  path: string,
  init: Omit<RequestInit, "body"> & { body?: unknown }
): Promise<TResponse> {
  const token = getToken();
  if (!token) {
    throw new ApiError("Not authenticated", 401);
  }

  const headers = {
    ...(init.headers ?? {}),
    Authorization: `Bearer ${token}`,
  };

  return requestJson<TResponse>(path, { ...init, headers });
}

export async function signup(payload: SignupPayload): Promise<string> {
  const json = await requestJson<{ token: string }>("/api/auth/signup", {
    method: "POST",
    body: payload,
  });
  return json.token;
}

export async function login(payload: LoginPayload): Promise<string> {
  const json = await requestJson<{ token: string }>("/api/auth/login", {
    method: "POST",
    body: payload,
  });
  return json.token;
}

export async function forgot(email: string): Promise<string> {
  const json = await requestJson<{ message: string } | { message?: string }>(
    "/api/auth/forgot",
    {
      method: "POST",
      body: { email },
    }
  );
  return "message" in json && typeof json.message === "string"
    ? json.message
    : "OK";
}

export async function reset(payload: ResetPayload): Promise<string> {
  const json = await requestJson<{ message: string } | { message?: string }>(
    "/api/auth/reset",
    {
      method: "POST",
      body: payload,
    }
  );
  return "message" in json && typeof json.message === "string"
    ? json.message
    : "OK";
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}

export function decodeJwtPayload(token: string): {
  role?: string;
  name?: string;
  uid?: number;
  sub?: string;
  mustChangePassword?: boolean;
} | null {
  if (typeof window === "undefined") return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;

  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");

  try {
    const json = window.atob(padded);
    const parsed = JSON.parse(json) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const record = parsed as Record<string, unknown>;
    const role =
      typeof record["role"] === "string" ? record["role"] : undefined;
    const name =
      typeof record["name"] === "string" ? record["name"] : undefined;
    const uid = typeof record["uid"] === "number" ? record["uid"] : undefined;
    const sub = typeof record["sub"] === "string" ? record["sub"] : undefined;
    const mustChangePassword =
      typeof record["mustChangePassword"] === "boolean"
        ? record["mustChangePassword"]
        : undefined;
    return { role, name, uid, sub, mustChangePassword };
  } catch {
    return null;
  }
}

export function getMustChangePasswordFromToken(token: string): boolean {
  const payload = decodeJwtPayload(token);
  return payload?.mustChangePassword === true;
}

export function getDisplayNameFromToken(token: string): string | null {
  const payload = decodeJwtPayload(token);
  const name = payload?.name;
  return typeof name === "string" ? name : null;
}

export function getRoleFromToken(token: string): UserRole | null {
  const payload = decodeJwtPayload(token);
  const fromString = (value: string): UserRole | null => {
    const normalized = value.trim().toUpperCase();
    if (normalized === "ADMIN" || normalized === "ROLE_ADMIN") return "ADMIN";
    if (normalized === "USER" || normalized === "ROLE_USER") return "USER";
    return null;
  };

  return payload?.role ? fromString(payload.role) : null;
}

export function getRole(): UserRole | null {
  const token = getToken();
  return token ? getRoleFromToken(token) : null;
}

export function isAdminFromToken(token: string): boolean {
  return getRoleFromToken(token) === "ADMIN";
}

export function isAdmin(): boolean {
  const token = getToken();
  return token ? isAdminFromToken(token) : false;
}

export function setAuthMeta(meta: {
  role?: string | null;
  name?: string | null;
}) {
  if (typeof window === "undefined") return;
  const normalizedRole = (meta.role ?? "").trim().toUpperCase();
  const role: UserRole =
    normalizedRole === "ADMIN" || normalizedRole === "ROLE_ADMIN"
      ? "ADMIN"
      : "USER";
  const name =
    typeof meta.name === "string" && meta.name.trim() ? meta.name.trim() : "—";
  window.localStorage.setItem(AUTH_ROLE_KEY, role);
  window.localStorage.setItem(AUTH_NAME_KEY, name);
}

export function getAuthMeta(): { role: UserRole; name: string } {
  if (typeof window === "undefined") return { role: "USER", name: "—" };
  const rawRole = window.localStorage.getItem(AUTH_ROLE_KEY) ?? "";
  const normalizedRole = rawRole.trim().toUpperCase();
  const role: UserRole =
    normalizedRole === "ADMIN" || normalizedRole === "ROLE_ADMIN"
      ? "ADMIN"
      : "USER";
  const rawName = window.localStorage.getItem(AUTH_NAME_KEY);
  const name = typeof rawName === "string" && rawName.trim() ? rawName : "—";
  return { role, name };
}

export function clearAuthMeta() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_ROLE_KEY);
  window.localStorage.removeItem(AUTH_NAME_KEY);
}

export function setDisplayName(name: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DISPLAY_NAME_KEY, name);
}

export function getDisplayName(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(DISPLAY_NAME_KEY);
}

export function clearDisplayName() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DISPLAY_NAME_KEY);
}

export function getAuthHeader(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type UserMe = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  city?: string | null;
  role?: UserRole;
  active?: boolean;
  lastLoginAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  mustChangePassword?: boolean;
};

export type UpdateMePayload = {
  firstName: string;
  lastName: string;
  city?: string | null;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UserStats = {
  totalSimulations: number;
  avgExecutionMs: number;
  successRate: number;
  lastRunAt: string | null;
};

export async function getMe(): Promise<UserMe> {
  return authedRequestJson<UserMe>("/api/me", { method: "GET" });
}

export async function updateMe(payload: UpdateMePayload): Promise<UserMe> {
  return authedRequestJson<UserMe>("/api/me", {
    method: "PUT",
    body: payload,
  });
}

export async function changePassword(
  payload: ChangePasswordPayload
): Promise<{ message: string; token?: string }> {
  return authedRequestJson<{ message: string; token?: string }>(
    "/api/me/password",
    {
      method: "PUT",
      body: payload,
    }
  );
}

export async function deleteMe(payload: {
  confirmText: string;
  password?: string;
}): Promise<{ message: string }> {
  return authedRequestJson<{ message: string }>("/api/me", {
    method: "DELETE",
    body: payload,
  });
}

export type AdminListItem = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: "ADMIN";
  lastSeen: string | null;
  status: "Online" | "Offline";
};

export type CreateAdminPayload = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  temporaryPassword: string;
};

export type UpdateAdminPayload = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

export async function listAdmins(): Promise<AdminListItem[]> {
  return authedRequestJson<AdminListItem[]>("/api/admins", { method: "GET" });
}

export async function createAdmin(
  payload: CreateAdminPayload
): Promise<AdminListItem> {
  return authedRequestJson<AdminListItem>("/api/admins", {
    method: "POST",
    body: payload,
  });
}

export async function updateAdmin(
  id: number,
  payload: UpdateAdminPayload
): Promise<AdminListItem> {
  return authedRequestJson<AdminListItem>(`/api/admins/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteAdmin(id: number): Promise<{ message: string }> {
  return authedRequestJson<{ message: string }>(`/api/admins/${id}`, {
    method: "DELETE",
  });
}

export async function getMyStats(): Promise<UserStats> {
  return authedRequestJson<UserStats>("/api/users/me/stats", { method: "GET" });
}

export async function deleteHistory(): Promise<{ message: string }> {
  return authedRequestJson<{ message: string }>("/api/users/me/history", {
    method: "DELETE",
  });
}
