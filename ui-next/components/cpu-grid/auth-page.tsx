"use client";

import { useState } from "react";
import Image from "next/image";
import { Cpu, Eye, EyeOff, ArrowLeft, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ViewType } from "@/app/page";

interface AuthPageProps {
  mode: "login" | "signup";
  setCurrentView: (view: ViewType) => void;
}

export function AuthPage({ mode, setCurrentView }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = mode === "login";

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

          <form className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" className="h-12 rounded-xl" />
                <Input placeholder="Last Name" className="h-12 rounded-xl" />
              </div>
            )}
            <Input
              type="email"
              placeholder="Email Address"
              className="h-12 rounded-xl"
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="h-12 rounded-xl pr-12"
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

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-slate-500 mt-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setCurrentView(isLogin ? "signup" : "login")}
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
