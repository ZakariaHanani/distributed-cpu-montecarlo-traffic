"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Database, Server, Cloud, Lock, Workflow } from "lucide-react";

const layers = [
  {
    title: "API Gateway",
    icon: Cloud,
    color: "from-indigo-500 to-indigo-600",
    wire: "from-indigo-500/0 via-indigo-500/40 to-indigo-500/0",
    items: ["Load Balancing", "Rate Limiting", "Authentication"],
  },
  {
    title: "Orchestration",
    icon: Workflow,
    color: "from-violet-500 to-violet-600",
    wire: "from-violet-500/0 via-violet-500/40 to-violet-500/0",
    items: ["Job Scheduling", "Task Distribution", "State Management"],
  },
  {
    title: "Compute Layer",
    icon: Server,
    color: "from-rose-500 to-rose-600",
    wire: "from-rose-500/0 via-rose-500/40 to-rose-500/0",
    items: ["Worker Nodes", "GPU Clusters", "Auto-scaling"],
  },
  {
    title: "Data Layer",
    icon: Database,
    color: "from-cyan-500 to-cyan-600",
    wire: "from-cyan-500/0 via-cyan-500/40 to-cyan-500/0",
    items: ["Time-series DB", "Object Storage", "Cache Layer"],
  },
];

export function Architecture() {
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
        '[data-arch="header"]'
      );
      const cards = gsap.utils.toArray<HTMLElement>(
        '[data-arch="card"]',
        rootRef.current
      );
      const dots = gsap.utils.toArray<HTMLElement>(
        '[data-arch="dot"]',
        rootRef.current
      );
      const bridges = gsap.utils.toArray<HTMLElement>(
        '[data-arch="bridge"]',
        rootRef.current
      );
      const spine = rootRef.current?.querySelector<HTMLElement>(
        '[data-arch="spine"]'
      );
      const soc =
        rootRef.current?.querySelector<HTMLElement>('[data-arch="soc"]');
      const packet = rootRef.current?.querySelector<HTMLElement>(
        '[data-arch="packet"]'
      );

      if (prefersReducedMotion) {
        if (header) gsap.set(header, { opacity: 1, y: 0 });
        if (cards.length) gsap.set(cards, { opacity: 1, y: 0 });
        if (dots.length) gsap.set(dots, { opacity: 1, scale: 1 });
        if (bridges.length) gsap.set(bridges, { scaleX: 1 });
        if (spine) gsap.set(spine, { scaleY: 1 });
        if (soc) gsap.set(soc, { opacity: 1, y: 0 });
        if (packet) gsap.set(packet, { opacity: 0 });
        return;
      }

      if (header) gsap.set(header, { opacity: 0, y: 18 });
      if (cards.length) gsap.set(cards, { opacity: 0, y: 18 });
      if (dots.length) gsap.set(dots, { opacity: 0, scale: 0.85 });
      if (bridges.length)
        gsap.set(bridges, { scaleX: 0, transformOrigin: "center" });
      if (spine) gsap.set(spine, { scaleY: 0, transformOrigin: "top" });
      if (soc) gsap.set(soc, { opacity: 0, y: 18 });
      if (packet) gsap.set(packet, { opacity: 0, y: 0 });
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

        const header = root.querySelector<HTMLElement>('[data-arch="header"]');
        const cards = Array.from(
          root.querySelectorAll<HTMLElement>('[data-arch="card"]')
        );
        const dots = Array.from(
          root.querySelectorAll<HTMLElement>('[data-arch="dot"]')
        );
        const bridges = Array.from(
          root.querySelectorAll<HTMLElement>('[data-arch="bridge"]')
        );
        const spine = root.querySelector<HTMLElement>('[data-arch="spine"]');
        const packet = root.querySelector<HTMLElement>('[data-arch="packet"]');
        const soc = root.querySelector<HTMLElement>('[data-arch="soc"]');
        const spineWrap = root.querySelector<HTMLElement>(
          '[data-arch="spine-wrap"]'
        );

        const tl = gsap.timeline({
          defaults: { duration: 0.6, ease: "power3.out" },
        });
        if (spine)
          tl.to(spine, { scaleY: 1, duration: 0.95, ease: "power2.out" }, 0);
        if (header)
          tl.to(header, { opacity: 1, y: 0, clearProps: "transform" }, 0.05);

        const count = Math.max(cards.length, dots.length, bridges.length);
        for (let i = 0; i < count; i++) {
          const at = 0.22 + i * 0.18;
          if (dots[i]) tl.to(dots[i], { opacity: 1, scale: 1 }, at);
          if (bridges[i])
            tl.to(
              bridges[i],
              { scaleX: 1, duration: 0.55, ease: "power2.out" },
              at
            );
          if (cards[i])
            tl.to(cards[i], { opacity: 1, y: 0, clearProps: "transform" }, at);
        }

        if (soc)
          tl.to(
            soc,
            { opacity: 1, y: 0, clearProps: "transform" },
            0.22 + count * 0.18
          );
        if (packet) tl.to(packet, { opacity: 1, duration: 0.25 }, 0.55);

        if (packet && spineWrap) {
          gsap.to(packet, {
            y: () => Math.max(0, spineWrap.getBoundingClientRect().height - 10),
            duration: 3.8,
            ease: "none",
            repeat: -1,
            delay: 1.05,
          });
        }

        if (cards.length) {
          gsap.to(cards, {
            y: (i) => (i % 2 === 0 ? 7 : -7),
            duration: (i) => 5.4 + i * 0.45,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.25,
          });
        }

        observer.disconnect();
      },
      { threshold: 0.22 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="architecture"
      className="py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div data-arch="header" className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 dark:text-slate-100 mb-6">
            System Architecture
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Built on proven distributed systems patterns for reliability at
            scale
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="relative">
          {/* Vertical connector line */}
          <div
            data-arch="spine-wrap"
            className="absolute left-1/2 top-0 bottom-0 hidden lg:block"
          >
            <div
              data-arch="spine"
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-500"
            />
            <div
              data-arch="packet"
              className="absolute left-1/2 top-1 -translate-x-1/2 size-2 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 shadow-[0_0_18px_rgba(99,102,241,0.5)]"
            />
          </div>

          <div className="space-y-10">
            {layers.map((layer, i) => (
              <div key={i} className="relative">
                <div className="lg:flex lg:items-center">
                  <div className="hidden lg:flex flex-1 justify-end">
                    {i % 2 === 0 && (
                      <div data-arch="card" className="w-full max-w-xl">
                        <div className="group glass card-super-lg p-8 shadow-deep transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_30px_70px_-40px_rgba(99,102,241,0.22)] hover:border-indigo-500/25 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                              <div
                                className={`absolute -inset-2 rounded-2xl blur-[16px] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 bg-gradient-to-br ${layer.wire}`}
                              />
                              <div
                                className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${layer.color} flex items-center justify-center shadow-[0_18px_55px_-44px_rgba(15,23,42,0.35)]`}
                              >
                                <layer.icon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                              {layer.title}
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {layer.items.map((item, j) => (
                              <span
                                key={j}
                                className="px-4 py-2 bg-slate-100 dark:bg-white/10 rounded-full text-sm text-slate-600 dark:text-slate-300 font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="hidden lg:flex w-28 justify-center">
                    <div className="relative flex items-center justify-center w-full h-full">
                      <div
                        data-arch="dot"
                        className="relative flex items-center justify-center"
                      >
                        <span
                          className={`absolute inset-0 rounded-full opacity-40 blur-[8px] bg-gradient-to-br ${layer.color}`}
                        />
                        <span
                          className={`absolute inset-0 rounded-full opacity-30 bg-gradient-to-br ${layer.color} animate-ping motion-reduce:animate-none`}
                        />
                        <span
                          className={`relative size-2.5 rounded-full bg-gradient-to-br ${layer.color}`}
                        />
                      </div>
                      <div
                        data-arch="bridge"
                        className={`absolute top-1/2 -translate-y-1/2 h-px ${
                          i % 2 === 0 ? "left-0 right-1/2" : "left-1/2 right-0"
                        } bg-gradient-to-r ${layer.wire}`}
                      />
                    </div>
                  </div>

                  <div className="hidden lg:flex flex-1 justify-start">
                    {i % 2 === 1 && (
                      <div data-arch="card" className="w-full max-w-xl">
                        <div className="group glass card-super-lg p-8 shadow-deep transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_30px_70px_-40px_rgba(99,102,241,0.22)] hover:border-indigo-500/25 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                              <div
                                className={`absolute -inset-2 rounded-2xl blur-[16px] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 bg-gradient-to-br ${layer.wire}`}
                              />
                              <div
                                className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${layer.color} flex items-center justify-center shadow-[0_18px_55px_-44px_rgba(15,23,42,0.35)]`}
                              >
                                <layer.icon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                              {layer.title}
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {layer.items.map((item, j) => (
                              <span
                                key={j}
                                className="px-4 py-2 bg-slate-100 dark:bg-white/10 rounded-full text-sm text-slate-600 dark:text-slate-300 font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:hidden">
                    <div data-arch="card" className="w-full">
                      <div className="group glass card-super-lg p-8 shadow-deep transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_30px_70px_-40px_rgba(99,102,241,0.22)] hover:border-indigo-500/25 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="relative">
                            <div
                              className={`absolute -inset-2 rounded-2xl blur-[16px] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 bg-gradient-to-br ${layer.wire}`}
                            />
                            <div
                              className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${layer.color} flex items-center justify-center shadow-[0_18px_55px_-44px_rgba(15,23,42,0.35)]`}
                            >
                              <layer.icon className="w-7 h-7 text-white" />
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {layer.title}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {layer.items.map((item, j) => (
                            <span
                              key={j}
                              className="px-4 py-2 bg-slate-100 dark:bg-white/10 rounded-full text-sm text-slate-600 dark:text-slate-300 font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Security Badge */}
          <div className="flex justify-center mt-16">
            <div
              data-arch="soc"
              className="glass card-super p-6 shadow-deep inline-flex items-center gap-4"
            >
              <div className="relative">
                <div className="absolute -inset-2 rounded-xl bg-emerald-500/15 blur-[12px]" />
                <div className="relative w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center ring-1 ring-emerald-500/20">
                  <Lock className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-bold text-slate-900 dark:text-slate-100">
                  SOC 2 Type II Compliant
                </div>
                <div className="text-slate-500 dark:text-slate-300 text-sm">
                  Enterprise-grade security at every layer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
