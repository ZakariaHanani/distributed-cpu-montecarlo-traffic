"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  getDisplayNameFromToken,
  getMustChangePasswordFromToken,
  getRoleFromToken,
  setAuthMeta,
  setDisplayName,
  setToken,
} from "@/lib/authApi";

function OAuthCallbackInner() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      window.location.replace("/login?error=oauth_failed");
      return;
    }

    setToken(token);
    const role = getRoleFromToken(token) ?? "USER";
    const name = getDisplayNameFromToken(token) ?? "—";
    setAuthMeta({ role, name });
    if (name && name !== "—") setDisplayName(name);
    window.dispatchEvent(new Event("auth:changed"));

    const mustChangePassword = getMustChangePasswordFromToken(token);
    if (!mustChangePassword) {
      const returnTo = window.localStorage.getItem("return_to");
      if (returnTo && returnTo.startsWith("/")) {
        window.localStorage.removeItem("return_to");
        window.location.replace(returnTo);
        return;
      }
    }
    const view = mustChangePassword
      ? role === "ADMIN"
        ? "admin_profile"
        : "profile"
      : "home";
    window.location.replace(`/?view=${encodeURIComponent(view)}`);
  }, [searchParams]);

  return null;
}

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <OAuthCallbackInner />
    </Suspense>
  );
}
