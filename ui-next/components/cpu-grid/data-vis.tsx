"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Activity,
  BarChart3,
  Gauge,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type SimulationState = "RUNNING" | "AGGREGATING" | "COMPLETED";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatCompactNumber(value: number, decimals = 1) {
  if (value >= 1_000_000_000)
    return `${(value / 1_000_000_000).toFixed(decimals)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(decimals)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(decimals)}K`;
  return value.toFixed(0);
}

function useAnimatedNumber(target: number, options?: { durationMs?: number }) {
  const durationMs = options?.durationMs ?? 700;
  const [value, setValue] = useState(target);
  const currentValueRef = useRef(target);
  const fromRef = useRef(target);
  const toRef = useRef(target);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    fromRef.current = currentValueRef.current;
    toRef.current = target;
    startRef.current = null;

    let raf = 0;
    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = clamp(elapsed / durationMs, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = fromRef.current + (toRef.current - fromRef.current) * eased;
      currentValueRef.current = next;
      setValue(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

function buildSparklinePoints(
  values: number[],
  width: number,
  height: number,
  padding = 2
) {
  if (values.length === 0) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1e-6, max - min);
  return values
    .map((v, i) => {
      const x = padding + (i / (values.length - 1)) * (width - padding * 2);
      const y = padding + (1 - (v - min) / range) * (height - padding * 2);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function formatSignedPercent(value: number) {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function DataVis() {
  const gradientId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const chartPathRef = useRef<SVGPathElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [simState, setSimState] = useState<SimulationState>("RUNNING");
  const [lastUpdateAt, setLastUpdateAt] = useState(() => Date.now());

  const [targets, setTargets] = useState(() => ({
    activeWorkers: 14,
    tasksInFlight: 128,
    iterations: 9_400_000,
    meanFlow: 848.1,
    stdDev: 24.2,
    ci95: 1.32,
    convergence: 86.4,
  }));

  const previousTargetsRef = useRef(targets);

  const animatedWorkers = useAnimatedNumber(targets.activeWorkers, {
    durationMs: 650,
  });
  const animatedTasks = useAnimatedNumber(targets.tasksInFlight, {
    durationMs: 650,
  });
  const animatedIterations = useAnimatedNumber(targets.iterations, {
    durationMs: 900,
  });
  const animatedMean = useAnimatedNumber(targets.meanFlow, { durationMs: 800 });
  const animatedStd = useAnimatedNumber(targets.stdDev, { durationMs: 850 });
  const animatedCi = useAnimatedNumber(targets.ci95, { durationMs: 850 });
  const animatedConv = useAnimatedNumber(targets.convergence, {
    durationMs: 850,
  });

  const [timeSinceUpdateMs, setTimeSinceUpdateMs] = useState(0);

  const [series, setSeries] = useState(() => {
    const initial: { iterations: number; mean: number; sigma: number }[] = [];
    let mean = 835;
    let sigma = 30;
    let iters = 2_000_000;
    for (let i = 0; i < 26; i++) {
      iters += 220_000 + i * 28_000;
      const noise = (Math.random() - 0.5) * (18 / (1 + i / 3.5));
      mean = mean + (850 - mean) * 0.09 + noise;
      sigma = Math.max(10.5, sigma * 0.965 + (Math.random() - 0.5) * 0.6);
      initial.push({ iterations: iters, mean, sigma });
    }
    return initial;
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.18 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      const nextState: SimulationState = (() => {
        if (simState === "RUNNING")
          return Math.random() < 0.18 ? "AGGREGATING" : "RUNNING";
        if (simState === "AGGREGATING")
          return Math.random() < 0.22 ? "COMPLETED" : "RUNNING";
        return "RUNNING";
      })();
      setSimState(nextState);

      setTargets((prev) => {
        previousTargetsRef.current = prev;
        const workers = clamp(
          Math.round(prev.activeWorkers + (Math.random() - 0.5) * 3),
          10,
          18
        );
        const tasks = clamp(
          Math.round(
            prev.tasksInFlight +
              (workers - prev.activeWorkers) * 6 +
              (Math.random() - 0.5) * 22
          ),
          72,
          192
        );
        const itersDelta = Math.round(260_000 + Math.random() * 620_000);
        const iterations = prev.iterations + itersDelta;

        const trueMean = 850;
        const drift = (trueMean - prev.meanFlow) * 0.06;
        const noise = (Math.random() - 0.5) * 2.4;
        const meanFlow = clamp(prev.meanFlow + drift + noise, 830, 870);

        const stdDev = clamp(
          prev.stdDev * (0.988 + Math.random() * 0.01),
          12.2,
          29.5
        );

        const ci95 = clamp(
          1.96 * (stdDev / Math.sqrt(iterations / 120_000)),
          0.62,
          2.5
        );

        const convergence = clamp(
          100 - ci95 * 14 + (Math.random() - 0.5) * 1.2,
          62,
          99.8
        );

        return {
          activeWorkers: workers,
          tasksInFlight: tasks,
          iterations,
          meanFlow,
          stdDev,
          ci95,
          convergence,
        };
      });
      setLastUpdateAt(Date.now());
    }, 1500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, simState]);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTimeSinceUpdateMs(Date.now() - lastUpdateAt);
    }, 250);
    return () => clearInterval(interval);
  }, [isVisible, lastUpdateAt]);

  useEffect(() => {
    if (!isVisible) return;
    setSeries((prev) => {
      const last = prev[prev.length - 1];
      const iters = Math.max(last.iterations + 240_000, targets.iterations);
      const stabilization = 1 / (1 + prev.length / 7.5);
      const noise = (Math.random() - 0.5) * (8.5 * stabilization);
      const mean = last.mean + (targets.meanFlow - last.mean) * 0.18 + noise;
      const sigma = clamp(
        last.sigma * 0.985 + (Math.random() - 0.5) * 0.55,
        9.5,
        32
      );
      const next = [...prev, { iterations: iters, mean, sigma }].slice(-44);
      return next;
    });
  }, [isVisible, targets.iterations, targets.meanFlow]);

  const statusChip = useMemo(() => {
    if (simState === "RUNNING")
      return {
        label: "RUNNING",
        ring: "ring-emerald-500/20",
        text: "text-emerald-700",
        bg: "bg-emerald-500/10",
      };
    if (simState === "AGGREGATING")
      return {
        label: "AGGREGATING",
        ring: "ring-indigo-500/25",
        text: "text-indigo-700",
        bg: "bg-indigo-500/10",
      };
    return {
      label: "COMPLETED",
      ring: "ring-slate-500/25",
      text: "text-slate-700",
      bg: "bg-slate-500/10",
    };
  }, [simState]);

  const deltas = useMemo(() => {
    const prev = previousTargetsRef.current;
    const safePct = (next: number, last: number) => {
      if (!Number.isFinite(last) || Math.abs(last) < 1e-9) return 0;
      return ((next - last) / last) * 100;
    };
    return {
      iterations: safePct(targets.iterations, prev.iterations),
      meanFlow: safePct(targets.meanFlow, prev.meanFlow),
      stdDev: safePct(targets.stdDev, prev.stdDev),
      ci95: safePct(targets.ci95, prev.ci95),
      convergence: safePct(targets.convergence, prev.convergence),
    };
  }, [targets]);

  const metricSparklines = useMemo(() => {
    const base = series.slice(-18);
    const iters = base.map((p) => p.iterations / 1_000_000);
    const mean = base.map((p) => p.mean);
    const sigma = base.map((p) => p.sigma);
    const ci = base.map(
      (p) => 1.96 * (p.sigma / Math.sqrt(p.iterations / 120_000))
    );
    const conv = ci.map((c) => 100 - c * 14);
    return { iters, mean, sigma, ci, conv };
  }, [series]);

  const chart = useMemo(() => {
    const width = 900;
    const height = 300;
    const padX = 46;
    const padY = 28;

    const upper = series.map((p) => p.mean + p.sigma * 0.65);
    const lower = series.map((p) => p.mean - p.sigma * 0.65);
    const allY = [...upper, ...lower];
    const yMin = Math.min(...allY) - 3;
    const yMax = Math.max(...allY) + 3;
    const yRange = Math.max(1e-6, yMax - yMin);

    const xAt = (i: number) =>
      padX + (i / Math.max(1, series.length - 1)) * (width - padX * 2);
    const yAt = (v: number) =>
      padY + (1 - (v - yMin) / yRange) * (height - padY * 2);

    const meanPath = series
      .map((p, i) => {
        const x = xAt(i);
        const y = yAt(p.mean);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");

    const bandTop = upper.map(
      (v, i) => `${xAt(i).toFixed(2)} ${yAt(v).toFixed(2)}`
    );
    const bandBottom = lower
      .slice()
      .reverse()
      .map((v, i) => {
        const idx = series.length - 1 - i;
        return `${xAt(idx).toFixed(2)} ${yAt(v).toFixed(2)}`;
      });
    const bandPath =
      bandTop.length > 0
        ? `M ${bandTop[0]} L ${bandTop
            .slice(1)
            .join(" L ")} L ${bandBottom.join(" L ")} Z`
        : "";

    const yTicks = 4;
    const tickValues = Array.from({ length: yTicks + 1 }).map(
      (_, i) => yMin + (i / yTicks) * yRange
    );

    return {
      width,
      height,
      padX,
      padY,
      meanPath,
      bandPath,
      yMin,
      yMax,
      tickValues,
    };
  }, [series]);

  const [pathLength, setPathLength] = useState<number>(0);
  useEffect(() => {
    if (!isVisible) return;
    const path = chartPathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    if (Number.isFinite(length)) setPathLength(length);
  }, [isVisible, chart.meanPath]);

  const callouts = useMemo(() => {
    const workers = Math.round(animatedWorkers);
    const speedup = clamp(1 + workers / 3.8, 2.6, 6.2);
    const varianceReduction = clamp(
      12 + (18 - targets.activeWorkers) * 0.9 + (24 - targets.stdDev) * 0.8,
      8,
      28
    );
    const stabilityAfter = clamp(
      targets.iterations / 1_000_000 - 1.2,
      6.8,
      12.8
    );
    return {
      speedup: `${speedup.toFixed(1)}× faster than single-node`,
      variance: `−${varianceReduction.toFixed(0)}% after aggregation`,
      stability: `Confidence reached after ${stabilityAfter.toFixed(
        1
      )}M iterations`,
    };
  }, [
    animatedWorkers,
    targets.activeWorkers,
    targets.iterations,
    targets.stdDev,
  ]);

  const visibleBlock = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-3";

  const lastUpdateLabel =
    timeSinceUpdateMs < 1000
      ? `~${Math.max(0, Math.round(timeSinceUpdateMs))} ms ago`
      : `~${Math.round(timeSinceUpdateMs / 100) / 10}s ago`;

  const metrics = useMemo(() => {
    return [
      {
        key: "iterations",
        label: "Total Iterations",
        value: `${formatCompactNumber(animatedIterations, 1)}`,
        delta: deltas.iterations,
        good: "higher" as const,
        icon: Activity,
        spark: metricSparklines.iters,
        tooltip:
          "Total number of Monte Carlo samples executed across the worker mesh. Higher values increase statistical power and reduce uncertainty.",
      },
      {
        key: "mean",
        label: "Mean Traffic Flow",
        value: animatedMean.toFixed(1),
        delta: deltas.meanFlow,
        good: "higher" as const,
        icon: TrendingUp,
        spark: metricSparklines.mean,
        tooltip:
          "Estimated expected flow rate from Monte Carlo sampling. The estimate should stabilize as iterations accumulate.",
      },
      {
        key: "std",
        label: "Standard Deviation",
        value: animatedStd.toFixed(2),
        delta: deltas.stdDev,
        good: "lower" as const,
        icon: BarChart3,
        spark: metricSparklines.sigma,
        tooltip:
          "Standard Deviation measures variability across Monte Carlo runs. Lower values indicate tighter dispersion around the mean estimate.",
      },
      {
        key: "ci",
        label: "Confidence Interval (95%)",
        value: `±${animatedCi.toFixed(2)}`,
        delta: deltas.ci95,
        good: "lower" as const,
        icon: PieChart,
        spark: metricSparklines.ci,
        tooltip:
          "Approximate 95% confidence half-width for the mean estimate. Narrower intervals indicate higher certainty from sampling.",
      },
      {
        key: "conv",
        label: "Convergence Score",
        value: `${animatedConv.toFixed(1)}%`,
        delta: deltas.convergence,
        good: "higher" as const,
        icon: Gauge,
        spark: metricSparklines.conv,
        tooltip:
          "A heuristic stability score derived from confidence interval width and recent estimate drift. Higher values indicate steadier estimates.",
      },
    ];
  }, [
    animatedCi,
    animatedConv,
    animatedIterations,
    animatedMean,
    animatedStd,
    deltas,
    metricSparklines,
  ]);

  return (
    <section ref={rootRef} className="py-32 bg-canvas relative overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(var(--fg),0.16) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-700 ease-out motion-reduce:transition-none ${visibleBlock}`}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 dark:text-slate-100">
                Analytics &amp; Results
              </h2>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-[0_18px_55px_-44px_rgba(15,23,42,0.25)]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-2 rounded-full bg-green-400 opacity-40 animate-ping motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-green-400" />
                </span>
                Live
              </span>
            </div>
            <p className="text-xl text-slate-500 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Live statistical insights from distributed Monte Carlo execution
            </p>
          </div>
        </div>

        <div className="w-full px-6">
          <div
            className={`glass card-super-lg p-8 shadow-deep transition-all duration-700 ease-out motion-reduce:transition-none ${visibleBlock}`}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 border-b border-slate-900/10 dark:border-white/10 pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                      Simulation Dashboard
                    </h3>
                    <p className="text-slate-500 dark:text-slate-300 text-sm mt-1">
                      Distributed execution telemetry and Monte Carlo
                      reliability metrics
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-3 rounded-full border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2 shadow-[0_18px_55px_-44px_rgba(15,23,42,0.25)]">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusChip.bg} ${statusChip.text} ${statusChip.ring}`}
                    >
                      {statusChip.label}
                    </span>
                    <span className="h-4 w-px bg-slate-900/10 dark:bg-white/10" />
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                      <Users className="size-4 text-indigo-600" />
                      {Math.round(animatedWorkers)} online
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-3 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.18)]">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-slate-500 dark:text-slate-300">
                        Simulation State
                      </div>
                      <div className="text-slate-900 dark:text-slate-100 font-semibold tabular-nums">
                        {statusChip.label}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-slate-500 dark:text-slate-300">
                        Active Workers
                      </div>
                      <div className="text-slate-900 dark:text-slate-100 font-semibold tabular-nums">
                        {Math.round(animatedWorkers)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-slate-500 dark:text-slate-300">
                        Tasks in Flight
                      </div>
                      <div className="text-slate-900 dark:text-slate-100 font-semibold tabular-nums">
                        {Math.round(animatedTasks)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-slate-500 dark:text-slate-300">
                        Last Update
                      </div>
                      <div className="text-slate-900 dark:text-slate-100 font-semibold tabular-nums">
                        {lastUpdateLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {metrics.map((m) => {
                  const Icon = m.icon;
                  const pct = m.delta;
                  const isGood = m.good === "higher" ? pct >= 0 : pct <= 0;
                  const deltaColor = isGood
                    ? "text-emerald-700"
                    : "text-rose-700";
                  const sparkPoints = buildSparklinePoints(m.spark, 88, 26, 2);

                  return (
                    <HoverCard key={m.key} openDelay={200}>
                      <HoverCardTrigger asChild>
                        <div
                          className="
                          group relative rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5
                          transition-[transform,box-shadow,border-color] duration-300 ease-out
                          hover:-translate-y-[2px] hover:border-indigo-500/25 hover:shadow-[0_24px_60px_-44px_rgba(99,102,241,0.22)]
                          motion-reduce:transition-none motion-reduce:hover:translate-y-0
                        "
                        >
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <Icon className="size-5 text-slate-700/80 dark:text-slate-200" />
                              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 truncate">
                                {m.label}
                              </span>
                            </div>
                            <span
                              className={`text-xs font-semibold tabular-nums ${deltaColor}`}
                            >
                              {formatSignedPercent(pct)}
                            </span>
                          </div>

                          <div className="flex items-end justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums leading-none">
                                {m.value}
                              </div>
                              <div className="mt-2 text-[11px] font-semibold text-slate-500 dark:text-slate-300">
                                Updated continuously
                              </div>
                            </div>

                            <div className="shrink-0">
                              <svg
                                width="88"
                                height="26"
                                viewBox="0 0 88 26"
                                className="block"
                              >
                                <defs>
                                  <linearGradient
                                    id={`${gradientId}-${m.key}`}
                                    x1="0"
                                    y1="0"
                                    x2="1"
                                    y2="0"
                                  >
                                    <stop
                                      offset="0"
                                      stopColor="rgb(99,102,241)"
                                      stopOpacity="0.2"
                                    />
                                    <stop
                                      offset="0.5"
                                      stopColor="rgb(139,92,246)"
                                      stopOpacity="0.65"
                                    />
                                    <stop
                                      offset="1"
                                      stopColor="rgb(99,102,241)"
                                      stopOpacity="0.35"
                                    />
                                  </linearGradient>
                                </defs>
                                <polyline
                                  points={sparkPoints}
                                  fill="none"
                                  stroke={`url(#${gradientId}-${m.key})`}
                                  strokeWidth="2"
                                  strokeLinejoin="round"
                                  strokeLinecap="round"
                                />
                                <circle
                                  cx="86"
                                  cy="13"
                                  r="2.2"
                                  fill="rgb(99,102,241)"
                                  opacity="0.9"
                                >
                                  <animate
                                    attributeName="opacity"
                                    values="0.45;1;0.45"
                                    dur="1.8s"
                                    repeatCount="indefinite"
                                  />
                                </circle>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent
                        className="
                        w-80 rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 backdrop-blur-xl
                        text-slate-700 dark:text-slate-200 shadow-[0_28px_80px_-50px_rgba(15,23,42,0.18)]
                      "
                        side="top"
                        align="center"
                        sideOffset={10}
                      >
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          {m.label}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {m.tooltip}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  );
                })}
              </div>

              <div className="grid lg:grid-cols-5 gap-4 items-stretch">
                <div className="lg:col-span-3 rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 overflow-hidden shadow-[0_22px_60px_-44px_rgba(15,23,42,0.18)]">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Convergence of Mean Estimate
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-300 mt-1">
                        Mean stabilizes as iterations accumulate; shaded band
                        approximates uncertainty (±σ)
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 tabular-nums">
                      n ≈ {formatCompactNumber(animatedIterations, 1)}
                    </div>
                  </div>

                  <div className="relative">
                    <svg
                      viewBox={`0 0 ${chart.width} ${chart.height}`}
                      className="w-full h-72"
                      role="img"
                      aria-label="Convergence chart showing Monte Carlo mean estimate and uncertainty band"
                    >
                      <defs>
                        <linearGradient
                          id={`${gradientId}-stroke`}
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop
                            offset="0"
                            stopColor="rgb(99,102,241)"
                            stopOpacity="0.9"
                          />
                          <stop
                            offset="0.5"
                            stopColor="rgb(139,92,246)"
                            stopOpacity="0.95"
                          />
                          <stop
                            offset="1"
                            stopColor="rgb(99,102,241)"
                            stopOpacity="0.9"
                          />
                        </linearGradient>
                        <linearGradient
                          id={`${gradientId}-band`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0"
                            stopColor="rgb(139,92,246)"
                            stopOpacity="0.22"
                          />
                          <stop
                            offset="1"
                            stopColor="rgb(99,102,241)"
                            stopOpacity="0.06"
                          />
                        </linearGradient>
                      </defs>

                      {chart.tickValues.map((v) => {
                        const y =
                          chart.padY +
                          (1 - (v - chart.yMin) / (chart.yMax - chart.yMin)) *
                            (chart.height - chart.padY * 2);
                        return (
                          <g key={v.toFixed(3)}>
                            <line
                              x1={chart.padX}
                              x2={chart.width - chart.padX}
                              y1={y}
                              y2={y}
                              stroke="rgba(15,23,42,0.08)"
                            />
                            <text
                              x={chart.padX - 10}
                              y={y + 4}
                              textAnchor="end"
                              fontSize="11"
                              fill="rgba(100,116,139,0.85)"
                              className="tabular-nums"
                            >
                              {v.toFixed(0)}
                            </text>
                          </g>
                        );
                      })}

                      <path
                        d={chart.bandPath}
                        fill={`url(#${gradientId}-band)`}
                      />
                      <path
                        ref={chartPathRef}
                        d={chart.meanPath}
                        fill="none"
                        stroke={`url(#${gradientId}-stroke)`}
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: pathLength
                            ? `${pathLength}px`
                            : undefined,
                          strokeDashoffset: pathLength
                            ? `${isVisible ? 0 : pathLength}px`
                            : undefined,
                          transition: pathLength
                            ? "stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)"
                            : undefined,
                        }}
                      />

                      <text
                        x={chart.width - chart.padX}
                        y={chart.height - 10}
                        textAnchor="end"
                        fontSize="11"
                        fill="rgba(100,116,139,0.85)"
                      >
                        Iterations →
                      </text>
                      <text
                        x={18}
                        y={14}
                        textAnchor="start"
                        fontSize="11"
                        fill="rgba(100,116,139,0.85)"
                      >
                        Estimated mean →
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="lg:col-span-2 grid gap-4">
                  <div className="rounded-2xl border border-slate-900/10 bg-white/70 p-6 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.18)]">
                    <div className="text-sm font-semibold text-slate-900">
                      Distributed Insight
                    </div>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-slate-500 text-sm">
                          Parallel Speedup
                        </div>
                        <div className="text-slate-900 font-semibold text-sm tabular-nums">
                          {callouts.speedup}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-slate-500 text-sm">
                          Variance Reduction
                        </div>
                        <div className="text-slate-900 font-semibold text-sm tabular-nums">
                          {callouts.variance}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-slate-500 text-sm">
                          Result Stability
                        </div>
                        <div className="text-slate-900 font-semibold text-sm tabular-nums">
                          {callouts.stability}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-900/10 bg-white/70 p-6 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.18)]">
                    <div className="text-sm font-semibold text-slate-900">
                      Interpretation
                    </div>
                    <div className="mt-3 text-sm text-slate-600 leading-relaxed">
                      The control plane tracks job progress while worker nodes
                      execute independent Monte Carlo chunks in parallel.
                      Aggregation reduces uncertainty, improving confidence in
                      reported statistics without changing the underlying model.
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Healthy Mesh",
                    value: `${Math.round(animatedWorkers)} workers responding`,
                    accent:
                      "from-indigo-500/18 via-violet-500/14 to-indigo-500/8",
                  },
                  {
                    title: "Stable Estimates",
                    value: `CI(95%) ≈ ±${animatedCi.toFixed(2)}`,
                    accent:
                      "from-violet-500/16 via-indigo-500/12 to-violet-500/8",
                  },
                  {
                    title: "Research-Grade Output",
                    value: `σ ≈ ${animatedStd.toFixed(2)} across runs`,
                    accent:
                      "from-indigo-500/14 via-violet-500/10 to-indigo-500/6",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="
                    relative overflow-hidden rounded-2xl border border-slate-900/10 bg-white/70 p-6
                    shadow-[0_22px_60px_-44px_rgba(15,23,42,0.18)]
                  "
                  >
                    <div
                      className={`absolute inset-0 opacity-30 bg-gradient-to-br ${c.accent}`}
                    />
                    <div className="relative">
                      <div className="text-sm font-semibold text-slate-900">
                        {c.title}
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        {c.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
