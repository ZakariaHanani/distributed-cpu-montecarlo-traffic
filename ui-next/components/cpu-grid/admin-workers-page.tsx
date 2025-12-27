"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Gauge,
  RefreshCcw,
  Search,
  Send,
  ShieldOff,
  Trash2,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNowStrict } from "date-fns";

import type { ViewType } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRoleFromToken, getToken } from "@/lib/authApi";

type AdminWorkersPageProps = {
  setCurrentView: (view: ViewType) => void;
};

type WorkerStatus = "AVAILABLE" | "BUSY" | "OFFLINE";

type WorkerRow = {
  id: string;
  status: WorkerStatus;
  tasksProcessed: number;
  currentJob: string;
  lastHeartbeatAt: Date;
  latencyMs: number;
  loadPct: number;
};

type SortKey = "tasks" | "heartbeat";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function statusTone(status: WorkerStatus) {
  if (status === "AVAILABLE") {
    return {
      pill: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/20",
      dot: "bg-emerald-500",
      pulse: "animate-pulse",
    };
  }
  if (status === "BUSY") {
    return {
      pill: "bg-amber-500/15 text-amber-700 ring-amber-500/20",
      dot: "bg-amber-500",
      pulse: "",
    };
  }
  return {
    pill: "bg-slate-500/10 text-slate-600 ring-slate-500/15",
    dot: "bg-slate-500",
    pulse: "",
  };
}

