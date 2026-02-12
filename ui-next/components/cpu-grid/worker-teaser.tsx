"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Cpu, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export function WorkerTeaser() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const items = gsap.utils.toArray<HTMLElement>("[data-worker-teaser]");
      gsap.set(
        items,
        prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
      );
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
          '[data-worker-teaser="header"]'
        );
        const cards = Array.from(
          root.querySelectorAll<HTMLElement>('[data-worker-teaser="card"]')
        );
        const cta = root.querySelector<HTMLElement>(
          '[data-worker-teaser="cta"]'
        );

        const tl = gsap.timeline({
          defaults: { duration: 0.55, ease: "power2.out" },
        });
        if (header)
          tl.fromTo(
            header,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, clearProps: "transform" }
          );
        if (cards.length)
          tl.fromTo(
            cards,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, stagger: 0.08, clearProps: "transform" },
            header ? "-=0.30" : 0
          );
        if (cta)
          tl.fromTo(
            cta,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, clearProps: "transform" },
            "-=0.20"
          );
        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="relative z-10">
      <div className="w-full px-6 pb-24">
        <div
          className="
            rounded-[3rem]
            border border-white/30 bg-transparent
            shadow-none
            overflow-hidden
            transition-all duration-500
            hover:border-white/45 dark:border-white/10 dark:hover:border-white/14
          "
        >
          <div className="px-10 py-10">
            <div className="text-center">
              <div data-worker-teaser="header" className="mx-auto max-w-6xl">
                <h2 className="whitespace-nowrap text-[clamp(1.25rem,3.6vw,3rem)] font-bold tracking-[-0.04em] leading-[1.05] text-slate-900 dark:text-slate-100">
                  A Global Network, Powered by People
                </h2>
                <p className="mt-6 text-xl text-slate-500 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  Contribute idle compute power, accelerate large-scale
                  simulations, and earn credits that unlock advanced
                  capabilities.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="grid gap-5 md:grid-cols-3">
              <div
                className="
                  group rounded-[2.5rem]
                  border border-white/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-2xl
                  p-7 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)]
                  transition-[transform,box-shadow,border-color] duration-300 ease-out
                  hover:-translate-y-[3px]
                  hover:shadow-[0_30px_70px_-40px_rgba(99,102,241,0.22)]
                  hover:border-indigo-500/25
                  motion-reduce:transition-none motion-reduce:hover:translate-y-0
                "
                data-worker-teaser="card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Accelerate the Grid
                    </div>
                    <div className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Workers execute independent simulation tasks in parallel,
                      dramatically reducing execution time and increasing system
                      throughput as the network grows.
                    </div>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-500/15 transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:shadow-[0_0_0_7px_rgba(99,102,241,0.10)] motion-reduce:transition-none motion-reduce:hover:scale-100">
                    <Cpu className="size-5" />
                  </div>
                </div>
              </div>

              <div
                className="
                  group rounded-[2.5rem]
                  border border-white/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-2xl
                  p-7 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)]
                  transition-[transform,box-shadow,border-color] duration-300 ease-out
                  hover:-translate-y-[3px]
                  hover:shadow-[0_30px_70px_-40px_rgba(99,102,241,0.22)]
                  hover:border-violet-500/25
                  motion-reduce:transition-none motion-reduce:hover:translate-y-0
                "
                data-worker-teaser="card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Earn Compute Credits
                    </div>
                    <div className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Active workers earn compute credits based on uptime and
                      completed tasks. Credits unlock higher iteration limits,
                      priority scheduling, and advanced analytics.
                    </div>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/15 transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:shadow-[0_0_0_7px_rgba(139,92,246,0.10)] motion-reduce:transition-none motion-reduce:hover:scale-100">
                    <Sparkles className="size-5" />
                  </div>
                </div>
              </div>

              <div
                className="
                  group rounded-[2.5rem]
                  border border-white/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-2xl
                  p-7 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)]
                  transition-[transform,box-shadow,border-color] duration-300 ease-out
                  hover:-translate-y-[3px]
                  hover:shadow-[0_30px_70px_-40px_rgba(99,102,241,0.22)]
                  hover:border-emerald-500/20
                  motion-reduce:transition-none motion-reduce:hover:translate-y-0
                "
                data-worker-teaser="card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Safe & Controlled
                    </div>
                    <div className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Worker execution is sandboxed with strict resource limits,
                      no file access, and full opt-out control at any time.
                    </div>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/15 transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:shadow-[0_0_0_7px_rgba(16,185,129,0.10)] motion-reduce:transition-none motion-reduce:hover:scale-100">
                    <ShieldCheck className="size-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center" data-worker-teaser="cta">
              <Button
                type="button"
                onClick={() => router.push("/become-worker")}
                className="
                  relative h-12 rounded-full px-8 text-white
                  bg-[linear-gradient(90deg,rgba(15,23,42,0.98),rgba(79,70,229,0.95),rgba(139,92,246,0.95),rgba(15,23,42,0.98))]
                  bg-[length:200%_100%]
                  [background-position:0%_50%]
                  shadow-[0_18px_60px_-35px_rgba(79,70,229,0.45)]
                  ring-1 ring-white/10
                  transition-[transform,box-shadow,background-position] duration-300 ease-out
                  hover:-translate-y-[2px]
                  hover:shadow-[0_28px_80px_-45px_rgba(99,102,241,0.55)]
                  hover:[background-position:100%_50%]
                  motion-reduce:transition-none motion-reduce:hover:translate-y-0
                  group/cta
                "
              >
                Join the Worker Network
                <span className="ml-2 inline-flex items-center text-white/70 transition-colors duration-300 group-hover/cta:text-white motion-reduce:transition-none">
                  →
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
