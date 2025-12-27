"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowLeft, FolderOpen, Play, Sparkles } from "lucide-react";
import { toast } from "sonner";

import type { ViewType } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getRoleFromToken } from "@/lib/authApi";
import { useAuth } from "@/hooks/useAuth";

type MySimulationsPageProps = {
  setCurrentView: (view: ViewType) => void;
};

const HINT_ROWS = [0, 1, 2] as const;

export function MySimulationsPage({ setCurrentView }: MySimulationsPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { token } = useAuth();
  const [isAllowed, setIsAllowed] = useState(false);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-sim-animate]");
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

  useEffect(() => {
    const tokenRole = token ? getRoleFromToken(token) : null;
    if (!token) {
      toast("Please sign in");
      setCurrentView("login");
      return;
    }
    if (tokenRole === "ADMIN") {
      setCurrentView("home");
      return;
    }
    setIsAllowed(true);
  }, [token, setCurrentView]);

  if (!isAllowed) return null;

  const handleComingSoon = () => {
    toast("Coming soon");
  };

  return (
    <div ref={rootRef} className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <button
          onClick={() => setCurrentView("home")}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-10"
          data-sim-animate
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="rounded-[3rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_24px_70px_-40px_rgba(15,23,42,0.35)] overflow-hidden">
          <div className="px-8 py-8 border-b border-white/60 bg-gradient-to-br from-white/85 via-white/60 to-white/75">
            <div
              className="flex items-start justify-between gap-6"
              data-sim-animate
            >
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                  My simulations
                </h1>
                <p className="text-slate-500 mt-2">
                  Track your Monte Carlo jobs, durations, and results.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleComingSoon}
                className="
                  h-11 rounded-full px-5
                  bg-white/70 border-white/60
                  shadow-[0_18px_55px_-44px_rgba(15,23,42,0.25)]
                  transition-all duration-200 ease-out
                  hover:-translate-y-[1px] hover:shadow-[0_24px_70px_-48px_rgba(99,102,241,0.28)]
                "
              >
                <Sparkles className="size-4 mr-2 text-indigo-600" />
                New simulation
              </Button>
            </div>
          </div>

          <div className="p-8">
            <div
              className="rounded-[2.75rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)] overflow-hidden"
              data-sim-animate
            >
              <div className="p-10 sm:p-12">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/35 via-violet-500/30 to-rose-500/25 blur-[18px] opacity-70" />
                    <div className="relative flex size-16 items-center justify-center rounded-full bg-white/70 ring-1 ring-white/60 shadow-[0_18px_50px_-30px_rgba(99,102,241,0.35)]">
                      <FolderOpen className="size-7 text-slate-900/80" />
                    </div>
                  </div>

                  <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
                    No simulations yet → Launch New Simulation
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 max-w-lg">
                    Launch a new Monte Carlo scenario to see it appear here.
                  </p>

                  <button
                    type="button"
                    onClick={handleComingSoon}
                    className="
                      group relative mt-7 inline-flex h-12 items-center justify-center gap-2
                      rounded-full px-7 text-sm font-semibold text-slate-900
                      bg-white/85 ring-1 ring-slate-900/10
                      shadow-[0_22px_60px_-44px_rgba(15,23,42,0.35)]
                      transition-all duration-200 ease-out
                      hover:-translate-y-[1px]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60
                    "
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/15 via-violet-500/15 to-rose-500/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <span className="absolute -inset-px rounded-full bg-gradient-to-r from-indigo-500/45 via-violet-500/35 to-rose-500/30 opacity-0 blur-[10px] transition-opacity duration-200 group-hover:opacity-70" />
                    <span className="relative inline-flex items-center gap-2">
                      <Play className="size-4 text-indigo-700" />
                      Launch New Simulation
                    </span>
                  </button>
                </div>

                <div className="mt-10">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Simulation history
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        Placeholder rows — backend wiring later
                      </div>
                    </div>
                    <div className="rounded-full border border-white/60 bg-white/70 backdrop-blur-2xl p-1 shadow-[0_18px_55px_-44px_rgba(15,23,42,0.25)]">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => toast("Export CSV coming soon")}
                          className="h-10 rounded-full bg-white/80 border-white/60"
                        >
                          Export CSV
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => toast("Export PDF coming soon")}
                          className="h-10 rounded-full bg-white/80 border-white/60"
                        >
                          Export PDF
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {HINT_ROWS.map((n) => (
                      <div
                        key={n}
                        className="rounded-[1.5rem] border border-white/60 bg-white/65 px-5 py-4"
                      >
                        <div className="grid grid-cols-4 gap-4 items-center">
                          <Skeleton className="h-4 rounded-full" />
                          <Skeleton className="h-4 rounded-full" />
                          <Skeleton className="h-4 rounded-full" />
                          <Skeleton className="h-4 rounded-full" />
                        </div>
                        <div className="mt-3 grid grid-cols-4 gap-4 items-center opacity-80">
                          <div className="text-[11px] text-slate-500">
                            Status
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Created
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Duration
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Result
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
