"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Activity,
  ArrowLeft,
  BookText,
  CheckCircle2,
  Clock,
  Coins,
  Info,
  Lock,
  ShieldCheck,
  Sigma,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import type { ViewType } from "@/app/page";
import { Button } from "@/components/ui/button";

type RewardRulesPageProps = {
  setCurrentView: (view: ViewType) => void;
};

type EarnCard = {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "indigo" | "violet" | "amber";
};

type TierPerk = { label: string; comingSoon?: boolean };

type TierCard = {
  name: "Bronze" | "Silver" | "Gold";
  range: string;
  perks: TierPerk[];
  emphasis: "low" | "medium" | "high";
};

export function RewardRulesPage({ setCurrentView }: RewardRulesPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const openEarnTooltipRef = useRef<HTMLDivElement | null>(null);
  const [openEarnTooltip, setOpenEarnTooltip] = useState<string | null>(null);
  const exampleRef = useRef<HTMLDivElement | null>(null);
  const [isExampleReady, setIsExampleReady] = useState(false);
  const [exampleSeed, setExampleSeed] = useState(0);
  const [exampleStage, setExampleStage] = useState(0);
  const [exampleValues, setExampleValues] = useState({
    uptime: 0,
    tasks: 0,
    base: 0,
    final: 0,
  });

  const earnCards = useMemo<EarnCard[]>(
    () => [
      {
        title: "Uptime reward",
        value: "+10 credits / hour online",
        icon: Clock,
        accent: "indigo",
      },
      {
        title: "Task completion",
        value: "+5 credits / completed task",
        icon: CheckCircle2,
        accent: "violet",
      },
      {
        title: "Weekly bonus",
        value: "Up to 2× multiplier",
        icon: Zap,
        accent: "amber",
      },
    ],
    []
  );

  const earnCardMeta = useMemo<
    Record<string, { helper: string; tooltip: [string, string, string] }>
  >(
    () => ({
      "Uptime reward": {
        helper: "Earned while your worker is connected and AVAILABLE.",
        tooltip: [
          "Counts when your worker is running and reachable.",
          "Doesn’t count while offline or disconnected.",
          "Why: reliability keeps the network fast.",
        ],
      },
      "Task completion": {
        helper: "Earned when a task finishes successfully and returns results.",
        tooltip: [
          "Counts when a task completes successfully.",
          "No credits for failed/cancelled/timeouts.",
          "Why: rewards real compute contribution.",
        ],
      },
      "Weekly bonus": {
        helper:
          "Boosts your weekly credits based on consistency and reliability.",
        tooltip: [
          "Multiplier applies to your weekly total.",
          "Typically based on uptime + success rate.",
          "Example: 500 credits with 1.5× → 750.",
        ],
      },
    }),
    []
  );

  const tiers = useMemo<TierCard[]>(
    () => [
      {
        name: "Bronze",
        range: "0–1,000",
        emphasis: "low",
        perks: [
          { label: "Basic analytics" },
          { label: "Standard queue" },
          { label: "Default iteration limits" },
        ],
      },
      {
        name: "Gold",
        range: "10,001+",
        emphasis: "high",
        perks: [
          { label: "Advanced analytics suite", comingSoon: true },
          { label: "Highest iteration limits" },
          { label: "Early access features" },
        ],
      },
      {
        name: "Silver",
        range: "1,001–10,000",
        emphasis: "medium",
        perks: [
          { label: "Priority queue access" },
          { label: "Export results (CSV/PDF)", comingSoon: true },
          { label: "Higher iteration limits" },
        ],
      },
    ],
    []
  );

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-animate]");
      gsap.fromTo(
        items,
        { opacity: 0, y: 14 },
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
    if (!openEarnTooltip) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenEarnTooltip(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openEarnTooltip]);

  useEffect(() => {
    if (!openEarnTooltip) return;

    const onPointerDown = (event: PointerEvent) => {
      const container = openEarnTooltipRef.current;
      const target = event.target as Node | null;
      if (!container || !target) return;
      if (!container.contains(target)) setOpenEarnTooltip(null);
    };

    window.addEventListener("pointerdown", onPointerDown, true);
    return () => window.removeEventListener("pointerdown", onPointerDown, true);
  }, [openEarnTooltip]);

  useEffect(() => {
    const el = exampleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setIsExampleReady(true);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isExampleReady) return;

    let rafIds: number[] = [];
    let timeoutIds: number[] = [];

    const animateKey = (
      key: "uptime" | "tasks" | "base" | "final",
      target: number,
      durationMs: number
    ) => {
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.round(target * eased);
        setExampleValues((prev) => ({ ...prev, [key]: value }));
        if (t < 1) rafIds.push(requestAnimationFrame(tick));
      };

      rafIds.push(requestAnimationFrame(tick));
    };

    setExampleValues({ uptime: 0, tasks: 0, base: 0, final: 0 });
    setExampleStage(0);

    timeoutIds.push(
      window.setTimeout(() => {
        setExampleStage(1);
        animateKey("uptime", 30, 520);
      }, 120)
    );

    timeoutIds.push(
      window.setTimeout(() => {
        setExampleStage(2);
        animateKey("tasks", 60, 520);
      }, 920)
    );

    timeoutIds.push(
      window.setTimeout(() => {
        setExampleStage(3);
        animateKey("base", 90, 420);
      }, 1680)
    );

    timeoutIds.push(
      window.setTimeout(() => {
        setExampleStage(4);
        animateKey("final", 135, 560);
      }, 2260)
    );

    return () => {
      rafIds.forEach((id) => cancelAnimationFrame(id));
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [isExampleReady, exampleSeed]);

  const handleBack = () => {
    setCurrentView("become_worker");
  };

  const handleGetStarted = () => {
    setCurrentView("become_worker");
    window.setTimeout(() => {
      const target = document.querySelector("#getting-started");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.scrollBy({ top: -80, left: 0, behavior: "auto" });
        return;
      }
      toast("Getting started — coming soon");
    }, 120);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.10),transparent_55%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.10),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.30] [background-image:linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:44px_44px]" />

        <div
          ref={rootRef}
          className="relative mx-auto max-w-6xl px-6 pb-28 pt-24"
        >
          <div className="flex flex-col gap-8" data-animate>
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-700 text-sm font-medium">
                  <Zap className="size-4" />
                  <span>Compute Credits Policy</span>
                </div>
                <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                  Reward <span className="text-gradient-flow">Rules</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
                  Compute Credits are internal points earned by contributing
                  compute — not cash, not crypto.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    { label: "Validated rewards", icon: CheckCircle2 },
                    { label: "No transfers", icon: Lock },
                    { label: "Safety-first runtime", icon: ShieldCheck },
                  ].map((badge) => (
                    <div
                      key={badge.label}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 text-slate-700 ring-1 ring-white/60 shadow-sm backdrop-blur-2xl"
                    >
                      <badge.icon className="size-4 text-indigo-700" />
                      <span className="text-sm font-medium">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-indigo-500/20 via-violet-500/15 to-rose-500/10 blur-[40px] opacity-60" />
                <div className="relative rounded-[3rem] border border-white/60 bg-white/70 backdrop-blur-2xl p-8 shadow-[0_40px_100px_-50px_rgba(15,23,42,0.35)]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex size-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg">
                      <BookText className="size-6" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-slate-900">
                        Credits Ledger
                      </div>
                      <div className="text-sm text-slate-500">
                        Policy preview (UI-only)
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {earnCards.map((card) => (
                      <div
                        key={card.title}
                        className="rounded-[1.75rem] border border-white/60 bg-white/75 px-5 py-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="text-xs text-slate-500">
                              {card.title}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-slate-900">
                              {card.value}
                            </div>
                          </div>
                          <div className="flex size-10 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-500/15">
                            <card.icon className="size-4" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section
            className="mt-10 rounded-[3rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_30px_90px_-50px_rgba(15,23,42,0.35)] premium-card"
            data-animate
          >
            <div className="px-8 py-8 border-b border-white/60 bg-gradient-to-br from-white/90 via-white/65 to-white/80">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                    How credits are earned
                  </h2>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    Credits are internal points (not money). Earn them by
                    keeping your worker online and completing tasks.
                  </p>
                </div>
                <div className="flex size-12 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-500/15">
                  <Coins className="size-5" />
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid gap-4 md:grid-cols-3">
                {earnCards.map((card) => {
                  const accent =
                    card.accent === "indigo"
                      ? "group-hover:border-indigo-500/35 group-hover:shadow-[0_28px_80px_-60px_rgba(99,102,241,0.60)]"
                      : card.accent === "violet"
                      ? "group-hover:border-violet-500/35 group-hover:shadow-[0_28px_80px_-60px_rgba(139,92,246,0.60)]"
                      : "group-hover:border-amber-500/35 group-hover:shadow-[0_28px_80px_-60px_rgba(245,158,11,0.55)]";

                  const iconRing =
                    card.accent === "indigo"
                      ? "bg-indigo-500/10 text-indigo-700 ring-indigo-500/15"
                      : card.accent === "violet"
                      ? "bg-violet-500/10 text-violet-700 ring-violet-500/15"
                      : "bg-amber-500/10 text-amber-700 ring-amber-500/15";

                  const tooltipId = `earn-credits-${card.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}-tooltip`;
                  const isTooltipOpen = openEarnTooltip === card.title;
                  const meta = earnCardMeta[card.title];

                  return (
                    <div key={card.title} className="group relative">
                      <div
                        className={[
                          "relative rounded-[2.5rem] border border-white/60 bg-white/70 backdrop-blur-2xl",
                          "shadow-[0_22px_70px_-55px_rgba(15,23,42,0.45)]",
                          "p-7 transition-all duration-300",
                          "hover:-translate-y-1.5 hover:shadow-[0_28px_90px_-58px_rgba(15,23,42,0.55)]",
                          accent,
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-500">
                              {card.title}
                            </div>
                            <div className="mt-2 text-base font-semibold text-slate-900">
                              {card.value}
                            </div>
                            <div className="mt-2 text-xs text-slate-600 leading-relaxed">
                              {meta?.helper}
                            </div>
                          </div>
                          <div
                            className={[
                              "flex size-11 items-center justify-center rounded-full ring-1",
                              iconRing,
                            ].join(" ")}
                          >
                            <card.icon className="size-5" />
                          </div>
                        </div>

                        <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                          <div
                            className="relative inline-flex"
                            onMouseEnter={() => setOpenEarnTooltip(card.title)}
                            onMouseLeave={() =>
                              setOpenEarnTooltip((current) =>
                                current === card.title ? null : current
                              )
                            }
                            ref={(node) => {
                              if (isTooltipOpen)
                                openEarnTooltipRef.current = node;
                            }}
                          >
                            <button
                              type="button"
                              aria-expanded={isTooltipOpen}
                              aria-controls={tooltipId}
                              onClick={() =>
                                setOpenEarnTooltip((current) =>
                                  current === card.title ? null : card.title
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-full px-2 py-1 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
                            >
                              <Info className="size-3.5" />
                              <span className="underline underline-offset-4 decoration-slate-200">
                                Details
                              </span>
                            </button>

                            <div
                              id={tooltipId}
                              role="tooltip"
                              className={[
                                "absolute left-0 top-full z-20 mt-2 w-[min(320px,calc(100vw-3.5rem))]",
                                "rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-xs text-slate-700",
                                "shadow-[0_25px_70px_-55px_rgba(15,23,42,0.55)] backdrop-blur-2xl",
                                "transition-[opacity,transform] duration-150 ease-out origin-top-left",
                                isTooltipOpen
                                  ? "opacity-100 translate-y-0 scale-100"
                                  : "pointer-events-none opacity-0 translate-y-1.5 scale-[0.98]",
                              ].join(" ")}
                            >
                              <ul className="list-disc pl-4 space-y-1.5">
                                {meta?.tooltip?.map((line) => (
                                  <li key={line}>{line}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                ref={exampleRef}
                role="button"
                tabIndex={0}
                onClick={() => setExampleSeed((v) => v + 1)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setExampleSeed((v) => v + 1);
                  }
                }}
                className="group mt-6 rounded-[3rem] border border-white/60 bg-white/70 backdrop-blur-2xl px-6 py-6 shadow-[0_22px_70px_-55px_rgba(15,23,42,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 md:px-7 md:py-7"
                aria-label="Quick example: click to replay the credit calculator demo"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1 text-center">
                    <div className="text-lg font-semibold tracking-tight text-slate-900">
                      Quick example
                    </div>
                    <div className="text-sm text-slate-600">
                      See exactly how credits are computed
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div
                      className={[
                        "group/step relative overflow-hidden rounded-[2.25rem] border bg-white/75 backdrop-blur-2xl p-5 shadow-sm",
                        "transition-[transform,border-color,box-shadow] duration-300 ease-out",
                        "hover:-translate-y-0.5 hover:shadow-[0_18px_60px_-55px_rgba(15,23,42,0.40)]",
                        exampleStage === 1
                          ? "border-indigo-500/40 ring-1 ring-indigo-500/25 shadow-[0_18px_70px_-60px_rgba(99,102,241,0.45)]"
                          : exampleStage > 1
                          ? "border-indigo-500/25"
                          : "border-white/60",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-white/0 to-white/0",
                          "opacity-60 transition-opacity duration-300",
                          exampleStage >= 1 ? "opacity-100" : "opacity-55",
                        ].join(" ")}
                      />
                      <div className="relative flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="relative flex size-10 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-500/15 transition-shadow duration-300 group-hover/step:shadow-[0_0_0_6px_rgba(99,102,241,0.10)]">
                            <Clock className="size-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center rounded-full border border-white/60 bg-white/70 px-2.5 py-1 text-[10px] font-semibold text-slate-700">
                                Step A
                              </span>
                              <span className="text-sm font-semibold text-slate-900">
                                Uptime
                              </span>
                            </div>
                            <div className="mt-2 text-xs text-slate-600">
                              3 hours × 10 credits/hour
                            </div>
                          </div>
                        </div>

                        <span
                          className={[
                            "inline-flex min-w-[4.75rem] items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold tabular-nums shadow-sm",
                            "bg-indigo-500/10 text-indigo-800 border-indigo-500/20",
                            "transition-[opacity,transform] duration-300 ease-out",
                            exampleStage >= 1
                              ? "opacity-100 translate-y-0 scale-100 delay-150"
                              : "opacity-0 translate-y-1 scale-[0.98]",
                          ].join(" ")}
                        >
                          = {exampleValues.uptime}
                        </span>
                      </div>
                    </div>

                    <div
                      className={[
                        "group/step relative overflow-hidden rounded-[2.25rem] border bg-white/75 backdrop-blur-2xl p-5 shadow-sm",
                        "transition-[transform,border-color,box-shadow] duration-300 ease-out",
                        "hover:-translate-y-0.5 hover:shadow-[0_18px_60px_-55px_rgba(15,23,42,0.40)]",
                        exampleStage === 2
                          ? "border-violet-500/40 ring-1 ring-violet-500/25 shadow-[0_18px_70px_-60px_rgba(139,92,246,0.45)]"
                          : exampleStage > 2
                          ? "border-violet-500/25"
                          : "border-white/60",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/10 via-white/0 to-white/0",
                          "opacity-60 transition-opacity duration-300",
                          exampleStage >= 2 ? "opacity-100" : "opacity-55",
                        ].join(" ")}
                      />
                      <div className="relative flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="relative flex size-10 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/15 transition-shadow duration-300 group-hover/step:shadow-[0_0_0_6px_rgba(139,92,246,0.10)]">
                            <CheckCircle2 className="size-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center rounded-full border border-white/60 bg-white/70 px-2.5 py-1 text-[10px] font-semibold text-slate-700">
                                Step B
                              </span>
                              <span className="text-sm font-semibold text-slate-900">
                                Tasks completed
                              </span>
                            </div>
                            <div className="mt-2 text-xs text-slate-600">
                              12 tasks × 5 credits/task
                            </div>
                          </div>
                        </div>

                        <span
                          className={[
                            "inline-flex min-w-[4.75rem] items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold tabular-nums shadow-sm",
                            "bg-violet-500/10 text-violet-800 border-violet-500/20",
                            "transition-[opacity,transform] duration-300 ease-out",
                            exampleStage >= 2
                              ? "opacity-100 translate-y-0 scale-100 delay-150"
                              : "opacity-0 translate-y-1 scale-[0.98]",
                          ].join(" ")}
                        >
                          = {exampleValues.tasks}
                        </span>
                      </div>
                    </div>

                    <div
                      className={[
                        "group/step relative overflow-hidden rounded-[2.25rem] border bg-white/75 backdrop-blur-2xl p-5 shadow-sm",
                        "transition-[transform,border-color,box-shadow] duration-300 ease-out",
                        "hover:-translate-y-0.5 hover:shadow-[0_18px_60px_-55px_rgba(15,23,42,0.40)]",
                        exampleStage === 3
                          ? "border-slate-400/40 ring-1 ring-slate-900/10 shadow-[0_18px_70px_-60px_rgba(15,23,42,0.25)]"
                          : exampleStage > 3
                          ? "border-slate-300/35"
                          : "border-white/60",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/5 via-white/0 to-white/0",
                          "opacity-60 transition-opacity duration-300",
                          exampleStage >= 3 ? "opacity-100" : "opacity-55",
                        ].join(" ")}
                      />
                      <div className="relative flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="relative flex size-10 items-center justify-center rounded-2xl bg-slate-900/5 text-slate-700 ring-1 ring-slate-900/10 transition-shadow duration-300 group-hover/step:shadow-[0_0_0_6px_rgba(15,23,42,0.06)]">
                            <Sigma className="size-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center rounded-full border border-white/60 bg-white/70 px-2.5 py-1 text-[10px] font-semibold text-slate-700">
                                Step C
                              </span>
                              <span className="text-sm font-semibold text-slate-900">
                                Base credits
                              </span>
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                              <span className="rounded-full border border-white/70 bg-white/80 px-2 py-0.5 font-semibold text-slate-700 tabular-nums">
                                30
                              </span>
                              <span className="text-slate-400">+</span>
                              <span className="rounded-full border border-white/70 bg-white/80 px-2 py-0.5 font-semibold text-slate-700 tabular-nums">
                                60
                              </span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={[
                            "inline-flex min-w-[9.5rem] items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold tabular-nums shadow-sm",
                            "bg-slate-900/5 text-slate-800 border-slate-900/10",
                            "transition-[opacity,transform] duration-300 ease-out",
                            exampleStage >= 3
                              ? "opacity-100 translate-y-0 scale-100 delay-150"
                              : "opacity-0 translate-y-1 scale-[0.98]",
                          ].join(" ")}
                        >
                          = {exampleValues.base} Base credits
                        </span>
                      </div>
                    </div>

                    <div
                      className={[
                        "relative overflow-hidden rounded-[2.5rem] border bg-white/75 backdrop-blur-2xl p-6 shadow-sm md:col-span-3",
                        "transition-[transform,border-color,box-shadow] duration-300 ease-out",
                        "hover:-translate-y-0.5 hover:shadow-[0_22px_70px_-60px_rgba(15,23,42,0.42)]",
                        exampleStage === 4
                          ? "border-rose-500/30 ring-1 ring-rose-500/15 shadow-[0_26px_90px_-70px_rgba(244,63,94,0.35)]"
                          : "border-white/60",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/10 via-white/0 to-amber-500/8",
                          "opacity-60 transition-opacity duration-300",
                          exampleStage >= 4 ? "opacity-100" : "opacity-55",
                        ].join(" ")}
                      />

                      <div
                        className={[
                          "pointer-events-none absolute -inset-10 rounded-[3rem] bg-rose-500/10 blur-[34px]",
                          "opacity-0 transition-opacity duration-300",
                          exampleStage === 4 ? "opacity-100 animate-pulse" : "",
                        ].join(" ")}
                      />

                      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-3">
                            <div className="relative flex size-11 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/15">
                              <Sparkles className="size-5" />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <div className="text-sm font-semibold text-slate-900">
                                  Weekly bonus multiplier
                                </div>
                                <div className="group/tooltip relative">
                                  <button
                                    type="button"
                                    aria-label="Weekly bonus multiplier details"
                                    onClick={(event) => event.stopPropagation()}
                                    onKeyDown={(event) => {
                                      if (
                                        event.key === "Enter" ||
                                        event.key === " "
                                      ) {
                                        event.stopPropagation();
                                      }
                                    }}
                                    className="inline-flex size-7 items-center justify-center rounded-full border border-white/70 bg-white/70 text-slate-600 shadow-sm transition-colors hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40"
                                  >
                                    <Info className="size-3.5" />
                                  </button>
                                  <div
                                    role="tooltip"
                                    className={[
                                      "pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-[min(340px,calc(100vw-3.5rem))] -translate-x-1/2",
                                      "rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-xs text-slate-700",
                                      "shadow-[0_25px_70px_-55px_rgba(15,23,42,0.55)] backdrop-blur-2xl",
                                      "opacity-0 translate-y-1.5 scale-[0.98] transition-[opacity,transform] duration-150 ease-out",
                                      "group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-hover/tooltip:scale-100",
                                      "group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:translate-y-0 group-focus-within/tooltip:scale-100",
                                    ].join(" ")}
                                  >
                                    Bonus depends on reliability (uptime +
                                    completed tasks). Example uses 1.5×.
                                  </div>
                                </div>
                              </div>

                              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                                <span className="font-medium text-slate-700">
                                  Base credits ×
                                </span>
                                <span className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-700 tabular-nums shadow-sm">
                                  1.5×
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-start md:justify-end">
                          <span
                            className={[
                              "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold tabular-nums",
                              "bg-gradient-to-r from-rose-500/15 via-amber-500/10 to-indigo-500/10 text-slate-900 border-rose-500/20",
                              "shadow-[0_16px_60px_-55px_rgba(244,63,94,0.55)]",
                              "transition-[opacity,transform] duration-300 ease-out",
                              exampleStage >= 4
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 translate-y-1 scale-[0.98]",
                            ].join(" ")}
                          >
                            = {exampleValues.final} Final credits
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-[11px] font-medium text-slate-500">
                    Tap to replay
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="mt-12 rounded-[3rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_30px_90px_-50px_rgba(15,23,42,0.35)] overflow-hidden premium-card"
            data-animate
          >
            <div className="px-8 py-8 border-b border-white/60 bg-gradient-to-br from-white/90 via-white/65 to-white/80">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                    Tiers & unlocks
                  </h2>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    Credits unlock higher throughput and premium tooling.
                  </p>
                </div>
                <div className="flex size-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/15">
                  <Activity className="size-5" />
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col items-stretch justify-center gap-7 md:flex-row md:items-end md:gap-8">
                {tiers.map((tier) => {
                  const size =
                    tier.emphasis === "high"
                      ? "md:scale-[1.10] md:z-10 md:min-w-[320px]"
                      : tier.emphasis === "medium"
                      ? "md:min-w-[280px]"
                      : "md:min-w-[260px]";
                  const borderSpin =
                    tier.name === "Gold"
                      ? "bg-[conic-gradient(from_180deg,rgba(245,158,11,0.90),rgba(250,204,21,0.80),rgba(251,191,36,0.90),rgba(245,158,11,0.90))] animate-[spin_12s_linear_infinite]"
                      : tier.name === "Silver"
                      ? "bg-[conic-gradient(from_180deg,rgba(148,163,184,0.90),rgba(241,245,249,0.85),rgba(100,116,139,0.90),rgba(148,163,184,0.90))] animate-[spin_16s_linear_infinite]"
                      : "bg-[conic-gradient(from_180deg,rgba(180,83,9,0.90),rgba(234,88,12,0.78),rgba(217,119,6,0.90),rgba(180,83,9,0.90))] animate-[spin_14s_linear_infinite]";

                  const surface =
                    tier.name === "Gold"
                      ? "border-amber-500/20 bg-gradient-to-br from-amber-500/12 via-white/82 to-yellow-500/14 shadow-[0_0_55px_-20px_rgba(245,158,11,0.55)]"
                      : tier.name === "Silver"
                      ? "border-slate-400/20 bg-gradient-to-br from-slate-900/3 via-white/82 to-zinc-900/5 shadow-[0_0_55px_-25px_rgba(148,163,184,0.60)]"
                      : "border-orange-700/20 bg-gradient-to-br from-orange-500/12 via-white/82 to-amber-700/14 shadow-[0_0_55px_-25px_rgba(180,83,9,0.55)]";

                  const swirl =
                    tier.name === "Gold"
                      ? "bg-[conic-gradient(from_180deg,rgba(245,158,11,0.55),rgba(250,204,21,0.35),rgba(245,158,11,0.55))] animate-[spin_14s_linear_infinite]"
                      : tier.name === "Silver"
                      ? "bg-[conic-gradient(from_180deg,rgba(148,163,184,0.55),rgba(244,244,245,0.55),rgba(100,116,139,0.55))] animate-[spin_18s_linear_infinite]"
                      : "bg-[conic-gradient(from_180deg,rgba(180,83,9,0.55),rgba(234,88,12,0.35),rgba(180,83,9,0.55))] animate-[spin_16s_linear_infinite]";

                  const badge =
                    tier.name === "Gold"
                      ? "bg-gradient-to-r from-amber-600 to-yellow-500 text-white"
                      : tier.name === "Silver"
                      ? "bg-gradient-to-r from-slate-700 to-slate-900 text-white"
                      : "bg-gradient-to-r from-amber-800 to-orange-700 text-white";

                  const tierIcon =
                    tier.name === "Gold"
                      ? "bg-amber-500/10 text-amber-800 ring-1 ring-amber-500/18"
                      : tier.name === "Silver"
                      ? "bg-slate-500/10 text-slate-700 ring-1 ring-slate-500/15"
                      : "bg-orange-500/10 text-orange-800 ring-1 ring-orange-500/18";

                  const highlightPill =
                    tier.name === "Gold"
                      ? "border-amber-500/25 bg-amber-500/10 text-amber-800"
                      : "border-indigo-500/20 bg-indigo-500/10 text-indigo-700";

                  return (
                    <div key={tier.name} className={size}>
                      <div className="group relative transition-transform duration-300 hover:-translate-y-2">
                        <div className="relative rounded-[2.75rem] p-[1.25px] overflow-hidden">
                          <div
                            className={[
                              "pointer-events-none absolute -inset-10 opacity-90",
                              borderSpin,
                            ].join(" ")}
                          />
                          <div
                            className={[
                              "pointer-events-none absolute -inset-20 opacity-65 blur-[18px] transition-opacity duration-300 group-hover:opacity-95",
                              swirl,
                            ].join(" ")}
                          />
                          <div
                            className={[
                              "relative rounded-[2.75rem] border backdrop-blur-2xl bg-white/70",
                              "shadow-[0_25px_80px_-60px_rgba(15,23,42,0.40)] transition-shadow duration-300",
                              "group-hover:shadow-[0_34px_95px_-70px_rgba(15,23,42,0.45)]",
                              surface,
                            ].join(" ")}
                          >
                            <div className="p-8">
                              <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-3">
                                    <span
                                      className={[
                                        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold",
                                        badge,
                                      ].join(" ")}
                                    >
                                      {tier.name}
                                    </span>
                                    {tier.name === "Gold" && (
                                      <span
                                        className={[
                                          "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold",
                                          highlightPill,
                                        ].join(" ")}
                                      >
                                        <Sparkles className="size-3" />
                                        Highlighted
                                      </span>
                                    )}
                                  </div>
                                  <div className="mt-3 text-sm text-slate-600">
                                    Credits range
                                  </div>
                                  <div className="mt-1 text-lg font-semibold text-slate-900">
                                    {tier.range}
                                  </div>
                                </div>

                                <div
                                  className={[
                                    "flex size-11 items-center justify-center rounded-full shadow-sm",
                                    tierIcon,
                                  ].join(" ")}
                                >
                                  <Activity className="size-5" />
                                </div>
                              </div>

                              <ul className="mt-6 space-y-3">
                                {tier.perks.map((perk) => (
                                  <li
                                    key={perk.label}
                                    className="flex items-start gap-3 text-sm text-slate-700"
                                  >
                                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                                    <span className="min-w-0">
                                      {perk.label}
                                      {perk.comingSoon && (
                                        <span className="ml-2 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                                          Coming soon
                                        </span>
                                      )}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="mt-12" data-animate>
            <div className="rounded-[3rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_30px_90px_-50px_rgba(15,23,42,0.35)] overflow-hidden">
              <div className="px-9 py-8 border-b border-white/60 bg-gradient-to-br from-white/90 via-white/65 to-white/80">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                      Fairness & anti-abuse rules
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Official policy tone for predictable rewards.
                    </p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-slate-900/10 text-slate-700 ring-1 ring-slate-900/10">
                    <Lock className="size-5" />
                  </div>
                </div>
              </div>

              <div className="px-9 py-8">
                <ul className="space-y-3">
                  {[
                    "Credits granted only after validation",
                    "No credits for failed/aborted tasks",
                    "Repeated disconnect mid-task may reduce rewards (placeholder)",
                    "Suspicious behavior → credits reset + worker blocked (placeholder)",
                    "No transfers between accounts",
                  ].map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <div className="mt-1 size-2 rounded-full bg-slate-400" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-12" data-animate>
            <div className="rounded-[3rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_30px_90px_-50px_rgba(15,23,42,0.35)] overflow-hidden premium-card">
              <div className="px-9 py-8 border-b border-white/60 bg-gradient-to-br from-white/90 via-white/65 to-white/80">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                      Privacy & safety
                    </h2>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      Built to be safe by default — and easy to stop.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-sm backdrop-blur-2xl">
                    <ShieldCheck className="size-3.5 text-emerald-600" />
                    Safety-first
                  </div>
                </div>
              </div>

              <div className="px-9 py-8">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Sandboxed process",
                      desc: "Runs isolated from your personal environment.",
                    },
                    {
                      icon: Lock,
                      title: "No file access",
                      desc: "Worker processes cannot read or write local files.",
                    },
                    {
                      icon: Activity,
                      title: "Stop anytime",
                      desc: "Pause or disconnect whenever you want.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[2.5rem] border border-white/60 bg-white/75 backdrop-blur-2xl shadow-[0_22px_70px_-55px_rgba(15,23,42,0.40)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300/70"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-900">
                            {item.title}
                          </div>
                          <div className="mt-2 text-sm text-slate-600">
                            {item.desc}
                          </div>
                        </div>
                        <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/15">
                          <item.icon className="size-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[2.25rem] border border-white/60 bg-white/75 backdrop-blur-2xl px-7 py-5 text-sm text-slate-600 shadow-[0_18px_60px_-50px_rgba(15,23,42,0.35)]">
                  We only collect minimal telemetry: uptime, task count,
                  performance.
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/60 bg-white/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBack}
                className="h-11 px-5 rounded-full text-slate-700 hover:bg-white/70 transition-all duration-300 hover:-translate-y-0.5"
              >
                <ArrowLeft className="size-4 mr-2" />
                Back
              </Button>
            </div>

            <Button
              type="button"
              onClick={handleGetStarted}
              className="h-11 px-8 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
