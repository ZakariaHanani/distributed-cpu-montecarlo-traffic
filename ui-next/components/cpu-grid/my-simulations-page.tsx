"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowLeft, FolderOpen, Play, Sparkles, Clock, AlertCircle, CheckCircle2, Eye } from "lucide-react";
import { toast } from "sonner";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { ViewType } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getRoleFromToken,
  getMySimulations,
  getSimulationDetail,
  type SimulationDetail,
  type SimulationListItem,
  ApiError,
  clearToken,
  clearAuthMeta,
  clearDisplayName,
} from "@/lib/authApi";
import { useAuth } from "@/hooks/useAuth";

import { useRouter } from "next/navigation";

type MySimulationsPageProps = {
  setCurrentView?: (view: ViewType) => void;
};

export function MySimulationsPage({ setCurrentView }: MySimulationsPageProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const { token } = useAuth();
  const [isAllowed, setIsAllowed] = useState(false);
  const [simulations, setSimulations] = useState<SimulationListItem[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [activeDetailId, setActiveDetailId] = useState<number | null>(null);
  const [activeDetail, setActiveDetail] = useState<SimulationDetail | null>(
    null
  );
  const [isDetailLoading, setIsDetailLoading] = useState(false);

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
  }, [simulations]); // Re-animate when simulations load

  useEffect(() => {
    const tokenRole = token ? getRoleFromToken(token) : null;
    if (!token) {
      toast("Please sign in");
      router.push("/login");
      return;
    }
    if (tokenRole === "ADMIN") {
      router.push("/");
      return;
    }
    setIsAllowed(true);
  }, [token, setCurrentView]);

  useEffect(() => {
    if (!isAllowed) return;

    let cancelled = false;
    setIsLoading(true);

    const load = async () => {
      try {
        const data = await getMySimulations();
        if (cancelled) return;
        setSimulations(data);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 401) {
          clearToken();
          clearAuthMeta();
          clearDisplayName();
          window.dispatchEvent(new Event("auth:changed"));
          router.push("/login");
          toast("Session expired. Please sign in again.");
          return;
        }
        toast("Failed to load simulations");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [isAllowed, setCurrentView]);

  if (!isAllowed) return null;

  const handleComingSoon = () => {
    toast("Coming soon");
  };

  const handleExportCsv = async () => {
    if (!simulations || simulations.length === 0) {
      toast("No simulations to export.");
      return;
    }

    const toastId = toast.loading("Preparing CSV export (fetching details)...");

    try {
      // Fetch details for all simulations in parallel
      const detailedSims = await Promise.all(
        simulations.map(async (sim) => {
          try {
            return await getSimulationDetail(sim.id);
          } catch {
            return { ...sim, result: null } as SimulationDetail;
          }
        })
      );

      const headers = [
        "ID",
        "Job ID",
        "Status",
        "Grid Size",
        "Number of Cars",
        "Iterations",
        "Weather",
        "Traffic Lights Enabled",
        "Seed",
        "Created At",
        "Updated At",
        "Duration (ms)",
        "Jams Detected",
        "Avg Speed",
        "Min Speed",
        "Max Speed",
        "Accident Prob",
        "Execution Time (ms)",
      ];

      const rows = detailedSims.map((sim) => {
        const res = sim.result;
        return [
          sim.id,
          sim.jobId,
          sim.status,
          sim.gridSize,
          sim.numberOfCars,
          sim.iterations,
          sim.weather,
          sim.trafficLightsEnabled,
          sim.seed,
          `"${formatDate(sim.createdAt)}"`,
          `"${formatDate(sim.updatedAt)}"`,
          sim.status === "COMPLETED"
            ? new Date(sim.updatedAt).getTime() -
              new Date(sim.createdAt).getTime()
            : "N/A",
          res?.totalJamsDetected ?? "—",
          res?.averageSpeed?.toFixed(2) ?? "—",
          res?.minSpeedObserved?.toFixed(2) ?? "—",
          res?.maxSpeedObserved?.toFixed(2) ?? "—",
          res?.accidentProbability != null 
            ? `${(res.accidentProbability * 100).toFixed(1)}%` 
            : "—",
          res?.executionTimeMs ?? "—",
        ].join(",");
      });

      const csvContent = [headers.join(","), ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `simulations_export_${new Date().getTime()}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("CSV export complete", { id: toastId });
    } catch {
      toast.error("Failed to export CSV", { id: toastId });
    }
  };

  const handleExportPdf = async () => {
    if (!simulations || simulations.length === 0) {
      toast("No simulations to export.");
      return;
    }

    const toastId = toast.loading("Preparing PDF export (fetching details)...");

    try {
      // Fetch details for all simulations in parallel
      const detailedSims = await Promise.all(
        simulations.map(async (sim) => {
          try {
            return await getSimulationDetail(sim.id);
          } catch {
            return { ...sim, result: null } as SimulationDetail;
          }
        })
      );

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Add title
      doc.setFontSize(18);
      doc.text("Simulation History Report", 14, 20);
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on ${new Date().toLocaleString()}`, 14, 28);

      autoTable(doc, {
        startY: 35,
        head: [
          [
            "ID",
            "Status",
            "Grid/Cars/Iter",
            "Date",
            "Duration",
            "Jams",
            "Avg Speed",
            "Accident",
          ],
        ],
        body: detailedSims.map((sim) => {
          const res = sim.result;
          return [
            sim.id,
            sim.status,
            `${sim.gridSize}x${sim.gridSize} / ${sim.numberOfCars} / ${sim.iterations}`,
            formatDate(sim.createdAt),
            sim.status === "COMPLETED"
              ? formatDuration(sim.createdAt, sim.updatedAt)
              : "—",
            res?.totalJamsDetected ?? "—",
            res?.averageSpeed?.toFixed(2) ?? "—",
            res?.accidentProbability != null 
              ? `${(res.accidentProbability * 100).toFixed(1)}%` 
              : "—",
          ];
        }),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [63, 81, 181] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });

      doc.save(`simulations_report_${new Date().getTime()}.pdf`);
      toast.success("PDF export complete", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to export PDF", { id: toastId });
    }
  };

  const handleToggleDetails = async (sim: SimulationListItem) => {
    if (activeDetailId === sim.id) {
      setActiveDetailId(null);
      setActiveDetail(null);
      return;
    }

    setActiveDetailId(sim.id);
    setIsDetailLoading(true);

    try {
      const detail = await getSimulationDetail(sim.id);
      setActiveDetail(detail);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        clearToken();
        clearAuthMeta();
        clearDisplayName();
        window.dispatchEvent(new Event("auth:changed"));
        router.push("/login");
        toast("Session expired. Please sign in again.");
        return;
      }
      toast("Failed to load simulation details");
      setActiveDetailId(null);
      setActiveDetail(null);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const getExecutionSeconds = (detail: SimulationDetail | null) => {
    if (!detail) return null;
    const fromResult = detail.result?.executionTimeMs ?? null;
    if (typeof fromResult === "number" && fromResult > 0) {
      return (fromResult / 1000).toFixed(2);
    }
    if (detail.status === "COMPLETED" && detail.updatedAt && detail.createdAt) {
      const ms =
        new Date(detail.updatedAt).getTime() -
        new Date(detail.createdAt).getTime();
      if (ms > 0) return (ms / 1000).toFixed(2);
    }
    return null;
  };

  const formatAccidentProbability = (value: number | null | undefined) => {
    if (value == null) return "—";
    const isPercentValue = value > 1;
    const fraction = isPercentValue ? value / 100 : value;
    return new Intl.NumberFormat(undefined, {
      style: "percent",
      maximumFractionDigits: 1,
    }).format(fraction);
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (start: string, end: string) => {
    const ms = new Date(end).getTime() - new Date(start).getTime();
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-emerald-600 bg-emerald-500/10 ring-emerald-500/20";
      case "FAILED":
        return "text-rose-600 bg-rose-500/10 ring-rose-500/20";
      case "RUNNING":
        return "text-indigo-600 bg-indigo-500/10 ring-indigo-500/20";
      case "PENDING":
        return "text-amber-600 bg-amber-500/10 ring-amber-500/20";
      default:
        return "text-slate-600 bg-slate-500/10 ring-slate-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle2 className="size-3.5" />;
      case "FAILED":
        return <AlertCircle className="size-3.5" />;
      case "RUNNING":
      case "PENDING":
        return <Clock className="size-3.5" />;
      default:
        return <Clock className="size-3.5" />;
    }
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-white dark:bg-[rgb(var(--bg))] pt-24"
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors mb-10"
          data-sim-animate
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="rounded-[3rem] border border-white/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/0.55)] backdrop-blur-2xl shadow-[0_24px_70px_-40px_rgba(15,23,42,0.35)] dark:shadow-[0_24px_70px_-40px_rgba(0,0,0,0.55)] overflow-hidden">
          <div className="px-8 py-8 border-b border-white/60 dark:border-white/10 bg-gradient-to-br from-white/85 via-white/60 to-white/75 dark:from-white/10 dark:via-white/5 dark:to-white/10">
            <div
              className="flex items-start justify-between gap-6"
              data-sim-animate
            >
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  My simulations
                </h1>
                <p className="text-slate-500 dark:text-slate-300 mt-2">
                  Track your Monte Carlo jobs, durations, and results.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/simulations/new")}
                className="
                  h-11 rounded-full px-5
                  bg-white/70 dark:bg-white/5 border-white/60 dark:border-white/10
                  text-slate-900 dark:text-slate-100
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
              className="rounded-[2.75rem] border border-white/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/0.55)] backdrop-blur-2xl shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)] dark:shadow-[0_22px_60px_-44px_rgba(0,0,0,0.55)] overflow-hidden"
              data-sim-animate
            >
              <div className="p-10 sm:p-12">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="rounded-[1.5rem] border border-white/60 dark:border-white/10 bg-white/65 dark:bg-white/5 px-6 py-5"
                      >
                        <div className="grid grid-cols-4 gap-4 items-center">
                          <Skeleton className="h-4 w-32 rounded-full" />
                          <Skeleton className="h-4 w-24 rounded-full" />
                          <Skeleton className="h-4 w-20 rounded-full" />
                          <Skeleton className="h-4 w-28 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : !simulations || simulations.length === 0 ? (
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/26 via-violet-500/22 to-indigo-500/14 blur-[18px] opacity-60" />
                      <div className="relative flex size-16 items-center justify-center rounded-full bg-white/70 dark:bg-white/5 ring-1 ring-white/60 dark:ring-white/10 shadow-[0_18px_50px_-30px_rgba(99,102,241,0.35)]">
                        <FolderOpen className="size-7 text-slate-900/80" />
                      </div>
                    </div>

                    <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                      No simulations yet
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-lg">
                      Launch a new Monte Carlo scenario to see it appear here.
                    </p>

                    <button
                      type="button"
                      onClick={() => router.push("/simulations/new")}
                      className="
                        group relative mt-7 inline-flex h-12 items-center justify-center gap-2
                        rounded-full px-7 text-sm font-semibold text-slate-900 dark:text-slate-100
                        bg-white/85 dark:bg-white/10 ring-1 ring-slate-900/10 dark:ring-white/10
                        shadow-[0_22px_60px_-44px_rgba(15,23,42,0.35)]
                        transition-all duration-200 ease-out
                        hover:-translate-y-[1px]
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60
                      "
                    >
                      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/14 via-violet-500/14 to-indigo-500/8 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      <span className="absolute -inset-px rounded-full bg-gradient-to-r from-indigo-500/40 via-violet-500/32 to-indigo-500/26 opacity-0 blur-[10px] transition-opacity duration-200 group-hover:opacity-65" />
                      <span className="relative inline-flex items-center gap-2">
                        <Play className="size-4 text-indigo-700" />
                        Launch New Simulation
                      </span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Simulation history
                        </div>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-300">
                          Showing {simulations.length} runs
                        </div>
                      </div>
                      <div className="rounded-full border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-2xl p-1 shadow-[0_18px_55px_-44px_rgba(15,23,42,0.25)]">
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleExportCsv}
                            className="h-10 rounded-full bg-white/80 dark:bg-white/5 border-white/60 dark:border-white/10 text-slate-900 dark:text-slate-100"
                          >
                            Export CSV
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleExportPdf}
                            className="h-10 rounded-full bg-white/80 dark:bg-white/5 border-white/60 dark:border-white/10 text-slate-900 dark:text-slate-100"
                          >
                            Export PDF
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {simulations.map((sim) => (
                        <div
                          key={sim.id}
                          className="
                            group relative overflow-hidden
                            rounded-[1.5rem] border border-white/60 dark:border-white/10 
                            bg-white/65 dark:bg-white/5 px-6 py-5
                            transition-all duration-200 ease-out
                            hover:bg-white/90 dark:hover:bg-white/10
                            hover:shadow-[0_18px_50px_-30px_rgba(15,23,42,0.20)]
                          "
                        >
                          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                  #{sim.id}
                                </span>
                                <span className="text-xs text-slate-500 font-mono">
                                  {sim.jobId.slice(0, 8)}...
                                </span>
                                <span
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ${getStatusColor(
                                    sim.status
                                  )}`}
                                >
                                  {getStatusIcon(sim.status)}
                                  {sim.status}
                                </span>
                              </div>
                              <div className="text-sm text-slate-600 dark:text-slate-300">
                                {sim.gridSize}x{sim.gridSize} Grid •{" "}
                                {sim.numberOfCars} Cars • {sim.iterations}{" "}
                                Iterations
                              </div>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                              <div className="flex flex-col items-end">
                                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                  Date
                                </span>
                                <span>{formatDate(sim.createdAt)}</span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                  Duration
                                </span>
                                <span>
                                  {sim.status === "COMPLETED"
                                    ? formatDuration(sim.createdAt, sim.updatedAt)
                                    : "—"}
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleToggleDetails(sim)}
                                className="h-9 rounded-full border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-white/5 text-xs font-semibold inline-flex items-center gap-2 px-3"
                              >
                                <Eye className="size-3.5" />
                                {activeDetailId === sim.id ? "Hide details" : "View details"}
                              </Button>
                            </div>
                          </div>
                          {activeDetailId === sim.id && (
                            <div className="mt-5 pt-4 border-t border-white/70 dark:border-white/10 grid gap-4 sm:grid-cols-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                              {isDetailLoading || !activeDetail ? (
                                <>
                                  <Skeleton className="h-16 rounded-2xl" />
                                  <Skeleton className="h-16 rounded-2xl" />
                                  <Skeleton className="h-16 rounded-2xl" />
                                  <Skeleton className="h-16 rounded-2xl" />
                                </>
                              ) : activeDetail.result ? (
                                <>
                                  <div className="rounded-2xl bg-slate-900 text-slate-50 px-4 py-3 flex flex-col gap-1 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.75)]">
                                    <span className="text-[0.65rem] uppercase tracking-wide text-slate-400">
                                      Jams detected
                                    </span>
                                    <span className="text-base font-semibold">
                                      {activeDetail.result.totalJamsDetected ?? "—"}
                                    </span>
                                  </div>
                                  <div className="rounded-2xl bg-gradient-to-br from-indigo-500/10 via-sky-500/10 to-violet-500/10 px-4 py-3 flex flex-col gap-1">
                                    <span className="text-[0.65rem] uppercase tracking-wide text-slate-500 dark:text-slate-300">
                                      Average speed
                                    </span>
                                    <span className="text-base font-semibold text-slate-900 dark:text-slate-50">
                                      {activeDetail.result.averageSpeed != null
                                        ? `${activeDetail.result.averageSpeed.toFixed(2)} km/h`
                                        : "—"}
                                    </span>
                                  </div>
                                  <div className="rounded-2xl bg-emerald-500/10 px-4 py-3 flex flex-col gap-1">
                                    <span className="text-[0.65rem] uppercase tracking-wide text-emerald-700 dark:text-emerald-200">
                                      Accident probability
                                    </span>
                                    <span className="text-base font-semibold text-emerald-800 dark:text-emerald-100">
                                      {formatAccidentProbability(activeDetail.result.accidentProbability)}
                                    </span>
                                  </div>
                                  <div className="rounded-2xl bg-slate-100 dark:bg-white/5 px-4 py-3 flex flex-col gap-1">
                                    <span className="text-[0.65rem] uppercase tracking-wide text-slate-500 dark:text-slate-300">
                                      Execution time
                                    </span>
                                    <span className="text-base font-semibold text-slate-900 dark:text-slate-50">
                                      {(() => {
                                        const secs = getExecutionSeconds(activeDetail);
                                        return secs != null ? `${secs} s` : "—";
                                      })()}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <div className="sm:col-span-4 rounded-2xl bg-slate-50 dark:bg-white/5 px-4 py-3 text-xs text-slate-600 dark:text-slate-300">
                                  No result data recorded yet for this simulation.
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
