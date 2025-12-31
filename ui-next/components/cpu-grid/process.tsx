"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Upload, Settings, Play, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Configuration",
    description:
      "Define your traffic network topology and simulation parameters through our intuitive interface.",
    accent: {
      icon: "text-indigo-700",
      iconBg: "from-indigo-500/20 via-violet-500/15 to-rose-500/10",
      glow: "from-indigo-500/45 via-violet-500/35 to-rose-500/25",
      ring: "ring-indigo-500/20",
      borderHover: "hover:border-indigo-500/30",
    },
  },
  {
    icon: Settings,
    step: "02",
    title: "Configure Simulation",
    description:
      "Set Monte Carlo iterations, distribution parameters, and analysis thresholds.",
    accent: {
      icon: "text-emerald-700",
      iconBg: "from-emerald-500/18 via-cyan-500/14 to-sky-500/10",
      glow: "from-emerald-500/40 via-cyan-500/30 to-sky-500/22",
      ring: "ring-emerald-500/18",
      borderHover: "hover:border-emerald-500/28",
    },
  },
  {
    icon: Play,
    step: "03",
    title: "Execute Distributed",
    description:
      "Watch as your simulation scales across the worker mesh in real-time.",
    accent: {
      icon: "text-amber-700",
      iconBg: "from-amber-500/18 via-orange-500/14 to-rose-500/10",
      glow: "from-amber-500/40 via-orange-500/30 to-rose-500/22",
      ring: "ring-amber-500/18",
      borderHover: "hover:border-amber-500/28",
    },
  },
  {
    icon: Download,
    step: "04",
    title: "Collect Results",
    description:
      "Download comprehensive analytics, visualizations, and raw data exports.",
    accent: {
      icon: "text-rose-700",
      iconBg: "from-rose-500/18 via-fuchsia-500/14 to-violet-500/10",
      glow: "from-rose-500/40 via-fuchsia-500/30 to-violet-500/22",
      ring: "ring-rose-500/18",
      borderHover: "hover:border-rose-500/28",
    },
  },
];

export function Process() {
  const rootRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const header = rootRef.current?.querySelector<HTMLElement>(
        '[data-process="header"]'
      );
      const stepsEls = gsap.utils.toArray<HTMLElement>(
        '[data-process="step"]',
        rootRef.current
      );
      const line = rootRef.current?.querySelector<HTMLElement>(
        '[data-process="line"]'
      );

      if (prefersReducedMotion) {
        if (header) gsap.set(header, { opacity: 1, y: 0 });
        if (stepsEls.length) gsap.set(stepsEls, { opacity: 1, y: 0 });
        if (line) gsap.set(line, { opacity: 1, scaleX: 1 });
        return;
      }

      if (header) gsap.set(header, { opacity: 0, y: 18 });
      if (stepsEls.length) gsap.set(stepsEls, { opacity: 0, y: 18 });
      if (line)
        gsap.set(line, {
          opacity: 1,
          scaleX: 0,
          transformOrigin: "left center",
        });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        const header = root.querySelector<HTMLElement>(
          '[data-process="header"]'
        );
        const stepsEls = Array.from(
          root.querySelectorAll<HTMLElement>('[data-process="step"]')
        );
        const line = root.querySelector<HTMLElement>('[data-process="line"]');
        const bubbles = Array.from(
          root.querySelectorAll<HTMLElement>('[data-process="bubble"]')
        );
        const iconPlates = Array.from(
          root.querySelectorAll<HTMLElement>('[data-process="icon-plate"]')
        );

        const tl = gsap.timeline({
          defaults: { duration: 0.65, ease: "power3.out" },
        });
        if (line)
          tl.to(line, { scaleX: 1, duration: 0.95, ease: "power2.out" }, 0);
        if (header)
          tl.to(header, { opacity: 1, y: 0, clearProps: "transform" });
        if (stepsEls.length)
          tl.to(
            stepsEls,
            { opacity: 1, y: 0, stagger: 0.1, clearProps: "transform" },
            header ? "-=0.30" : 0
          );

        if (bubbles.length) {
          gsap.to(bubbles, {
            y: (i) => (i % 2 === 0 ? -8 : 8),
            rotate: (i) => (i % 2 === 0 ? -1.2 : 1.2),
            duration: (i) => 4.6 + i * 0.45,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.35,
          });
        }

        if (stepsEls.length) {
          gsap.to(stepsEls, {
            y: (i) => (i % 2 === 0 ? 6 : -6),
            duration: (i) => 5.2 + i * 0.55,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.6,
          });
        }

        if (iconPlates.length) {
          gsap.to(iconPlates, {
            scale: 1.06,
            duration: 1.7,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.12,
            delay: 0.8,
          });
        }

        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div data-process="header" className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 dark:text-slate-100 mb-6">
            Simulation Workflow
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From configuration to results in four simple steps
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div
            data-process="line"
            className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500 bg-[length:200%_100%] animate-[gradient-flow_14s_ease_infinite] motion-reduce:animate-none hidden lg:block"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} data-process="step" className="relative">
                {/* Step Number */}
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-full blur-xl opacity-60 bg-gradient-to-br ${step.accent.glow}`}
                    />
                    <div
                      data-process="bubble"
                      className={`relative w-20 h-20 bg-white dark:bg-[rgb(var(--glass)/0.65)] border-4 border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center shadow-deep animate-[float_6.5s_ease-in-out_infinite] motion-reduce:animate-none ring-1 ${step.accent.ring}`}
                      style={{
                        animationDelay: `${0.15 + i * 0.28}s`,
                        animationDuration: `${6.2 + i * 0.8}s`,
                      }}
                    >
                      <span className="text-2xl font-bold text-gradient-flow tabular-nums">
                        {step.step}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`group glass card-super-lg p-8 shadow-deep h-full transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_30px_70px_-40px_rgba(99,102,241,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${step.accent.borderHover}`}
                >
                  <div className="relative mb-6">
                    <div
                      className={`absolute -inset-2 rounded-[1.25rem] blur-[14px] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 bg-gradient-to-br ${step.accent.glow}`}
                    />
                    <div
                      data-process="icon-plate"
                      className={`relative w-14 h-14 rounded-2xl flex items-center justify-center bg-white/70 dark:bg-[rgb(var(--glass)/0.65)] ring-1 ring-white/60 dark:ring-white/10 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.18)] dark:shadow-[0_18px_50px_-30px_rgba(0,0,0,0.55)] overflow-hidden`}
                    >
                      <div
                        className={`absolute inset-0 opacity-90 bg-gradient-to-br ${step.accent.iconBg}`}
                      />
                      <step.icon
                        className={`relative w-7 h-7 ${step.accent.icon}`}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
