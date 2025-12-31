"use client";

import { useEffect, useState } from "react";
import { Cpu } from "lucide-react";

export function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg-dark.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/55 to-slate-950/80" />
      </div>
      {/* Title */}
      <h1 className="relative z-10 text-5xl md:text-7xl font-bold text-white tracking-[-0.05em] leading-[0.9] mb-8">
        System Boot
      </h1>

      {/* Animated CPU icon */}
      <div className="relative z-10 mb-12">
        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <Cpu
          className="w-24 h-24 text-indigo-400 animate-spin"
          style={{ animationDuration: "3s" }}
        />
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-64 h-1 bg-slate-800/80 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500 transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Loading text */}
      <p className="relative z-10 mt-4 text-white/70 font-mono text-sm">
        Initializing distributed systems...
      </p>
    </div>
  );
}
