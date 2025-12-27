"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Cpu, Eye, EyeOff, ArrowLeft, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ViewType } from "@/app/page";
import { login, signup, forgot, reset, setToken } from "@/lib/authApi";

interface AuthPageProps {
  mode: "login" | "signup";
  setCurrentView: (view: ViewType) => void;
}

export function AuthPage({ mode, setCurrentView }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flow, setFlow] = useState<"auth" | "forgot" | "reset">("auth");
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const isLogin = mode === "login";
  const router = useRouter();

  const handleAuthSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setApiError(null);
    setSuccessMessage(null);

    if (!isLogin) {
      if (password !== confirmPassword) {
        setApiError("Passwords do not match");
        return;
      }
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !username.trim() ||
        !email.trim() ||
        !password
      ) {
        setApiError("All fields are required");
        return;
      }
    } else {
      if (!username.trim() || !password) {
        setApiError("Username and password are required");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const token = isLogin
        ? await login({ usernameOrEmail: username, password })
        : await signup({
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword,
          });

      setToken(token);
      setSuccessMessage("Success. Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 400);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setApiError(null);
    setSuccessMessage(null);

    if (!forgotEmail.trim()) {
      setApiError("Email is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const message = await forgot(forgotEmail);
      setSuccessMessage(message);
      setResetEmail(forgotEmail);
      setFlow("reset");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setApiError(null);
    setSuccessMessage(null);

    if (
      !resetEmail.trim() ||
      !resetCode.trim() ||
      !newPassword ||
      !resetConfirmPassword
    ) {
      setApiError("All fields are required");
      return;
    }
    if (newPassword !== resetConfirmPassword) {
      setApiError("Passwords do not match");
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
      setSuccessMessage(message);
      setFlow("auth");
      setPassword("");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Request failed");
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
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="flex items-center gap-3 mb-8">
            <div className="bg-slate-900 p-2 rounded-xl">
              <Cpu className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              CPU Grid
            </span>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-slate-500 mb-8">
            {isLogin
              ? "Sign in to access your simulations and results."
              : "Get started with CPU Grid for free."}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button
              variant="outline"
              className="h-12 rounded-xl bg-transparent"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl bg-transparent"
            >
              <Mail className="w-5 h-5 mr-2" />
              Google
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-sm">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

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
              />
              {!isLogin && (
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="h-12 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="h-12 rounded-xl pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showRepeatPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              )}

              {apiError && <p className="text-sm text-red-600">{apiError}</p>}
              {successMessage && (
                <p className="text-sm text-green-700">{successMessage}</p>
              )}

              {isLogin && (
                <button
                  type="button"
                  onClick={() => {
                    setApiError(null);
                    setSuccessMessage(null);
                    setForgotEmail("");
                    setFlow("forgot");
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </button>
              )}

              <Button
                disabled={isSubmitting}
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl"
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
              />

              {apiError && <p className="text-sm text-red-600">{apiError}</p>}
              {successMessage && (
                <p className="text-sm text-green-700">{successMessage}</p>
              )}

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setApiError(null);
                    setSuccessMessage(null);
                    setFlow("auth");
                  }}
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Back to sign in
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setApiError(null);
                    setSuccessMessage(null);
                    setResetEmail(forgotEmail);
                    setFlow("reset");
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  I have a code
                </button>
              </div>

              <Button
                disabled={isSubmitting}
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl"
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
              />
              <Input
                placeholder="Code"
                className="h-12 rounded-xl"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
              />
              <Input
                type="password"
                placeholder="New Password"
                className="h-12 rounded-xl"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                className="h-12 rounded-xl"
                value={resetConfirmPassword}
                onChange={(e) => setResetConfirmPassword(e.target.value)}
              />

              {apiError && <p className="text-sm text-red-600">{apiError}</p>}
              {successMessage && (
                <p className="text-sm text-green-700">{successMessage}</p>
              )}

              <button
                type="button"
                onClick={() => {
                  setApiError(null);
                  setSuccessMessage(null);
                  setFlow("auth");
                }}
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                Back to sign in
              </button>

              <Button
                disabled={isSubmitting}
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl"
              >
                {isSubmitting ? "Resetting..." : "Reset password"}
              </Button>
            </form>
          )}

          <p className="text-center text-slate-500 mt-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setApiError(null);
                setSuccessMessage(null);
                setFlow("auth");
                setCurrentView(isLogin ? "signup" : "login");
              }}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      <div className="relative hidden md:flex md:w-1/2 min-h-screen bg-[url('/images/hero-bg-light.png')] bg-cover bg-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[520px] h-[520px] rounded-full bg-indigo-500/25 blur-3xl opacity-80" />
        </div>

        <div className="relative z-10 flex w-full items-center justify-center px-8">
          <div className="flex flex-col items-center text-center gap-8 max-w-md">
            <div className="group">
              <div
                className="
                  flex items-center justify-center
                  rounded-2xl bg-white/10 backdrop-blur-md border border-white/10
                  shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]
                  p-5 transition-transform duration-300 ease-out
                  group-hover:scale-105
                "
              >
                <Image
                  src="/images/logo-auth.png"
                  alt="CPU Grid logo"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Accelerate Your Research
              </h2>
              <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-md mx-auto">
                Join thousands of researchers using CPU Grid to power their
                traffic simulations and Monte Carlo analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
