"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Cpu, GraduationCap, Layers, Users } from "lucide-react";

const stack = [
  "Java / Spring Boot (Master node)",
  "Java RMI (Worker communication)",
  "MySQL (Persistence)",
  "Next.js + TypeScript (UI)",
  "Tailwind CSS (Design system)",
] as const;

export function Showcase() {
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
        '[data-showcase="header"]'
      );
      const cards = gsap.utils.toArray<HTMLElement>(
        '[data-showcase="card"]',
        rootRef.current
      );

      if (prefersReducedMotion) {
        if (header) gsap.set(header, { opacity: 1, y: 0 });
        if (cards.length) gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      if (header) gsap.set(header, { opacity: 0, y: 12 });
      if (cards.length) gsap.set(cards, { opacity: 0, y: 12 });
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
          '[data-showcase="header"]'
        );
        const cards = Array.from(
          root.querySelectorAll<HTMLElement>('[data-showcase="card"]')
        );

        const tl = gsap.timeline({
          defaults: { duration: 0.6, ease: "power3.out" },
        });
        if (header)
          tl.to(header, { opacity: 1, y: 0, clearProps: "transform" });
        if (cards.length)
          tl.to(
            cards,
            { opacity: 1, y: 0, stagger: 0.1, clearProps: "transform" },
            header ? "-=0.25" : 0
          );

        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="py-32 relative bg-[rgb(var(--bg))]"
      aria-labelledby="ecosystem-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div data-showcase="header" className="text-center mb-16 md:mb-20">
          <h2
            id="ecosystem-title"
            className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 dark:text-slate-100 mb-6"
          >
            Research & Technical Ecosystem
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Built within an academic environment, powered by modern distributed
            systems technologies.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article
            data-showcase="card"
            className="
              group rounded-3xl border border-white/40 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-xl
              shadow-[0_26px_70px_-55px_rgba(15,23,42,0.30)]
              transition-all duration-200 ease-out
              hover:-translate-y-1 hover:border-white/70 dark:hover:border-white/14 hover:shadow-[0_34px_96px_-64px_rgba(99,102,241,0.30)]
              focus-within:-translate-y-1 focus-within:border-white/70 dark:focus-within:border-white/14 focus-within:shadow-[0_34px_96px_-64px_rgba(99,102,241,0.30)]
              liquid-hover
            "
          >
            <div className="p-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-500/20 blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-200" />
                <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-[0_16px_50px_-30px_rgba(99,102,241,0.65)]">
                  <GraduationCap className="size-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Academic Foundation
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                CPU Grid is developed as part of a university-level research
                project focused on distributed systems, parallel computing, and
                Monte Carlo simulation for traffic analysis.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-white/50 dark:border-white/10 bg-white/70 dark:bg-[rgb(var(--glass)/0.65)] px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur-xl">
                  University Research Project
                </span>
                <span className="inline-flex items-center rounded-full border border-white/50 dark:border-white/10 bg-white/70 dark:bg-[rgb(var(--glass)/0.65)] px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur-xl">
                  Educational & Experimental Platform
                </span>
              </div>
            </div>
          </article>

          <article
            data-showcase="card"
            className="
              group rounded-3xl border border-white/40 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-xl
              shadow-[0_26px_70px_-55px_rgba(15,23,42,0.30)]
              transition-all duration-200 ease-out
              hover:-translate-y-1 hover:border-white/70 dark:hover:border-white/14 hover:shadow-[0_34px_96px_-64px_rgba(139,92,246,0.28)]
              focus-within:-translate-y-1 focus-within:border-white/70 dark:focus-within:border-white/14 focus-within:shadow-[0_34px_96px_-64px_rgba(139,92,246,0.28)]
              liquid-hover
            "
          >
            <div className="p-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-violet-500/20 blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-200" />
                <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-[0_16px_50px_-30px_rgba(139,92,246,0.60)]">
                  <Layers className="size-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Technical Ecosystem
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                A pragmatic stack designed for distributed execution,
                control-plane orchestration, and a typed UI layer.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {stack.map((item) => (
                  <li key={item}>
                    <span className="inline-flex items-center rounded-full border border-white/50 dark:border-white/10 bg-white/70 dark:bg-[rgb(var(--glass)/0.65)] px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-xl">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <span className="flex size-8 items-center justify-center rounded-full bg-slate-900/5 dark:bg-white/10 text-slate-700 dark:text-slate-200 ring-1 ring-slate-900/10 dark:ring-white/10">
                  <Cpu className="size-4" />
                </span>
                <span>Research-grade components, extensible by design</span>
              </div>
            </div>
          </article>

          <article
            data-showcase="card"
            className="
              group rounded-3xl border border-white/40 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-xl
              shadow-[0_26px_70px_-55px_rgba(15,23,42,0.30)]
              transition-all duration-200 ease-out
              hover:-translate-y-1 hover:border-white/70 dark:hover:border-white/14 hover:shadow-[0_34px_96px_-64px_rgba(15,23,42,0.22)]
              focus-within:-translate-y-1 focus-within:border-white/70 dark:focus-within:border-white/14 focus-within:shadow-[0_34px_96px_-64px_rgba(15,23,42,0.22)]
              liquid-hover
            "
          >
            <div className="p-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-slate-900/10 blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-200" />
                <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 shadow-[0_16px_50px_-30px_rgba(15,23,42,0.55)]">
                  <Users className="size-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Designed for Collaboration
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                The platform is designed to support future collaboration with
                research labs, smart-city initiatives, and distributed-systems
                experiments.
              </p>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                Open to academic extensions and experimental deployments.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
