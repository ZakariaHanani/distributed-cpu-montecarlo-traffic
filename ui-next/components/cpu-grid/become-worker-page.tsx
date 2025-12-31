"use client";

import {
  useLayoutEffect,
  useMemo,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";
import {
  ArrowLeft,
  Cpu,
  Database,
  Gift,
  Layers,
  ShieldCheck,
  Sparkles,
  Split,
  Terminal,
  Waves,
  Zap,
  Users,
  Clock,
  CheckCircle2,
  Lock,
  Activity,
  Award,
  ChevronRight,
  ChevronDown,
  Copy,
  Download,
  Wifi,
  Play,
  Info,
  X,
  Workflow,
} from "lucide-react";
import { toast } from "sonner";

import type { ViewType } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

type BecomeWorkerPageProps = {
  setCurrentView: (view: ViewType) => void;
};

type SectionId = "why-workers" | "rewards" | "safety" | "how-it-works";

const NAVBAR_OFFSET_PX = 80;

export function BecomeWorkerPage({ setCurrentView }: BecomeWorkerPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeFlowStep, setActiveFlowStep] = useState(0);
  const [activeSummaryItem, setActiveSummaryItem] = useState<SectionId | null>(
    null
  );
  const [highlightedSection, setHighlightedSection] =
    useState<SectionId | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [isQuickSummaryOpen, setIsQuickSummaryOpen] = useState(false);

  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    "why-workers": null,
    rewards: null,
    safety: null,
    "how-it-works": null,
  });

  const joinCommand = useMemo(
    () =>
      [
        "# Install the CPU Grid worker",
        "curl -fsSL https://cpugrid.io/install.sh | sh",
        "",
        "# Join the network",
        "cpugrid-worker join \\",
        "  --master https://master.cpugrid.io \\",
        "  --join-code YOUR_JOIN_CODE \\",
        "  --cpu 60% \\",
        "  --ram 6GB",
      ].join("\n"),
    []
  );

  const scrollToSection = useCallback((sectionId: SectionId) => {
    const element = sectionRefs.current[sectionId];
    if (!element) return;

    setActiveSummaryItem(sectionId);
    setHighlightedSection(sectionId);

    element.scrollIntoView({ behavior: "smooth", block: "center" });

    const focusAfterScroll = () => {
      window.scrollBy({ top: -NAVBAR_OFFSET_PX, left: 0, behavior: "auto" });
      gsap.fromTo(
        element,
        { scale: 1.01, transformOrigin: "center" },
        { scale: 1, duration: 0.5, ease: "power2.out", overwrite: true }
      );
      window.setTimeout(() => {
        setHighlightedSection(null);
      }, 900);
    };

    let lastY = window.scrollY;
    let stableFrames = 0;
    let frames = 0;
    const tick = () => {
      frames += 1;
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 0.5) stableFrames += 1;
      else stableFrames = 0;
      lastY = y;

      if (stableFrames >= 10 || frames >= 120) {
        focusAfterScroll();
        return;
      }

      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  // Entrance animation
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    gsap.registerPlugin(ScrollToPlugin);
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-section]");
      gsap.fromTo(
        sections,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          clearProps: "transform",
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Flow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlowStep((prev) => (prev + 1) % 5);
    }, 500); // Speed up from 2000ms to 500ms
    return () => clearInterval(interval);
  }, []);

  const trustBadges = [
    { icon: ShieldCheck, label: "Sandboxed", color: "emerald" },
    { icon: Lock, label: "No File Access", color: "indigo" },
    { icon: Activity, label: "Resource Limited", color: "amber" },
  ];

  const flowSteps = [
    { icon: Cpu, label: "Master", desc: "Schedules jobs", color: "slate" },
    { icon: Split, label: "Tasks", desc: "Sharded chunks", color: "indigo" },
    {
      icon: Users,
      label: "Workers",
      desc: "Parallel compute",
      color: "violet",
    },
    {
      icon: Database,
      label: "Results",
      desc: "Partial outputs",
      color: "amber",
    },
    {
      icon: Waves,
      label: "Aggregation",
      desc: "Final answer",
      color: "emerald",
    },
  ];

  const tiers = [
    {
      name: "Bronze",
      color: "amber",
      subtitle: "Entry tier",
      perks: ["Higher iteration limits", "Basic analytics access"],
      credits: "0 - 1,000",
      featured: false,
    },
    {
      name: "Gold",
      color: "gold", // Changed from "violet" to "gold"
      subtitle: "Power contributor",
      perks: [
        "Advanced analytics suite",
        "Highest iteration limits",
        "Priority support",
      ],
      credits: "10,001+",
      featured: true,
    },
    {
      name: "Silver",
      color: "slate",
      subtitle: "Trusted worker",
      perks: ["Priority queue access", "Export results (CSV/PDF)"],
      credits: "1,001 - 10,000",
      featured: false,
    },
  ];

  const statsCards = [
    {
      id: "speedup",
      icon: Zap,
      label: "Estimated speedup",
      color: "indigo",
      explanation:
        "More workers in the network means jobs are split across more nodes, dramatically reducing total computation time.",
    },
    {
      id: "workers",
      icon: Users,
      label: "Workers online",
      color: "violet",
      explanation:
        "The current number of active worker nodes contributing compute power to the network right now.",
    },
    {
      id: "duration",
      icon: Clock,
      label: "Avg task duration",
      color: "emerald",
      explanation:
        "Shorter average duration means tasks return faster, so aggregation completes sooner and throughput improves.",
    },
  ];

  const gettingStartedSteps = [
    {
      icon: Download,
      title: "Download Worker",
      description:
        "Install the lightweight worker runtime (Windows/Linux/macOS).",
      status: "Coming soon",
      statusColor: "amber",
    },
    {
      icon: Cpu,
      title: "Verify Device",
      description: "CPU cores, RAM, and network check to ensure compatibility.",
      status: "Planned",
      statusColor: "slate",
    },
    {
      icon: Wifi,
      title: "Connect to CPU Grid",
      description: "Secure registration with a worker token.",
      status: "UI demo",
      statusColor: "indigo",
      hasToken: true,
    },
    {
      icon: Play,
      title: "Start Contributing",
      description: "Receive tasks, process chunks, return results.",
      status: "Coming soon",
      statusColor: "emerald",
    },
  ];

  const quickSummaryItems = [
    {
      icon: Zap,
      title: "Accelerate Research",
      desc: "Your compute helps Monte Carlo simulations finish faster",
      sectionId: "why-workers" as SectionId,
    },
    {
      icon: Workflow,
      title: "How It Works",
      desc: "See the step-by-step process from task to results",
      sectionId: "how-it-works" as SectionId,
    },
    {
      icon: Gift,
      title: "Earn Credits",
      desc: "10 credits/hour online + 5 credits/task completed",
      sectionId: "rewards" as SectionId,
    },
    {
      icon: ShieldCheck,
      title: "Stay Safe",
      desc: "Sandboxed process, no file access, full control",
      sectionId: "safety" as SectionId,
    },
  ];

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-gradient-to-b from-white via-slate-50/30 to-white dark:from-[rgb(var(--bg))] dark:via-[rgb(var(--bg))] dark:to-[rgb(var(--bg))]"
    >
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/12 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/5 dark:bg-violet-500/12 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 pt-24">
        {/* Back button */}
        <button
          type="button"
          onClick={() => setCurrentView("home")}
          className="group inline-flex items-center gap-2 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-300 mb-10"
          data-section
        >
          <span className="flex items-center justify-center size-8 rounded-full bg-white/80 dark:bg-white/10 border border-white/60 dark:border-white/10 shadow-sm group-hover:-translate-x-1 transition-transform duration-300">
            <ArrowLeft className="w-4 h-4" />
          </span>
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        {/* Hero Header */}
        <header className="mb-12" data-section>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-200 text-sm font-medium mb-6">
                <Zap className="size-4" />
                <span>Join the Distributed Network</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Become a <span className="text-gradient-flow">Worker Node</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Donate your idle compute power to accelerate Monte Carlo
                simulations. Earn Compute Credits, unlock premium features, and
                help power the grid—all while your computer sits idle.
              </p>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${badge.color}-500/10 text-${badge.color}-700 ring-1 ring-${badge.color}-500/20`}
                  >
                    <badge.icon className="size-4" />
                    <span className="text-sm font-medium">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-indigo-500/20 via-violet-500/15 to-rose-500/10 blur-[40px] opacity-60" />
              <div className="relative rounded-[3rem] border border-white/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-2xl p-8 shadow-[0_40px_100px_-50px_rgba(15,23,42,0.35)] dark:shadow-[0_40px_100px_-50px_rgba(0,0,0,0.55)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex size-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg">
                    <Cpu className="size-6" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Worker Status
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-300">
                      Ready to join
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/80 dark:bg-white/10 border border-white/60 dark:border-white/10">
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      Compute Credits
                    </span>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/80 dark:bg-white/10 border border-white/60 dark:border-white/10">
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      Current Tier
                    </span>
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/80 dark:bg-white/10 border border-white/60 dark:border-white/10">
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      Worker ID
                    </span>
                    <Skeleton className="h-5 w-32 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column - main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Why Workers Matter - Added section id and ref */}
            <section
              id="why-workers"
              ref={(el) => {
                sectionRefs.current["why-workers"] = el;
              }}
              className={`rounded-[3rem] border bg-white/70 backdrop-blur-2xl shadow-[0_30px_90px_-50px_rgba(15,23,42,0.35)] overflow-hidden premium-card transition-all duration-500 ${
                highlightedSection === "why-workers"
                  ? "border-indigo-500/50 dark:border-indigo-400/35 ring-2 ring-indigo-500/30 dark:ring-indigo-400/20 shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]"
                  : "border-white/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))]"
              }`}
              data-section
            >
              <div className="px-8 py-8 border-b border-white/60 bg-gradient-to-br from-white/90 via-white/65 to-white/80 dark:from-white/10 dark:via-white/5 dark:to-white/8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                      Why Workers Matter
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                      The master splits Monte Carlo jobs into independent
                      chunks. Workers process them in parallel, then return
                      results for aggregation—making final answers arrive
                      faster.
                    </p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-200 ring-1 ring-indigo-500/15">
                    <Split className="size-5" />
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid gap-5 md:grid-cols-3">
                  {statsCards.map((stat) => (
                    <div key={stat.id} className="group relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTooltip(
                            activeTooltip === stat.id ? null : stat.id
                          )
                        }
                        className={`w-full text-left rounded-[2rem] border px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${
                          activeTooltip === stat.id
                            ? `border-${stat.color}-500/40 bg-${stat.color}-50/50 shadow-lg`
                            : "border-white/60 bg-white/75"
                        }`}
                      >
                        {/* Hover glow effect */}
                        <div
                          className={`absolute inset-0 rounded-[2rem] bg-${stat.color}-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                        />

                        <div className="relative">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex size-9 items-center justify-center rounded-full bg-${stat.color}-500/10 text-${stat.color}-700 ring-1 ring-${stat.color}-500/15 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
                              >
                                <stat.icon className="size-4" />
                              </div>
                              <span className="text-xs text-slate-500">
                                {stat.label}
                              </span>
                            </div>
                            <Info
                              className={`size-4 transition-colors duration-200 ${
                                activeTooltip === stat.id
                                  ? "text-indigo-500"
                                  : "text-slate-400"
                              }`}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-24 rounded-full shimmer" />
                          </div>

                          {/* Animated accent line on hover */}
                          <div
                            className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-${stat.color}-500/0 via-${stat.color}-500 to-${stat.color}-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center`}
                          />
                        </div>
                      </button>

                      {/* Tooltip popover */}
                      {activeTooltip === stat.id && (
                        <div className="absolute left-0 right-0 top-full mt-2 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="rounded-2xl border border-white/60 dark:border-white/10 bg-white/95 dark:bg-white/10 backdrop-blur-xl p-4 shadow-xl">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {stat.explanation}
                              </p>
                              <button
                                type="button"
                                onClick={() => setActiveTooltip(null)}
                                className="shrink-0 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                              >
                                <X className="size-3 text-slate-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* How It Works - Flow Diagram */}
            <section
              id="how-it-works"
              ref={(el) => {
                sectionRefs.current["how-it-works"] = el;
              }}
              className={`rounded-[3rem] border bg-white/70 backdrop-blur-2xl shadow-[0_30px_90px_-50px_rgba(15,23,42,0.35)] overflow-hidden premium-card transition-all duration-500 ${
                highlightedSection === "how-it-works"
                  ? "border-indigo-500/50 ring-2 ring-indigo-500/30 shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]"
                  : "border-white/60"
              }`}
              data-section
            >
              <div className="px-8 py-8 border-b border-white/60 bg-gradient-to-br from-white/90 via-white/65 to-white/80 dark:from-white/10 dark:via-white/5 dark:to-white/8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                      How It Works
                    </h2>
                    <p className="mt-2 text-slate-600">
                      A streamlined flow from orchestration to aggregation.
                    </p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-200 ring-1 ring-violet-500/15">
                    <Layers className="size-5" />
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Flow diagram */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                  {flowSteps.map((step, idx) => (
                    <div key={step.label} className="flex items-center gap-4">
                      <div
                        className={`relative flex flex-col items-center transition-all duration-500 ${
                          activeFlowStep === idx
                            ? "scale-110"
                            : "scale-100 opacity-70"
                        }`}
                      >
                        {activeFlowStep === idx && (
                          <div
                            className={`absolute inset-0 rounded-full bg-${step.color}-500/20 blur-xl animate-pulse`}
                          />
                        )}
                        <div
                          className={`relative flex size-14 items-center justify-center rounded-full bg-${
                            step.color
                          }-500/10 ring-2 ring-${
                            step.color
                          }-500/20 transition-all duration-300 ${
                            activeFlowStep === idx
                              ? `ring-${step.color}-500/50 shadow-lg`
                              : ""
                          }`}
                        >
                          <step.icon
                            className={`size-6 text-${step.color}-700`}
                          />
                        </div>
                        <div className="mt-3 text-center">
                          <div className="text-sm font-semibold text-slate-900">
                            {step.label}
                          </div>
                          <div className="text-xs text-slate-500">
                            {step.desc}
                          </div>
                        </div>
                      </div>

                      {idx < flowSteps.length - 1 && (
                        <div className="hidden lg:block relative w-12 h-[2px]">
                          <div className="absolute inset-0 bg-slate-200 dark:bg-white/10 rounded-full" />
                          <div
                            className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500 ${
                              activeFlowStep > idx ? "opacity-100" : "opacity-0"
                            }`}
                            style={{
                              transform:
                                activeFlowStep > idx
                                  ? "scaleX(1)"
                                  : "scaleX(0)",
                              transformOrigin: "left",
                            }}
                          />
                          <ChevronRight
                            className={`absolute -right-2 top-1/2 -translate-y-1/2 size-4 transition-colors duration-300 ${
                              activeFlowStep > idx
                                ? "text-indigo-500"
                                : "text-slate-300 dark:text-white/30"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Status indicator */}
                <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/60 bg-white/80 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="relative flex size-3">
                      <span className="absolute inline-flex size-3 rounded-full bg-indigo-500/50 animate-ping" />
                      <span className="relative inline-flex size-3 rounded-full bg-indigo-600" />
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      Animated flow visualization (UI demo)
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full">
                    60fps
                  </span>
                </div>
              </div>
            </section>

            {/* Rewards & Tiers - Added section id and ref, reordered tiers */}
            <section
              id="rewards"
              ref={(el) => {
                sectionRefs.current["rewards"] = el;
              }}
              className={`rounded-[3rem] border bg-white/70 backdrop-blur-2xl shadow-[0_30px_90px_-50px_rgba(15,23,42,0.35)] overflow-hidden premium-card transition-all duration-500 ${
                highlightedSection === "rewards"
                  ? "border-indigo-500/50 ring-2 ring-indigo-500/30 shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]"
                  : "border-white/60"
              }`}
              data-section
            >
              <div className="px-8 py-8 border-b border-white/60 bg-gradient-to-br from-white/90 via-white/65 to-white/80 dark:from-white/10 dark:via-white/5 dark:to-white/8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                      Rewards & Incentives
                    </h2>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      Compute Credits are internal points (not cryptocurrency).
                      Earn them via uptime and completed tasks, then unlock
                      premium features.
                    </p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/15">
                    <Gift className="size-5" />
                  </div>
                </div>

                {/* Reward rates */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Uptime reward", value: "+10 credits / hour" },
                    { label: "Task reward", value: "+5 credits / task" },
                    { label: "Weekly bonus", value: "Up to 2x multiplier" },
                  ].map((reward) => (
                    <div
                      key={reward.label}
                      className="rounded-2xl border border-white/60 bg-white/80 px-5 py-4"
                    >
                      <div className="text-xs text-slate-500">
                        {reward.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">
                        {reward.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-col md:flex-row items-end justify-center gap-5">
                  {tiers.map((tier) => (
                    <div
                      key={tier.name}
                      className={`group rounded-[2.5rem] border p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                        tier.featured
                          ? "border-yellow-500/30 bg-gradient-to-br from-yellow-500/15 via-amber-500/10 to-orange-500/10 md:scale-110 md:z-10 shadow-lg animate-gold-glow md:min-w-[280px] md:pb-14"
                          : "border-white/60 bg-white/75 md:w-[240px]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                              tier.color === "amber"
                                ? "bg-amber-500/12 text-amber-700 ring-amber-500/20"
                                : tier.color === "slate"
                                ? "bg-slate-500/12 text-slate-700 ring-slate-500/20"
                                : "bg-yellow-500/12 text-yellow-700 ring-yellow-500/20"
                            }`}
                          >
                            {tier.name}
                          </div>
                          <p className="mt-2 text-sm text-slate-500">
                            {tier.subtitle}
                          </p>
                        </div>
                        <div
                          className={`rounded-2xl p-3 ring-1 ${
                            tier.color === "amber"
                              ? "bg-amber-500/10 ring-amber-500/15"
                              : tier.color === "slate"
                              ? "bg-slate-500/10 ring-slate-500/15"
                              : "bg-yellow-500/10 ring-yellow-500/15"
                          }`}
                        >
                          <Award
                            className={`size-5 ${
                              tier.color === "amber"
                                ? "text-amber-700"
                                : tier.color === "slate"
                                ? "text-slate-700"
                                : "text-yellow-600"
                            }`}
                          />
                        </div>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {tier.perks.map((perk) => (
                          <li
                            key={perk}
                            className="flex items-start gap-2 text-sm text-slate-600"
                          >
                            <CheckCircle2 className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Trust & Safety - Added section id and ref */}
            <section
              id="safety"
              ref={(el) => {
                sectionRefs.current["safety"] = el;
              }}
              className={`rounded-[3rem] border bg-white/70 backdrop-blur-2xl shadow-[0_30px_90px_-50px_rgba(15,23,42,0.35)] overflow-hidden premium-card transition-all duration-500 ${
                highlightedSection === "safety"
                  ? "border-indigo-500/50 ring-2 ring-indigo-500/30 shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]"
                  : "border-white/60"
              }`}
              data-section
            >
              <div className="px-8 py-8 border-b border-white/60 bg-gradient-to-br from-white/90 via-white/65 to-white/80 dark:from-white/10 dark:via-white/5 dark:to-white/8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                      Trust & Safety
                    </h2>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      CPU/RAM caps, no file access, stop anytime. Your machine
                      stays protected with sandboxed, isolated worker processes.
                    </p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-200 ring-1 ring-emerald-500/15">
                    <ShieldCheck className="size-5" />
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid gap-5 md:grid-cols-3">
                  <div className="rounded-[2.25rem] border border-white/60 bg-white/75 p-6 relative overflow-hidden">
                    <div className="absolute top-4 right-4 inline-flex items-center rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-200 px-2 py-0.5 text-[10px] font-semibold">
                      Coming soon
                    </div>
                    <Label className="text-slate-700 font-medium">
                      CPU limit
                    </Label>
                    <div className="mt-4">
                      <Slider
                        disabled
                        value={[60]}
                        max={100}
                        step={5}
                        className="opacity-50"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Cap worker CPU usage
                      </span>
                      <span className="text-sm font-medium text-slate-700">
                        60%
                      </span>
                    </div>
                  </div>

                  <div className="rounded-[2.25rem] border border-white/60 bg-white/75 p-6 relative overflow-hidden">
                    <div className="absolute top-4 right-4 inline-flex items-center rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-200 px-2 py-0.5 text-[10px] font-semibold">
                      Coming soon
                    </div>
                    <Label
                      htmlFor="ramLimit"
                      className="text-slate-700 font-medium"
                    >
                      RAM limit
                    </Label>
                    <Input
                      id="ramLimit"
                      disabled
                      value="6 GB"
                      readOnly
                      className="mt-3 h-11 rounded-xl bg-white/80 border-white/60 text-slate-700 opacity-50"
                    />
                    <div className="mt-3 text-xs text-slate-500">
                      Reserve memory headroom
                    </div>
                  </div>

                  <div className="rounded-[2.25rem] border border-white/60 bg-white/75 p-6 relative overflow-hidden">
                    <div className="absolute top-4 right-4 inline-flex items-center rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-200 px-2 py-0.5 text-[10px] font-semibold">
                      Coming soon
                    </div>
                    <Label className="text-slate-700 font-medium">
                      Auto-stop
                    </Label>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-slate-600">
                        Stop on battery / idle
                      </span>
                      <Switch disabled checked className="opacity-50" />
                    </div>
                    <div className="mt-3 text-xs text-slate-500">
                      Protect your device by default
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Getting Started - Animated stepper/accordion */}
            <section
              id="getting-started"
              className="rounded-[3rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_30px_90px_-50px_rgba(15,23,42,0.35)] overflow-hidden premium-card"
              data-section
            >
              <div className="px-8 py-8 border-b border-white/60 bg-gradient-to-br from-white/90 via-white/65 to-white/80 dark:from-white/10 dark:via-white/5 dark:to-white/8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                      Getting Started
                    </h2>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      Follow these steps to join the network. Click each step to
                      learn more.
                    </p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-slate-900/10 text-slate-700 ring-1 ring-slate-900/10">
                    <Terminal className="size-5" />
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Stepper timeline */}
                <div className="space-y-4">
                  {gettingStartedSteps.map((step, idx) => {
                    const isExpanded = expandedStep === idx;
                    return (
                      <div
                        key={step.title}
                        className={`rounded-[2rem] border transition-all duration-300 overflow-hidden ${
                          isExpanded
                            ? "border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 via-white/80 to-violet-500/5 dark:from-indigo-500/14 dark:via-white/5 dark:to-violet-500/14 shadow-lg"
                            : "border-white/60 bg-white/75 hover:border-white/80 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-white/14"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedStep(isExpanded ? null : idx)
                          }
                          className="w-full flex items-center gap-4 p-5 text-left"
                        >
                          {/* Step number with connection line */}
                          <div className="relative">
                            <div
                              className={`flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                                isExpanded
                                  ? "bg-slate-900 text-white shadow-lg"
                                  : "bg-slate-100 dark:bg-white/10 text-slate-600"
                              }`}
                            >
                              {idx + 1}
                            </div>
                            {idx < gettingStartedSteps.length - 1 && (
                              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-4 bg-slate-200 dark:bg-white/10" />
                            )}
                          </div>

                          {/* Step content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                              <step.icon
                                className={`size-5 ${
                                  isExpanded
                                    ? "text-indigo-600"
                                    : "text-slate-500"
                                }`}
                              />
                              <span className="font-semibold text-slate-900">
                                {step.title}
                              </span>
                              {/* Status chip */}
                              <span
                                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                  step.statusColor === "amber"
                                    ? "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200"
                                    : step.statusColor === "slate"
                                    ? "bg-slate-500/10 text-slate-600 dark:bg-white/10 dark:text-slate-200"
                                    : step.statusColor === "indigo"
                                    ? "bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200"
                                    : "bg-emerald-500/10 text-emerald-700"
                                }`}
                              >
                                {step.status}
                              </span>
                            </div>
                          </div>

                          {/* Expand icon */}
                          <ChevronDown
                            className={`size-5 text-slate-400 transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Expanded content with animation */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isExpanded
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-5 pb-5 pl-[4.5rem]">
                              <p className="text-sm text-slate-600 mb-4">
                                {step.description}
                              </p>

                              {/* Token copy button for Connect step */}
                              {step.hasToken && (
                                <div className="flex flex-col gap-3">
                                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800">
                                    <code className="flex-1 text-xs text-slate-300 font-mono truncate">
                                      wkr_demo_xxxx_xxxx_xxxx
                                    </code>
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="ghost"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toast.success(
                                          "Token copied to clipboard (demo)"
                                        );
                                      }}
                                      className="h-8 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                                    >
                                      <Copy className="size-3 mr-1.5" />
                                      Copy token
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action buttons */}
                <div className="mt-6 space-y-3">
                  <Button
                    type="button"
                    onClick={() => setCurrentView("eligibility")}
                    className="w-full h-12 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/25"
                  >
                    <Sparkles className="size-4 mr-2" />
                    Get Started
                  </Button>
                </div>
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-6">
            {/* Quick summary card - Interactive navigation */}
            <div
              className="rounded-[2.5rem] border border-white/60 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-rose-500/10 backdrop-blur-2xl shadow-[0_30px_90px_-50px_rgba(15,23,42,0.35)] p-7 sticky top-24"
              data-section
            >
              <div
                className={`flex items-start justify-between gap-4 transition-[margin] duration-300 ${
                  isQuickSummaryOpen ? "mb-6" : "mb-0"
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Quick Summary
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Everything you need to know
                  </p>
                </div>
                <button
                  type="button"
                  aria-expanded={isQuickSummaryOpen}
                  aria-controls="quick-summary-body"
                  onClick={() => setIsQuickSummaryOpen((v) => !v)}
                  className="
                    flex size-11 items-center justify-center rounded-full
                    bg-white/70 ring-1 ring-white/60 shadow-sm
                    transition-all duration-300
                    hover:ring-2 hover:ring-indigo-500/30 hover:bg-white/80 dark:hover:bg-white/10
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70
                  "
                >
                  <ChevronDown
                    className={`size-5 text-indigo-700 dark:text-indigo-200 transition-transform duration-300 ${
                      isQuickSummaryOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </div>

              <div
                id="quick-summary-body"
                className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
                  isQuickSummaryOpen
                    ? "max-h-[900px] opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="space-y-3">
                  {quickSummaryItems.map((item) => {
                    const isActive = activeSummaryItem === item.sectionId;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => scrollToSection(item.sectionId)}
                        className={`w-full flex items-start gap-3 p-4 rounded-2xl text-left transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-md ${
                          isActive
                            ? "bg-white/80 border-2 border-indigo-500/40 shadow-md"
                            : "bg-white/50 dark:bg-white/10 border border-white/60 hover:bg-white/70 dark:hover:bg-white/15"
                        }`}
                      >
                        <div
                          className={`relative flex size-9 items-center justify-center rounded-full shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
                            isActive
                              ? "bg-indigo-500 text-white"
                              : "bg-indigo-500/10 text-indigo-700 dark:text-indigo-200 group-hover:bg-indigo-500/20"
                          }`}
                        >
                          <item.icon className="size-4" />
                          {isActive && (
                            <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-sm font-semibold transition-colors ${
                              isActive
                                ? "text-indigo-700 dark:text-indigo-200"
                                : "text-slate-900"
                            }`}
                          >
                            {item.title}
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                        <ChevronRight
                          className={`size-4 mt-0.5 shrink-0 transition-all duration-300 ${
                            isActive
                              ? "text-indigo-500 translate-x-0.5"
                              : "text-slate-400 group-hover:translate-x-0.5"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    type="button"
                    onClick={() => setCurrentView("eligibility")}
                    className="w-full h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/25"
                  >
                    Get Started
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentView("reward_rules")}
                    className="w-full h-11 rounded-full bg-slate-900 border border-slate-900 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800"
                  >
                    View Reward Rules
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

const ScrollToPlugin = {
  name: "scrollTo",
  init(target: Window, value: { y: HTMLElement; offsetY: number }) {
    const element = value.y;
    if (!element) return;
    const offsetY = value.offsetY || 0;
    const targetY =
      element.getBoundingClientRect().top + window.scrollY - offsetY;

    // Using window.scrollTo for simple implementation
    return {
      render(ratio: number) {
        window.scrollTo(0, window.scrollY + (targetY - window.scrollY) * ratio);
      },
    };
  },
};

// Simple scroll implementation fallback if ScrollToPlugin is not available or for older browsers
if (typeof window !== "undefined") {
  gsap.registerPlugin({
    name: "scrollTo",
    init(target: Window, value: { y: HTMLElement; offsetY: number }) {
      const element = value.y;
      if (!element) return;

      // Use native smooth scroll if available
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    },
  });
}
