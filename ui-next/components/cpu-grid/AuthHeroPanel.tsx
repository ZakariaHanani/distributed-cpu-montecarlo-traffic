"use client";

import { useEffect, useState } from "react";

export function AuthHeroPanel() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const dark = new Image();
    dark.src = "/images/hero-bg-dark.png";
    const light = new Image();
    light.src = "/images/hero-bg-light.png";

    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative hidden md:flex md:w-1/2 min-h-screen bg-slate-950">
      <div className="absolute inset-0">
        <div
          className={[
            "absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-out",
            isDark ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{ backgroundImage: "url('/images/hero-bg-dark.png')" }}
        />
        <div
          className={[
            "absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-out",
            isDark ? "opacity-0" : "opacity-100",
          ].join(" ")}
          style={{ backgroundImage: "url('/images/hero-bg-light.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/25 to-slate-950/55" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[520px] h-[520px] rounded-full bg-indigo-500/25 blur-3xl opacity-80" />
      </div>

      <div className="relative z-10 flex w-full items-center justify-center px-8">
        <div className="flex flex-col items-center text-center gap-8 max-w-md">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Accelerate Your Research
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-md mx-auto">
              Join thousands of researchers using CPU Grid to power their traffic
              simulations and Monte Carlo analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

