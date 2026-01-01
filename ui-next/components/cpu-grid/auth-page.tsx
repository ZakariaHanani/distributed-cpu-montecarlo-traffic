"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { gsap } from "gsap";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Github,
  Mail,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ViewType } from "@/app/page";
import { AuthHeroPanel } from "@/components/cpu-grid/AuthHeroPanel";
import {
  decodeJwtPayload,
  getDisplayNameFromToken,
  getMustChangePasswordFromToken,
  login,
  reset,
  setAuthMeta,
  setDisplayName,
  setToken,
  signup,
  forgot,
} from "@/lib/authApi";

interface AuthPageProps {
  mode: "login" | "signup";
  setCurrentView: (view: ViewType) => void;
}

type ToastType = "error" | "success";

type ToastPayload = {
  type: ToastType;
  title: string;
  message?: string;
};

type ToastState = ToastPayload & {
  id: number;
  isOpen: boolean;
};

export function AuthPage({ mode, setCurrentView }: AuthPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const redirectTimeoutRef = useRef<number | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const toastClearTimeoutRef = useRef<number | null>(null);
  const toastIdRef = useRef(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flow, setFlow] = useState<"auth" | "forgot" | "reset">("auth");
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const isLogin = mode === "login";
  const authBaseUrl = (() => {
    const raw =
      process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ?? "http://localhost:8082";
    return raw.endsWith("/") ? raw.slice(0, -1) : raw;
  })();

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current !== null) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }
      if (toastClearTimeoutRef.current !== null) {
        window.clearTimeout(toastClearTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (mode !== "login" || flow !== "auth") return;
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLInputElement>(
        '[data-auth-field="username"]'
      );
      el?.focus();
      el?.select();
    });
  }, [mode, flow]);

  useEffect(() => {
    if (mode !== "login" || flow !== "auth") return;
    const url = new URL(window.location.href);
    const error = url.searchParams.get("error");
    if (error !== "oauth_failed") return;

    showToast({
      type: "error",
      title: "Sign-in failed",
      message: "Please try again.",
    });

    url.searchParams.delete("error");
    const nextQuery = url.searchParams.toString();
    window.history.replaceState(
      {},
      "",
      url.pathname + (nextQuery ? `?${nextQuery}` : "") + url.hash
    );
  }, [mode, flow]);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }, contentRef);
    return () => ctx.revert();
  }, [mode, flow]);

  const hideToast = () => {
    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setToast((current) => {
      if (!current) return null;
      return { ...current, isOpen: false };
    });
  };

  const showToast = ({ type, title, message }: ToastPayload) => {
    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    if (toastClearTimeoutRef.current !== null) {
      window.clearTimeout(toastClearTimeoutRef.current);
      toastClearTimeoutRef.current = null;
    }

    toastIdRef.current += 1;
    const next: ToastState = {
      id: toastIdRef.current,
      type,
      title,
      message,
      isOpen: true,
    };
    setToast(next);

    toastTimeoutRef.current = window.setTimeout(() => {
      hideToast();
    }, 6000);
  };

  const startOAuth = (provider: "google" | "github") => {
    hideToast();
    window.location.href = `${authBaseUrl}/oauth2/authorization/${provider}`;
  };

  useEffect(() => {
    if (!toast || toast.isOpen) return;
    toastClearTimeoutRef.current = window.setTimeout(() => {
      setToast(null);
    }, 220);
    return () => {
      if (toastClearTimeoutRef.current !== null) {
        window.clearTimeout(toastClearTimeoutRef.current);
        toastClearTimeoutRef.current = null;
      }
    };
  }, [toast]);

  const handleAuthSubmit = async (event: FormEvent) => {
    event.preventDefault();
    hideToast();

    if (!isLogin) {
      if (password !== confirmPassword) {
        showToast({
          type: "error",
          title: "Password mismatch",
          message: "Passwords do not match.",
        });
        return;
      }
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !username.trim() ||
        !email.trim() ||
        !password
      ) {
        showToast({
          type: "error",
          title: "Missing details",
          message: "All fields are required.",
        });
        return;
      }
    } else {
      if (!username.trim() || !password) {
        showToast({
          type: "error",
          title: "Missing details",
          message: "Username and password are required.",
        });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (redirectTimeoutRef.current !== null) {
        window.clearTimeout(redirectTimeoutRef.current);
        redirectTimeoutRef.current = null;
      }

      if (isLogin) {
        const token = await login({ usernameOrEmail: username, password });
        setToken(token);
        const payload = decodeJwtPayload(token);
        const rawRole = typeof payload?.role === "string" ? payload.role : "";
        const normalizedRole = rawRole.trim().toUpperCase();
        const role =
          normalizedRole === "ADMIN" || normalizedRole === "ROLE_ADMIN"
            ? "ADMIN"
            : "USER";
        const authedName =
          typeof payload?.name === "string" ? payload.name : "—";
        setAuthMeta({ role, name: authedName });
        const displayName = getDisplayNameFromToken(token);
        if (displayName) setDisplayName(displayName);
        window.dispatchEvent(new Event("auth:changed"));
        const mustChange = getMustChangePasswordFromToken(token);
        showToast({
          type: "success",
          title: "Signed in",
          message: mustChange
            ? "Password update required. Redirecting…"
            : "Success. Redirecting…",
        });
        redirectTimeoutRef.current = window.setTimeout(() => {
          if (mustChange) {
            setCurrentView(role === "ADMIN" ? "admin_profile" : "profile");
            return;
          }
          setCurrentView("home");
        }, 380);
      } else {
        await signup({
          firstName,
          lastName,
          username,
          email,
          password,
          confirmPassword,
        });
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
        showToast({
          type: "success",
          title: "Account created",
          message: "Please sign in.",
        });
        setFlow("auth");
        setCurrentView("login");
      }
    } catch (err) {
      showToast({
        type: "error",
        title: "Request failed",
        message: err instanceof Error ? err.message : "Request failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotSubmit = async (event: FormEvent) => {
    event.preventDefault();
    hideToast();

    if (!forgotEmail.trim()) {
      showToast({
        type: "error",
        title: "Missing details",
        message: "Email is required.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const message = await forgot(forgotEmail);
      showToast({ type: "success", title: "Email sent", message });
      setResetEmail(forgotEmail);
      setFlow("reset");
    } catch (err) {
      showToast({
        type: "error",
        title: "Request failed",
        message: err instanceof Error ? err.message : "Request failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = async (event: FormEvent) => {
    event.preventDefault();
    hideToast();

    if (
      !resetEmail.trim() ||
      !resetCode.trim() ||
      !newPassword ||
      !resetConfirmPassword
    ) {
      showToast({
        type: "error",
        title: "Missing details",
        message: "All fields are required.",
      });
      return;
    }
    if (newPassword !== resetConfirmPassword) {
      showToast({
        type: "error",
        title: "Password mismatch",
        message: "Passwords do not match.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const message = await reset({
        email: resetEmail,
        code: resetCode,
        newPassword,
        confirmPassword: resetConfirmPassword,
      });
      showToast({ type: "success", title: "Password reset", message });
      setFlow("auth");
      setPassword("");
    } catch (err) {
      showToast({
        type: "error",
        title: "Request failed",
        message: err instanceof Error ? err.message : "Request failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12">
        <div className="max-w-md mx-auto w-full">
          <button
            onClick={() => setCurrentView("home")}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-slate-500 dark:text-slate-300 mb-8">
            {isLogin
              ? "Sign in to access your simulations and results."
              : "Get started with CPU Grid for free."}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button
              variant="outline"
              className="h-12 rounded-xl bg-transparent"
              type="button"
              onClick={() => startOAuth("github")}
              disabled={isSubmitting}
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl bg-transparent"
              type="button"
              onClick={() => startOAuth("google")}
              disabled={isSubmitting}
            >
              <Mail className="w-5 h-5 mr-2" />
              Google
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
            <span className="text-slate-400 dark:text-slate-400 text-sm">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
          </div>

          <div className="relative">
            {toast && (
              <div className="pointer-events-none absolute left-3 right-3 -top-3 z-20 flex justify-center">
                <div
                  role="alert"
                  aria-live="polite"
                  className={[
                    "pointer-events-auto w-full max-w-[520px]",
                    "rounded-2xl border bg-white/80 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-xl",
                    "shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)]",
                    "px-4 py-3",
                    "transition-[opacity,transform] duration-200 ease-out",
                    toast.isOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-[6px]",
                    toast.type === "error"
                      ? "border-rose-200/70 shadow-[0_30px_80px_-30px_rgba(244,63,94,0.18)]"
                      : "border-emerald-200/70 shadow-[0_30px_80px_-30px_rgba(16,185,129,0.14)]",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={[
                        "mt-0.5 flex size-10 items-center justify-center rounded-full ring-1",
                        toast.type === "error"
                          ? "bg-gradient-to-br from-rose-500/12 to-rose-600/12 ring-rose-500/20"
                          : "bg-gradient-to-br from-emerald-500/12 to-emerald-600/12 ring-emerald-500/20",
                      ].join(" ")}
                    >
                      {toast.type === "error" ? (
                        <AlertTriangle className="size-5 text-rose-600" />
                      ) : (
                        <CheckCircle2 className="size-5 text-emerald-600" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {toast.title}
                      </div>
                      {toast.message ? (
                        <div className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                          {toast.message}
                        </div>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={hideToast}
                      aria-label="Close alert"
                      className="mt-0.5 inline-flex size-9 items-center justify-center rounded-full text-slate-500 dark:text-slate-300 transition-colors hover:bg-slate-900/5 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div ref={contentRef}>
              {flow === "auth" && (
                <form className="space-y-4" onSubmit={handleAuthSubmit}>
                  {!isLogin && (
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="First Name"
                        className="h-12 rounded-xl"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <Input
                        placeholder="Last Name"
                        className="h-12 rounded-xl"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  )}
                  <Input
                    placeholder="Username"
                    className="h-12 rounded-xl"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    data-auth-field="username"
                    autoComplete="username"
                  />
                  {!isLogin && (
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="h-12 rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  )}
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="h-12 rounded-xl pr-12"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete={
                        isLogin ? "current-password" : "new-password"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-100"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {!isLogin && (
                    <div className="relative">
                      <Input
                        type={showRepeatPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="h-12 rounded-xl pr-12"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowRepeatPassword(!showRepeatPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-100"
                      >
                        {showRepeatPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  )}

                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => {
                        hideToast();
                        setForgotEmail("");
                        setFlow("forgot");
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200"
                    >
                      Forgot password?
                    </button>
                  )}

                  <Button
                    disabled={isSubmitting}
                    className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-100 rounded-xl"
                  >
                    {isSubmitting
                      ? "Please wait..."
                      : isLogin
                      ? "Sign In"
                      : "Create Account"}
                  </Button>
                </form>
              )}

              {flow === "forgot" && (
                <form className="space-y-4" onSubmit={handleForgotSubmit}>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="h-12 rounded-xl"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    autoComplete="email"
                  />

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        hideToast();
                        setFlow("auth");
                      }}
                      className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                    >
                      Back to sign in
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        hideToast();
                        setResetEmail(forgotEmail);
                        setFlow("reset");
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200"
                    >
                      I have a code
                    </button>
                  </div>

                  <Button
                    disabled={isSubmitting}
                    className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-100 rounded-xl"
                  >
                    {isSubmitting ? "Sending..." : "Send reset code"}
                  </Button>
                </form>
              )}

              {flow === "reset" && (
                <form className="space-y-4" onSubmit={handleResetSubmit}>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="h-12 rounded-xl"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <Input
                    placeholder="Code"
                    className="h-12 rounded-xl"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    autoComplete="one-time-code"
                  />
                  <Input
                    type="password"
                    placeholder="New Password"
                    className="h-12 rounded-xl"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="h-12 rounded-xl"
                    value={resetConfirmPassword}
                    onChange={(e) => setResetConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      hideToast();
                      setFlow("auth");
                    }}
                    className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                  >
                    Back to sign in
                  </button>

                  <Button
                    disabled={isSubmitting}
                    className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-100 rounded-xl"
                  >
                    {isSubmitting ? "Resetting..." : "Reset password"}
                  </Button>
                </form>
              )}
            </div>
          </div>

          <p className="text-center text-slate-500 dark:text-slate-300 mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                hideToast();
                setFlow("auth");
                setPassword("");
                setConfirmPassword("");
                setCurrentView(isLogin ? "signup" : "login");
              }}
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200 font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      <AuthHeroPanel />
    </div>
  );
}
