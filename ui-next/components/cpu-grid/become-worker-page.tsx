"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowLeft, Cpu, Server, Shield, Sparkles } from "lucide-react";
import { toast } from "sonner";

import type { ViewType } from "@/app/page";
import { Button } from "@/components/ui/button";

type BecomeWorkerPageProps = {
  setCurrentView: (view: ViewType) => void;
};

export function BecomeWorkerPage({ setCurrentView }: BecomeWorkerPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-worker-animate]");
      gsap.fromTo(
        items,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.06,
          clearProps: "transform",
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <button
          type="button"
          onClick={() => setCurrentView("home")}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-10"
          data-worker-animate
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-[3rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_30px_90px_-50px_rgba(15,23,42,0.42)] overflow-hidden">
            <div className="px-8 py-8 border-b border-white/60 bg-gradient-to-br from-white/90 via-white/65 to-white/80">
              <div
                className="flex items-start justify-between gap-6"
                data-worker-animate
              >
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                    Join the Worker Network
                  </h1>
                  <p className="text-slate-500 mt-2 max-w-2xl">
                    CPU Grid uses a master–worker architecture: the master
                    schedules Monte Carlo batches, and workers execute tasks and
                    stream results back for aggregation.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/30 via-violet-500/25 to-rose-500/20 blur-[18px] opacity-80" />
                  <div className="relative flex size-12 items-center justify-center rounded-full bg-white/70 ring-1 ring-white/60 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.25)]">
                    <Server className="size-5 text-slate-900/75" />
                  </div>
                </div>
              </div>

              <div
                className="mt-7 rounded-[2.5rem] border border-white/60 bg-white/70 backdrop-blur-2xl p-5 shadow-[0_18px_55px_-42px_rgba(15,23,42,0.22)]"
                data-worker-animate
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Worker node contribution
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      UI placeholder — setup guide and registration arrive with
                      backend wiring.
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      type="button"
                      onClick={() => toast("Setup instructions coming soon")}
                      className="h-11 rounded-full bg-slate-900 hover:bg-slate-800 text-white px-6"
                    >
                      Get setup (soon)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => toast("Worker download coming soon")}
                      className="
                        h-11 rounded-full px-6
                        bg-white/70 border border-indigo-500/20
                        shadow-[0_14px_45px_-34px_rgba(15,23,42,0.25)]
                        transition-all duration-200 ease-out
                        hover:-translate-y-[1px]
                        hover:shadow-[0_22px_70px_-44px_rgba(99,102,241,0.40)]
                      "
                    >
                      Download worker (soon)
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid gap-4 md:grid-cols-3" data-worker-animate>
                <div className="rounded-[2.25rem] border border-white/60 bg-white/70 backdrop-blur-2xl p-7 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Master
                      </div>
                      <div className="mt-2 text-xs text-slate-600 leading-relaxed">
                        Orchestrates job queues, assigns shards, and tracks
                        worker health.
                      </div>
                    </div>
                    <div className="flex size-10 items-center justify-center rounded-full bg-slate-900/5 ring-1 ring-slate-900/10">
                      <Cpu className="size-5 text-slate-700" />
                    </div>
                  </div>
                </div>

                <div className="rounded-[2.25rem] border border-white/60 bg-white/70 backdrop-blur-2xl p-7 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Worker
                      </div>
                      <div className="mt-2 text-xs text-slate-600 leading-relaxed">
                        Executes simulation tasks, reports progress, and returns
                        results for aggregation.
                      </div>
                    </div>
                    <div className="flex size-10 items-center justify-center rounded-full bg-indigo-500/10 ring-1 ring-indigo-500/15">
                      <Server className="size-5 text-indigo-700" />
                    </div>
                  </div>
                </div>

                <div className="rounded-[2.25rem] border border-white/60 bg-white/70 backdrop-blur-2xl p-7 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Security
                      </div>
                      <div className="mt-2 text-xs text-slate-600 leading-relaxed">
                        Authenticated registration, least-privilege roles, and
                        auditable worker events.
                      </div>
                    </div>
                    <div className="flex size-10 items-center justify-center rounded-full bg-amber-500/10 ring-1 ring-amber-500/15">
                      <Shield className="size-5 text-amber-700" />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="mt-6 rounded-[2.75rem] border border-white/60 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-rose-500/10 p-8 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)]"
                data-worker-animate
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Sparkles className="size-4 text-indigo-700" />
                      Why it matters
                    </div>
                    <div className="mt-2 text-sm text-slate-600 max-w-2xl">
                      Distributed workers convert idle compute into throughput:
                      more nodes means faster Monte Carlo convergence and larger
                      scenario sweeps.
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => toast("Worker requirements coming soon")}
                    className="h-11 rounded-full bg-white/70 border-white/60"
                  >
                    Requirements (soon)
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2.5rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_26px_80px_-55px_rgba(15,23,42,0.40)] overflow-hidden">
              <div className="px-7 py-6 border-b border-white/60 bg-gradient-to-br from-white/85 via-white/60 to-white/75">
                <div className="flex items-start justify-between gap-4" data-worker-animate>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Node status
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Placeholder telemetry cards
                    </p>
                  </div>
                  <div className="flex size-11 items-center justify-center rounded-full bg-slate-900 text-indigo-200 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.25)]">
                    <Cpu className="size-5" />
                  </div>
                </div>
              </div>

              <div className="p-7 space-y-4" data-worker-animate>
                <div className="rounded-[1.75rem] border border-white/60 bg-white/75 px-6 py-5">
                  <div className="text-xs text-slate-500">Registration</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    —
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/60 bg-white/75 px-6 py-5">
                  <div className="text-xs text-slate-500">Heartbeat</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    —
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/60 bg-white/75 px-6 py-5">
                  <div className="text-xs text-slate-500">Jobs processed</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    —
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_26px_80px_-55px_rgba(15,23,42,0.40)] p-7">
              <div className="text-sm font-semibold text-slate-900" data-worker-animate>
                Next
              </div>
              <div className="mt-4 grid gap-3" data-worker-animate>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => toast("Worker identity (soon)")}
                  className="h-11 rounded-full bg-white/70 border-white/60 justify-start"
                >
                  Worker identity (soon)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => toast("Connectivity checks (soon)")}
                  className="h-11 rounded-full bg-white/70 border-white/60 justify-start"
                >
                  Connectivity checks (soon)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

