"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Cpu, ShieldCheck, Sparkles } from "lucide-react";

import type { ViewType } from "@/app/page";
import { Button } from "@/components/ui/button";

type WorkerTeaserProps = {
  setCurrentView: (view: ViewType) => void;
};

export function WorkerTeaser({ setCurrentView }: WorkerTeaserProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-worker-teaser]");
      gsap.set(items, { opacity: 0, y: 14 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        const items = gsap.utils.toArray<HTMLElement>("[data-worker-teaser]");
        gsap.fromTo(
          items,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.07,
            clearProps: "transform",
          }
        );
        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="relative z-10 bg-white">
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div
          className="
            rounded-[3rem]
            border border-white/60 bg-white/70 backdrop-blur-2xl
            shadow-[0_30px_90px_-50px_rgba(15,23,42,0.42)]
            overflow-hidden
            transition-all duration-500
            hover:shadow-[0_40px_100px_-50px_rgba(99,102,241,0.25)]
          "
          data-worker-teaser
        >
          <div className="px-10 py-10 bg-gradient-to-br from-white/90 via-white/65 to-white/80 border-b border-white/60">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                  Powering CPU Grid Together
                </h2>
                <p className="mt-2 text-slate-500">
                  Donate compute. Accelerate simulations. Earn Compute Credits.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentView("become_worker")}
                className="
                  h-11 rounded-full px-6
                  bg-white/70 border border-indigo-500/20
                  shadow-[0_14px_45px_-34px_rgba(15,23,42,0.25)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-[2px]
                  hover:shadow-[0_22px_70px_-44px_rgba(99,102,241,0.35)]
                  hover:border-indigo-500/40
                  group
                "
              >
                <span className="group-hover:text-indigo-600 transition-colors">
                  See how to become a worker
                </span>
              </Button>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Accelerate the Grid",
                  desc: "Workers execute simulation chunks in parallel, reducing execution time.",
                  icon: Cpu,
                  color: "indigo",
                },
                {
                  title: "Earn Compute Credits",
                  desc: "Credits unlock premium capabilities like higher iterations and priority runs (later).",
                  icon: Sparkles,
                  color: "violet",
                },
                {
                  title: "Safe & Controlled",
                  desc: "Resource limits, no file access, opt out anytime.",
                  icon: ShieldCheck,
                  color: "emerald",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="
                    group rounded-[2.5rem]
                    border border-white/60 bg-white/70 backdrop-blur-2xl
                    p-7 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-[3px]
                    hover:shadow-[0_30px_70px_-40px_rgba(99,102,241,0.25)]
                  "
                  data-worker-teaser
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold text-slate-900">
                        {item.title}
                      </div>
                      <div className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                    <div
                      className={`flex size-12 items-center justify-center rounded-full bg-${item.color}-500/10 text-${item.color}-700 ring-1 ring-${item.color}-500/15 transition-all duration-300 group-hover:scale-110`}
                    >
                      <item.icon className="size-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center" data-worker-teaser>
              <Button
                type="button"
                onClick={() => setCurrentView("become_worker")}
                className="
                  h-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white px-8
                  transition-all duration-300
                  hover:-translate-y-[2px]
                  hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.5)]
                "
              >
                Join the Worker Network
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
