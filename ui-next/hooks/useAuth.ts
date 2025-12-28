"use client";

import { useEffect, useState } from "react";
import {
  getAuthMeta,
  getDisplayName,
  getDisplayNameFromToken,
  getRoleFromToken,
  getToken,
  type UserRole,
} from "@/lib/authApi";

export function useAuth() {
  const [auth, setAuth] = useState<{
    token: string | null;
    role: UserRole;
    name: string;
  }>(() => {
    const token = getToken();
    const meta = getAuthMeta();
    const tokenRole = token ? getRoleFromToken(token) : null;
    const role: UserRole =
      tokenRole === "ADMIN" || meta.role === "ADMIN" ? "ADMIN" : "USER";
    const name =
      (meta.name && meta.name !== "—" ? meta.name : null) ??
      getDisplayName() ??
      (token ? getDisplayNameFromToken(token) : null) ??
      "—";
    return { token, role, name };
  });

  useEffect(() => {
    const sync = () => {
      const token = getToken();
      const meta = getAuthMeta();
      const tokenRole = token ? getRoleFromToken(token) : null;
      const role: UserRole =
        tokenRole === "ADMIN" || meta.role === "ADMIN" ? "ADMIN" : "USER";
      const name =
        (meta.name && meta.name !== "—" ? meta.name : null) ??
        getDisplayName() ??
        (token ? getDisplayNameFromToken(token) : null) ??
        "—";
      setAuth((prev) => {
        if (prev.token === token && prev.role === role && prev.name === name) {
          return prev;
        }
        return { token, role, name };
      });
    };
    sync();

    const onAuthChanged = () => sync();
    const onStorage = (event: StorageEvent) => {
      if (
        event.key === "auth_token" ||
        event.key === "auth_role" ||
        event.key === "auth_name" ||
        event.key === "auth_display_name" ||
        event.key === null
      ) {
        sync();
      }
    };

    window.addEventListener("auth:changed", onAuthChanged);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("auth:changed", onAuthChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return {
    token: auth.token,
    isAuthed: Boolean(auth.token),
    role: auth.role,
    name: auth.name,
  };
}