export function AdminWorkersPage({ setCurrentView }: AdminWorkersPageProps) {
  const [isAllowed, setIsAllowed] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  const [workers, setWorkers] = useState<WorkerRow[]>(() => {
    const now = Date.now();
    return [
      {
        id: "worker-01:9001",
        status: "AVAILABLE",
        tasksProcessed: 183,
        currentJob: "—",
        lastHeartbeatAt: new Date(now - 1000 * 2),
        latencyMs: 34,
        loadPct: 28,
      },
      {
        id: "worker-02:9001",
        status: "BUSY",
        tasksProcessed: 412,
        currentJob: "MonteCarloBatch#842",
        lastHeartbeatAt: new Date(now - 1000 * 6),
        latencyMs: 58,
        loadPct: 72,
      },
      {
        id: "worker-03:9001",
        status: "OFFLINE",
        tasksProcessed: 71,
        currentJob: "—",
        lastHeartbeatAt: new Date(now - 1000 * 60 * 8),
        latencyMs: 0,
        loadPct: 0,
      },
      {
        id: "worker-04:9001",
        status: "AVAILABLE",
        tasksProcessed: 965,
        currentJob: "—",
        lastHeartbeatAt: new Date(now - 1000 * 3),
        latencyMs: 41,
        loadPct: 36,
      },
    ];
  });

  const [statusFilter, setStatusFilter] = useState<"ALL" | WorkerStatus>("ALL");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("tasks");

  const [removeId, setRemoveId] = useState<string | null>(null);
  const [removeOpen, setRemoveOpen] = useState(false);

  const timeoutsRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const token = getToken();
    const tokenRole = token ? getRoleFromToken(token) : null;
    if (!token || tokenRole !== "ADMIN") {
      toast("Admin access required");
      setCurrentView("home");
      return;
    }
    setIsAllowed(true);
  }, [setCurrentView]);

  useEffect(() => {
    const t = window.setTimeout(() => setIsBooting(false), 600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
      for (const timeoutId of timeoutsRef.current.values()) {
        window.clearTimeout(timeoutId);
      }
      timeoutsRef.current.clear();
    };
  }, []);

  const filteredWorkers = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = workers;
    if (statusFilter !== "ALL") {
      list = list.filter((w) => w.status === statusFilter);
    }
    if (q) {
      list = list.filter((w) => w.id.toLowerCase().includes(q));
    }
    const sorted = [...list].sort((a, b) => {
      if (sortKey === "tasks") return b.tasksProcessed - a.tasksProcessed;
      return b.lastHeartbeatAt.getTime() - a.lastHeartbeatAt.getTime();
    });
    return sorted;
  }, [workers, statusFilter, search, sortKey]);

  const kpis = useMemo(() => {
    const active = workers.filter((w) => w.status !== "OFFLINE").length;
    const busy = workers.filter((w) => w.status === "BUSY").length;
    const totalTasks = workers.reduce((sum, w) => sum + w.tasksProcessed, 0);
    const avgLatency = (() => {
      const pool = workers.filter(
        (w) => w.status !== "OFFLINE" && w.latencyMs > 0
      );
      if (!pool.length) return 0;
      const sum = pool.reduce((s, w) => s + w.latencyMs, 0);
      return Math.round(sum / pool.length);
    })();
    return { active, busy, totalTasks, avgLatency };
  }, [workers]);

  const refresh = () => {
    setIsBooting(true);
    window.setTimeout(() => setIsBooting(false), 600);
    toast("Refreshed (placeholder)");
  };

  const pingWorker = (id: string) => {
    toast("Ping sent (placeholder)");
    setWorkers((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              lastHeartbeatAt: new Date(),
              latencyMs: clamp(w.latencyMs + 2, 8, 120),
            }
          : w
      )
    );
  };

  const toggleDisable = (id: string) => {
    setWorkers((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.status === "OFFLINE") {
          return {
            ...w,
            status: "AVAILABLE",
            lastHeartbeatAt: new Date(),
            latencyMs: w.latencyMs || 40,
            loadPct: clamp(w.loadPct || 18, 0, 100),
          };
        }
        return {
          ...w,
          status: "OFFLINE",
          currentJob: "—",
          loadPct: 0,
          latencyMs: 0,
        };
      })
    );
  };

  const assignTestTask = (id: string) => {
    setWorkers((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.status === "OFFLINE") return w;
        return {
          ...w,
          status: "BUSY",
          currentJob: "TestTask#LOCAL",
          loadPct: clamp(Math.max(w.loadPct, 65), 0, 100),
          latencyMs: clamp(Math.max(w.latencyMs, 45), 0, 999),
          lastHeartbeatAt: new Date(),
        };
      })
    );

    const existing = timeoutsRef.current.get(id);
    if (existing) window.clearTimeout(existing);

    const timeoutId = window.setTimeout(() => {
      if (!timeoutsRef.current.has(id)) return;
      setWorkers((prev) =>
        prev.map((w) => {
          if (w.id !== id) return w;
          if (w.status === "OFFLINE") return w;
          return {
            ...w,
            status: "AVAILABLE",
            currentJob: "—",
            loadPct: clamp(Math.max(18, w.loadPct - 32), 0, 100),
            lastHeartbeatAt: new Date(),
          };
        })
      );
      timeoutsRef.current.delete(id);
    }, 2000);

    timeoutsRef.current.set(id, timeoutId);
    toast("Assigned test task (placeholder)");
  };

  const requestRemove = (id: string) => {
    setRemoveId(id);
    setRemoveOpen(true);
  };

  const confirmRemove = () => {
    if (!removeId) return;
    setWorkers((prev) => prev.filter((w) => w.id !== removeId));
    setRemoveOpen(false);
    setRemoveId(null);
    toast("Worker removed (placeholder)");
  };

  const addWorker = () => {
    const id = `worker-${String(workers.length + 1).padStart(2, "0")}:${
      9001 + (workers.length % 3)
    }`;
    setWorkers((prev) => [
      {
        id,
        status: "AVAILABLE",
        tasksProcessed: Math.round(40 + Math.random() * 90),
        currentJob: "—",
        lastHeartbeatAt: new Date(),
        latencyMs: Math.round(22 + Math.random() * 40),
        loadPct: Math.round(15 + Math.random() * 40),
      },
      ...prev,
    ]);
    toast("Worker registered (placeholder)");
  };

  if (!isAllowed) return null;

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <button
          onClick={() => setCurrentView("home")}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="relative overflow-hidden rounded-[3rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_24px_70px_-40px_rgba(15,23,42,0.35)]">
          <div className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="relative p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                  Workers Monitoring
                </h1>
                <p className="text-slate-500 mt-2">
                  Observe worker health, load, and throughput across the
                  cluster.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={addWorker}
                  className="h-11 rounded-full bg-white/70"
                >
                  <Wrench className="size-4 mr-2" />
                  Register worker
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={refresh}
                  className="h-11 rounded-full bg-white/70"
                >
                  <RefreshCcw className="size-4 mr-2" />
                  Refresh
                </Button>
                <Select
                  value={statusFilter}
                  onValueChange={(v) =>
                    setStatusFilter(v as "ALL" | WorkerStatus)
                  }
                >
                  <SelectTrigger className="h-11 rounded-full bg-white/70 w-[220px]">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All statuses</SelectItem>
                    <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
                    <SelectItem value="BUSY">BUSY</SelectItem>
                    <SelectItem value="OFFLINE">OFFLINE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {isBooting ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-28 rounded-[2.25rem] border border-white/60 bg-white/80 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-28 rounded-full" />
                      <Skeleton className="h-9 w-9 rounded-full" />
                    </div>
                    <div className="mt-4">
                      <Skeleton className="h-8 w-20 rounded-full" />
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="h-28 rounded-[2.25rem] border border-white/60 bg-white/80 p-6 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-wide text-slate-500">
                        Active workers
                      </span>
                      <span className="flex size-9 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-700">
                        <Gauge className="size-4" />
                      </span>
                    </div>
                    <div className="mt-3 text-3xl font-semibold text-slate-900">
                      {kpis.active}
                    </div>
                  </div>

                  <div className="h-28 rounded-[2.25rem] border border-white/60 bg-white/80 p-6 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-wide text-slate-500">
                        Busy workers
                      </span>
                      <span className="flex size-9 items-center justify-center rounded-full bg-amber-500/12 text-amber-700">
                        <Gauge className="size-4" />
                      </span>
                    </div>
                    <div className="mt-3 text-3xl font-semibold text-slate-900">
                      {kpis.busy}
                    </div>
                  </div>

                  <div className="h-28 rounded-[2.25rem] border border-white/60 bg-white/80 p-6 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-wide text-slate-500">
                        Total tasks processed
                      </span>
                      <span className="flex size-9 items-center justify-center rounded-full bg-indigo-500/12 text-indigo-700">
                        <Gauge className="size-4" />
                      </span>
                    </div>
                    <div className="mt-3 text-3xl font-semibold text-slate-900">
                      {kpis.totalTasks}
                    </div>
                  </div>

                  <div className="h-28 rounded-[2.25rem] border border-white/60 bg-white/80 p-6 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-wide text-slate-500">
                        Avg worker latency
                      </span>
                      <span className="flex size-9 items-center justify-center rounded-full bg-rose-500/12 text-rose-700">
                        <Gauge className="size-4" />
                      </span>
                    </div>
                    <div className="mt-3 text-3xl font-semibold text-slate-900">
                      {kpis.avgLatency}ms
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="relative max-w-md w-full">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by worker ID"
                  className="h-12 pl-11 rounded-full bg-white/80 border-white/60"
                />
              </div>

              <Select
                value={sortKey}
                onValueChange={(v) => setSortKey(v as SortKey)}
              >
                <SelectTrigger className="h-12 rounded-full bg-white/70 w-[240px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tasks">Sort by tasks processed</SelectItem>
                  <SelectItem value="heartbeat">
                    Sort by last heartbeat
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6 rounded-[2.5rem] border border-white/60 bg-white/80 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)] overflow-hidden">
              {isBooting ? (
                <div className="p-6 grid gap-3">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <Skeleton
                      key={idx}
                      className="h-16 rounded-[1.75rem] border border-white/60 bg-white/70"
                    />
                  ))}
                </div>
              ) : (
                <Table className="w-full">
                  <TableHeader className="bg-white/70">
                    <TableRow>
                      <TableHead className="px-6">Worker</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tasks</TableHead>
                      <TableHead>Current job</TableHead>
                      <TableHead>Last heartbeat</TableHead>
                      <TableHead>Load</TableHead>
                      <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWorkers.map((w) => {
                      const tone = statusTone(w.status);
                      return (
                        <TableRow
                          key={w.id}
                          className="transition-transform duration-200 hover:-translate-y-[2px] hover:bg-slate-900/[0.03]"
                        >
                          <TableCell className="px-6">
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-slate-900">
                                {w.id}
                              </span>
                              <span className="text-xs text-slate-500">
                                latency {w.latencyMs ? `${w.latencyMs}ms` : "—"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${tone.pill}`}
                            >
                              <span
                                className={`size-2 rounded-full ${tone.dot} ${tone.pulse}`}
                              />
                              {w.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-slate-700 font-medium">
                            {w.tasksProcessed}
                          </TableCell>
                          <TableCell className="text-slate-700">
                            {w.currentJob}
                          </TableCell>
                          <TableCell className="text-slate-600">
                            {formatDistanceToNowStrict(w.lastHeartbeatAt, {
                              addSuffix: true,
                            })}
                          </TableCell>
                          <TableCell>
                            <div className="w-[160px]">
                              <div className="h-2.5 rounded-full bg-slate-200/80 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500 transition-[width] duration-500"
                                  style={{
                                    width: `${clamp(w.loadPct, 0, 100)}%`,
                                  }}
                                />
                              </div>
                              <div className="mt-2 text-[11px] text-slate-500">
                                {clamp(w.loadPct, 0, 100)}%
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <div className="inline-flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => pingWorker(w.id)}
                                className="h-9 rounded-full px-4 bg-white/70"
                              >
                                <Send className="size-4 mr-2" />
                                Ping
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => toggleDisable(w.id)}
                                className="h-9 rounded-full px-4 bg-white/70"
                              >
                                <ShieldOff className="size-4 mr-2" />
                                {w.status === "OFFLINE" ? "Enable" : "Disable"}
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => assignTestTask(w.id)}
                                className="h-9 rounded-full px-4 bg-white/70"
                                disabled={w.status === "OFFLINE"}
                              >
                                Assign test task
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => requestRemove(w.id)}
                                className="h-9 rounded-full px-4 bg-white/70 text-rose-700 hover:text-rose-800"
                              >
                                <Trash2 className="size-4 mr-2" />
                                Remove
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={removeOpen} onOpenChange={setRemoveOpen}>
        <AlertDialogContent className="rounded-[1.75rem]">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove worker?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the worker from the list in the UI only.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemove}
              className="bg-rose-600 hover:bg-rose-700"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
