"use client";

import type React from "react";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, RotateCcw, Cloud, Sun, CloudFog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SimulationGridPreview } from "@/components/simulations/simulation-grid-preview";
import {
  SimulationProgressModal,
  type SimulationProgressWorker,
} from "@/components/simulations/simulation-progress-modal";
import { getToken, isAuthenticated } from "@/lib/authApi";
import { Navigation } from "@/components/cpu-grid/navigation";

type Weather = "SUNNY" | "RAINY" | "FOGGY";

const WORKER_COLORS = ["#6366f1", "#8b5cf6", "#f43f5e", "#0ea5e9"];

interface SimulationConfig {
  gridSize: number;
  numberOfCars: number;
  monteCarloIterations: number;
  weather: Weather;
  trafficLightsEnabled: boolean;
}

const DEFAULT_CONFIG: SimulationConfig = {
  gridSize: 5,
  numberOfCars: 100,
  monteCarloIterations: 10000,
  weather: "SUNNY",
  trafficLightsEnabled: true,
};

const apiBaseUrl = (() => {
  const raw =
    process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ?? "http://localhost:8082";
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
})();

export default function NewSimulationPage() {
  const router = useRouter();
  const [config, setConfig] = useState<SimulationConfig>(DEFAULT_CONFIG);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [simulationId, setSimulationId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [workerCount, setWorkerCount] = useState<number | null>(null);
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [expectedChunks, setExpectedChunks] = useState<number | null>(null);
  const [progressWorkers, setProgressWorkers] = useState<
    SimulationProgressWorker[]
  >([]);
  const [hasShownResults, setHasShownResults] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [finalResult, setFinalResult] = useState<any | null>(null);
  const [workerResults, setWorkerResults] = useState<Record<
    string,
    any[]
  > | null>(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const resultsPersistedRef = useRef(false);

  const computeIsAuthed = useCallback(() => {
    return isAuthenticated();
  }, []);

  const openAuthRequired = useCallback(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "simulation_config_draft",
        JSON.stringify(config)
      );
    }
    setShowAuthModal(true);
  }, [config]);

  const startAuthFlow = useCallback(
    (mode: "login" | "signup") => {
      const returnTo = "/simulations/new";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("return_to", returnTo);
      }
      setShowAuthModal(false);
      if (mode === "login") {
        router.push(`/login?returnTo=${encodeURIComponent(returnTo)}`);
        return;
      }
      router.push(`/?view=signup&returnTo=${encodeURIComponent(returnTo)}`);
    },
    [router]
  );

  const requireAuth = useCallback(
    (event: any) => {
      if (isAuthed) return;
      if (event?.preventDefault) event.preventDefault();
      if (event?.stopPropagation) event.stopPropagation();
      if (event?.nativeEvent?.stopImmediatePropagation) {
        event.nativeEvent.stopImmediatePropagation();
      }
      openAuthRequired();
    },
    [isAuthed, openAuthRequired]
  );

  const guardProps = isAuthed
    ? {}
    : {
        onPointerDownCapture: requireAuth,
        onMouseDownCapture: requireAuth,
        onFocusCapture: requireAuth,
        onKeyDownCapture: requireAuth,
      };

  useEffect(() => {
    const sync = () => setIsAuthed(computeIsAuthed());
    sync();

    const onAuthChanged = () => sync();
    const onStorage = (event: StorageEvent) => {
      if (event.key === "auth_token" || event.key === null) sync();
    };
    window.addEventListener("auth:changed", onAuthChanged);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("auth:changed", onAuthChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, [computeIsAuthed]);

  useEffect(() => {
    if (!isAuthed) return;
    if (typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem("simulation_config_draft");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Partial<SimulationConfig>;
      const next: SimulationConfig = {
        ...DEFAULT_CONFIG,
        ...parsed,
      };
      setConfig(next);
    } finally {
      window.sessionStorage.removeItem("simulation_config_draft");
    }
  }, [isAuthed]);

  useEffect(() => {
    if (!isAuthed) return;
    setShowAuthModal(false);
  }, [isAuthed]);

  const buildInitialWorkers = useCallback(
    (count: number): SimulationProgressWorker[] => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const safeCount = Math.max(0, count);
      return Array.from({ length: safeCount }).map((_, i) => ({
        id: `worker-slot-${i}`,
        name: `Worker ${letters[i] ?? String(i + 1)}`,
        status: "PENDING",
        progress: 0,
        accentColor: WORKER_COLORS[i % WORKER_COLORS.length],
      }));
    },
    []
  );

  // Check worker count on mount
  useEffect(() => {
    if (!isAuthed) {
      setWorkerCount(null);
      return;
    }
    let isCancelled = false;

    const fetchWorkers = async () => {
      try {
        const token = getToken();
        const res = await fetch(`${apiBaseUrl}/api/simulations/workers`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) return;
        const data = await res.json().catch(() => null);
        if (!isCancelled && typeof data?.count === "number") {
          setWorkerCount(data.count);
        }
      } catch (err) {
        if (!isCancelled) setWorkerCount((prev) => prev ?? null);
      }
    };

    fetchWorkers();
    const interval = setInterval(fetchWorkers, 3000);
    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [isAuthed]);

  const updateConfig = useCallback(
    <K extends keyof SimulationConfig>(key: K, value: SimulationConfig[K]) => {
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleGridSizeChange = (value: string) => {
    const num = Number.parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= 20) {
      updateConfig("gridSize", num);
    }
  };

  const handleCarsChange = (value: number[]) => {
    updateConfig("numberOfCars", value[0]);
  };

  const handleCarsInputChange = (value: string) => {
    const num = Number.parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= 2000) {
      updateConfig("numberOfCars", num);
    }
  };

  const handleIterationsChange = (value: string) => {
    const num = Number.parseInt(value, 10);
    if (!isNaN(num) && num >= 1) {
      updateConfig("monteCarloIterations", num);
    }
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setJobId(null);
    setSimulationId(null);
    setError(null);
    setJobStatus(null);
    setShowProgressModal(false);
    setExpectedChunks(null);
    setProgressWorkers([]);
    setHasShownResults(false);
    setShowResults(false);
    setFinalResult(null);
    setWorkerResults(null);
    resultsPersistedRef.current = false;
  };

  const handleRunClick = () => {
    if (!isAuthed) {
      openAuthRequired();
      return;
    }
    handleSubmit();
  };

  const handleResetClick = () => {
    if (!isAuthed) {
      openAuthRequired();
      return;
    }
    handleReset();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setJobId(null);
    setSimulationId(null);
    setError(null);
    setJobStatus(null);
    setShowProgressModal(false);
    setExpectedChunks(null);
    setProgressWorkers([]);
    setHasShownResults(false);
    setShowResults(false);
    setFinalResult(null);
    setWorkerResults(null);
    resultsPersistedRef.current = false;

    try {
      const token = getToken();
      const resolvedWorkerCount = await fetch(
        `${apiBaseUrl}/api/simulations/workers`,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      )
        .then((res) => res.json())
        .then((resJson) =>
          typeof resJson?.count === "number" ? resJson.count : 0
        )
        .catch(() => workerCount ?? 0);

      setWorkerCount(resolvedWorkerCount);

      if (resolvedWorkerCount <= 0) {
        throw new Error("No workers available. Start workers before running.");
      }

      // Generate a random seed
      const seed = Math.floor(Math.random() * 1_000_000_000);

      // Map frontend config to backend SimulationParams
      const payload = {
        numberOfCars: config.numberOfCars,
        iterations: config.monteCarloIterations,
        weather: config.weather,
        trafficLightsEnabled: config.trafficLightsEnabled,
        seed: seed,
        gridSize: config.gridSize,
      };

      const response = await fetch(`${apiBaseUrl}/api/simulations`, {
        method: "POST",
        headers: (() => {
          const token = getToken();
          return {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          };
        })(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit simulation");
      }

      const data = await response.json();
      setJobId(data.jobId);
      setSimulationId(
        typeof data.simulationId === "number" ? data.simulationId : null
      );

      const expected = Math.max(
        1,
        Math.min(resolvedWorkerCount, config.monteCarloIterations)
      );
      setExpectedChunks(expected);
      setProgressWorkers(buildInitialWorkers(expected));
      setShowProgressModal(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!jobId || !showProgressModal || !expectedChunks) return;
    let isCancelled = false;

    const poll = async () => {
      try {
        const token = getToken();
        const res = await fetch(
          `${apiBaseUrl}/api/simulations/${jobId}/partials`,
          {
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch partial results");
        const partials = await res.json();
        const completed = Math.min(
          Array.isArray(partials) ? partials.length : 0,
          expectedChunks
        );

        if (isCancelled) return;

        setProgressWorkers((prev) => {
          const base =
            prev.length === expectedChunks
              ? prev
              : buildInitialWorkers(expectedChunks);
          return base.map((w, i) => {
            if (i < completed) {
              return { ...w, status: "COMPLETED", progress: 100 };
            }
            const nextStatus: SimulationProgressWorker["status"] =
              jobStatus === "PENDING" || jobStatus === null
                ? "PENDING"
                : "RUNNING";
            return { ...w, status: nextStatus, progress: 0 };
          });
        });

        if (jobStatus === "COMPLETED" && completed >= expectedChunks) {
          setShowProgressModal(false);
          return;
        }
        setTimeout(poll, 1000);
      } catch (e: any) {
        setTimeout(poll, 1500);
      }
    };

    poll();
    return () => {
      isCancelled = true;
    };
  }, [
    jobId,
    showProgressModal,
    expectedChunks,
    jobStatus,
    buildInitialWorkers,
  ]);

  // Poll for job completion and fetch results
  useEffect(() => {
    if (!jobId) return;
    let isCancelled = false;
    const poll = async () => {
      try {
        const token = getToken();
        const res = await fetch(`${apiBaseUrl}/api/simulations/${jobId}`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error("Failed to fetch job status");
        const jr = await res.json();
        if (!isCancelled) setJobStatus(jr.status);
        if (jr.status === "COMPLETED") {
          const finalRes = jr.result;
          const wrRes = await fetch(
            `${apiBaseUrl}/api/simulations/${jobId}/worker-results`,
            {
              headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
            }
          );
          const wr = wrRes.ok ? await wrRes.json() : {};
          if (!isCancelled) {
            setFinalResult(finalRes);
            setWorkerResults(wr);
          }
        } else if (jr.status === "FAILED") {
          if (!isCancelled) {
            setError(jr.errorMessage || "Simulation failed");
          }
        } else {
          setTimeout(poll, 1000);
        }
      } catch (e: any) {
        setTimeout(poll, 1500);
      }
    };
    poll();
    return () => {
      isCancelled = true;
    };
  }, [jobId]);

  useEffect(() => {
    if (!isAuthed) return;
    if (!simulationId) return;
    if (jobStatus !== "COMPLETED") return;
    if (!finalResult) return;
    if (resultsPersistedRef.current) return;
    resultsPersistedRef.current = true;

    const persist = async () => {
      const token = getToken();
      const payload = {
        totalJamsDetected: finalResult?.totalJamsDetected ?? null,
        averageSpeed: finalResult?.averageSpeed ?? null,
        minSpeedObserved: finalResult?.minSpeedObserved ?? null,
        maxSpeedObserved: finalResult?.maxSpeedObserved ?? null,
        accidentProbability: finalResult?.accidentProbability ?? null,
        congestionMap: finalResult?.congestionMap ?? null,
        metrics: finalResult?.metrics ?? null,
        executionTimeMs: finalResult?.executionTimeMs ?? null,
      };

      const res = await fetch(
        `${apiBaseUrl}/api/simulations/${simulationId}/results`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        resultsPersistedRef.current = false;
        return;
      }
    };

    persist();
  }, [isAuthed, simulationId, jobStatus, finalResult]);

  useEffect(() => {
    if (!finalResult) return;
    if (showProgressModal) return;
    if (hasShownResults) return;
    setShowResults(true);
    setHasShownResults(true);
  }, [finalResult, showProgressModal, hasShownResults]);

  const weatherIcons: Record<Weather, React.ReactNode> = {
    SUNNY: <Sun className="w-4 h-4" />,
    RAINY: <Cloud className="w-4 h-4" />,
    FOGGY: <CloudFog className="w-4 h-4" />,
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      <Navigation />
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent
          overlayClassName="bg-black/35 backdrop-blur-xl"
          className="rounded-[2.5rem] border border-white/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/0.65)] p-0 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.35)] dark:shadow-[0_24px_70px_-40px_rgba(0,0,0,0.55)]"
        >
          <div className="relative overflow-hidden rounded-[2.5rem]">
            <div className="absolute -inset-12 bg-gradient-to-br from-indigo-500/20 via-violet-500/18 to-rose-500/10 blur-3xl opacity-80" />
            <div className="relative p-7 sm:p-8">
              <DialogHeader className="text-left">
                <DialogTitle className="text-slate-900 dark:text-slate-100">
                  Authentication required
                </DialogTitle>
                <DialogDescription className="text-slate-600 dark:text-slate-300">
                  Please sign up or log in first to launch a simulation. You can
                  preview the grid, but you need an account to configure and run
                  distributed simulations.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 grid gap-3">
                <Button
                  type="button"
                  onClick={() => startAuthFlow("login")}
                  className="h-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-100 transition-all duration-200 ease-out"
                >
                  Continue with Login
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => startAuthFlow("signup")}
                  className="h-12 rounded-full bg-white/60 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-xl border border-indigo-500/20 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] text-slate-900 dark:text-slate-100 shadow-[0_14px_45px_-34px_rgba(15,23,42,0.25)] dark:shadow-[0_14px_45px_-34px_rgba(0,0,0,0.55)] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-[0_22px_70px_-44px_rgba(99,102,241,0.40)]"
                >
                  Create Account
                </Button>
                <DialogClose asChild>
                  <button
                    type="button"
                    className="mt-1 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                  >
                    Cancel
                  </button>
                </DialogClose>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        {/* Header */}
        <div className="mb-8 lg:mb-12 text-center lg:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors mb-6 lg:mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
            Start New Simulation
          </h1>
          <p className="text-slate-500 dark:text-slate-300 text-base lg:text-lg">
            Configure your distributed Monte Carlo traffic simulation
            parameters.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-stretch justify-center lg:justify-between">
          {/* Configuration Panel */}
          <div className="w-full lg:w-1/2 lg:max-w-md space-y-8">
            {/* Grid Size */}
            <div className="space-y-3">
              <Label
                htmlFor="gridSize"
                className="text-slate-900 dark:text-slate-100 font-medium"
              >
                Grid Size
              </Label>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Generates a grid of N × N intersections (1-20)
              </p>
              <Input
                id="gridSize"
                type="number"
                min={1}
                max={20}
                value={config.gridSize}
                onChange={(e) => {
                  if (!isAuthed) {
                    openAuthRequired();
                    return;
                  }
                  handleGridSizeChange(e.target.value);
                }}
                className="h-12 rounded-xl max-w-[120px]"
                {...guardProps}
              />
            </div>

            {/* Number of Cars */}
            <div className="space-y-3">
              <Label
                htmlFor="numberOfCars"
                className="text-slate-900 dark:text-slate-100 font-medium"
              >
                Number of Cars
              </Label>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Total vehicles in the simulation (1-2000)
              </p>
              <div className="flex items-center gap-4 lg:gap-6">
                <Slider
                  value={[config.numberOfCars]}
                  onValueChange={(value) => {
                    if (!isAuthed) {
                      openAuthRequired();
                      return;
                    }
                    handleCarsChange(value);
                  }}
                  min={1}
                  max={2000}
                  step={1}
                  className="flex-1"
                  {...guardProps}
                />
                <Input
                  id="numberOfCars"
                  type="number"
                  min={1}
                  max={2000}
                  value={config.numberOfCars}
                  onChange={(e) => {
                    if (!isAuthed) {
                      openAuthRequired();
                      return;
                    }
                    handleCarsInputChange(e.target.value);
                  }}
                  className="h-12 rounded-xl w-[100px]"
                  {...guardProps}
                />
              </div>
            </div>

            {/* Monte Carlo Iterations */}
            <div className="space-y-3">
              <Label
                htmlFor="iterations"
                className="text-slate-900 dark:text-slate-100 font-medium"
              >
                Monte Carlo Iterations
              </Label>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Number of simulation iterations to run
              </p>
              <Input
                id="iterations"
                type="number"
                min={1}
                value={config.monteCarloIterations}
                onChange={(e) => {
                  if (!isAuthed) {
                    openAuthRequired();
                    return;
                  }
                  handleIterationsChange(e.target.value);
                }}
                className="h-12 rounded-xl max-w-[160px]"
                {...guardProps}
              />
            </div>

            {/* Weather */}
            <div className="space-y-3">
              <Label className="text-slate-900 dark:text-slate-100 font-medium">
                Weather
              </Label>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Environmental conditions for the simulation
              </p>
              <Select
                value={config.weather}
                onValueChange={(value: Weather) => {
                  if (!isAuthed) {
                    openAuthRequired();
                    return;
                  }
                  updateConfig("weather", value);
                }}
              >
                <SelectTrigger
                  className="h-12 rounded-xl w-[180px]"
                  {...guardProps}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUNNY">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-500" />
                      Sunny
                    </div>
                  </SelectItem>
                  <SelectItem value="RAINY">
                    <div className="flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-blue-500" />
                      Rainy
                    </div>
                  </SelectItem>
                  <SelectItem value="FOGGY">
                    <div className="flex items-center gap-2">
                      <CloudFog className="w-4 h-4 text-slate-500" />
                      Foggy
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Traffic Lights Toggle */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label
                    htmlFor="trafficLights"
                    className="text-slate-900 dark:text-slate-100 font-medium"
                  >
                    Enable Traffic Lights
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-300">
                    Include traffic light signals at intersections
                  </p>
                </div>
                <Switch
                  id="trafficLights"
                  checked={config.trafficLightsEnabled}
                  onCheckedChange={(checked) => {
                    if (!isAuthed) {
                      openAuthRequired();
                      return;
                    }
                    updateConfig("trafficLightsEnabled", checked);
                  }}
                  {...guardProps}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
              {isAuthed && workerCount === 0 && !isSubmitting ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="w-full sm:w-auto">
                      <Button
                        onClick={handleRunClick}
                        disabled
                        className="h-12 w-full sm:w-auto px-8 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-100 rounded-xl"
                      >
                        <span className="flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Run Distributed Simulation
                        </span>
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    sideOffset={10}
                    className="max-w-[280px]"
                  >
                    No workers are currently available. Start worker nodes to
                    run this simulation.
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Button
                  onClick={handleRunClick}
                  disabled={isSubmitting}
                  className="h-12 w-full sm:w-auto px-8 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-100 rounded-xl"
                  {...guardProps}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Running...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Run Distributed Simulation
                    </span>
                  )}
                </Button>
              )}

              <Button
                variant="outline"
                onClick={handleResetClick}
                className="h-12 w-full sm:w-auto px-6 rounded-xl bg-transparent"
                {...guardProps}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Configuration
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:max-w-2xl lg:ml-auto lg:-mt-28">
            {/* Status Messages */}
            {jobId && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <h3 className="text-green-800 font-semibold mb-1">
                  Simulation Started Successfully!
                </h3>
                <p className="text-green-700 text-sm">
                  Job ID: <span className="font-mono font-bold">{jobId}</span>
                </p>
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <h3 className="text-red-800 font-semibold mb-1">
                  Error Starting Simulation
                </h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Simulation Grid Preview */}
            <div className="bg-slate-50 dark:bg-[rgb(var(--glass)/0.35)] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-white/10 lg:sticky lg:top-8 lg:translate-x-48">
              <SimulationGridPreview
                gridSize={config.gridSize}
                numberOfCars={config.numberOfCars}
                trafficLightsEnabled={config.trafficLightsEnabled}
                activeWorkers={workerCount}
              />
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-300">
                <span>
                  {config.gridSize * config.gridSize} total intersections
                </span>
                <span className="flex items-center gap-1">
                  {weatherIcons[config.weather]}
                  {config.weather.charAt(0) +
                    config.weather.slice(1).toLowerCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {jobId && (
        <SimulationProgressModal
          open={showProgressModal}
          onOpenChange={setShowProgressModal}
          jobId={jobId}
          workers={progressWorkers}
        />
      )}

      {/* Results Popup */}
      {showResults && finalResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-2xl mx-4 bg-white dark:bg-[rgb(var(--glass)/0.9)] rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Monte Carlo Results
              </h3>
            </div>
            <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="text-sm text-slate-500 dark:text-slate-300">
                    Total Jams
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {finalResult.totalJamsDetected}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="text-sm text-slate-500 dark:text-slate-300">
                    Average Speed
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {Number(finalResult.averageSpeed).toFixed(2)}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="text-sm text-slate-500 dark:text-slate-300">
                    Min Speed
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {Number(finalResult.minSpeedObserved).toFixed(2)}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="text-sm text-slate-500 dark:text-slate-300">
                    Max Speed
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {Number(finalResult.maxSpeedObserved).toFixed(2)}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="text-sm text-slate-500 dark:text-slate-300">
                    Accident Probability
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {Number(finalResult.accidentProbability).toFixed(2)}%
                  </div>
                </div>
              </div>
              {workerResults && (
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Per-Worker Results
                  </div>
                  <div className="space-y-2 max-h-64 overflow-auto pr-2">
                    {Object.entries(workerResults).map(([wid, results]) => (
                      <div
                        key={wid}
                        className="p-3 rounded-xl border border-slate-200 dark:border-white/10"
                      >
                        <div className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                          Worker: <span className="font-mono">{wid}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {results.map((r: any, idx: number) => (
                            <div
                              key={idx}
                              className="text-xs text-slate-600 dark:text-slate-300"
                            >
                              <span className="font-semibold">Task:</span>{" "}
                              {r.taskId || "N/A"} •
                              <span className="ml-1 font-semibold">Avg:</span>{" "}
                              {Number(r.averageSpeed).toFixed(2)} •
                              <span className="ml-1 font-semibold">Jams:</span>{" "}
                              {r.totalJamsDetected}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowResults(false)}
                className="w-full sm:flex-1 h-12 rounded-xl border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200"
              >
                Close
              </Button>
              <Button
                onClick={() => router.push("/simulations")}
                className="w-full sm:flex-[2] h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-100 shadow-lg shadow-indigo-500/10 transition-all duration-200"
              >
                View My Simulations
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
