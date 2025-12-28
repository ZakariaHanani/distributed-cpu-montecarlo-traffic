"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowLeft, Search, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

import type { ViewType } from "@/app/page";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRoleFromToken, getToken } from "@/lib/authApi";

type AdminAuditPageProps = {
  setCurrentView: (view: ViewType) => void;
};

type AuditType = "AUTH" | "WORKER" | "SECURITY";

type AuditStatus = "SUCCESS" | "FAIL";

type AuditEvent = {
  id: string;
  type: AuditType;
  message: string;
  timestamp: string;
  actor: string;
  status: AuditStatus;
};

type FilterKey = "ALL" | "AUTH" | "WORKERS" | "SECURITY";

const MOCK_EVENTS: AuditEvent[] = [
  {
    id: "evt-1",
    type: "SECURITY",
    message: "Invalid login attempt",
    timestamp: "2m ago",
    actor: "unknown@client",
    status: "FAIL",
  },
  {
    id: "evt-2",
    type: "AUTH",
    message: "Admin signed in",
    timestamp: "12m ago",
    actor: "admin@cpugrid.local",
    status: "SUCCESS",
  },
  {
    id: "evt-3",
    type: "WORKER",
    message: "Worker registered",
    timestamp: "38m ago",
    actor: "worker-02:9001",
    status: "SUCCESS",
  },
  {
    id: "evt-4",
    type: "SECURITY",
    message: "Password changed",
    timestamp: "1h ago",
    actor: "admin@cpugrid.local",
    status: "SUCCESS",
  },
  {
    id: "evt-5",
    type: "AUTH",
    message: "User signed in",
    timestamp: "2h ago",
    actor: "client.user@domain",
    status: "SUCCESS",
  },
  {
    id: "evt-6",
    type: "WORKER",
    message: "Worker heartbeat timeout",
    timestamp: "Yesterday",
    actor: "worker-03:9001",
    status: "FAIL",
  },
  {
    id: "evt-7",
    type: "SECURITY",
    message: "Audit export requested",
    timestamp: "Yesterday",
    actor: "admin@cpugrid.local",
    status: "SUCCESS",
  },
  {
    id: "evt-8",
    type: "WORKER",
    message: "Worker registered",
    timestamp: "2d ago",
    actor: "worker-04:9001",
    status: "SUCCESS",
  },
  {
    id: "evt-9",
    type: "AUTH",
    message: "Session revoked",
    timestamp: "3d ago",
    actor: "admin@cpugrid.local",
    status: "SUCCESS",
  },
];

const FILTER_PILLS: Array<{ key: FilterKey; label: string }> = [
  { key: "ALL", label: "All" },
  { key: "AUTH", label: "Auth" },
  { key: "WORKERS", label: "Workers" },
  { key: "SECURITY", label: "Security" },
];

function typeTone(type: AuditType) {
  if (type === "AUTH") {
    return "bg-indigo-500/12 text-indigo-700 ring-indigo-500/20";
  }
  if (type === "WORKER") {
    return "bg-violet-500/12 text-violet-700 ring-violet-500/20";
  }
  return "bg-amber-500/14 text-amber-800 ring-amber-500/25";
}

function statusTone(status: AuditStatus) {
  if (status === "SUCCESS") {
    return "bg-emerald-500/12 text-emerald-700 ring-emerald-500/20";
  }
  return "bg-rose-500/12 text-rose-700 ring-rose-500/20";
}

export function AdminAuditPage({ setCurrentView }: AdminAuditPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  const [filter, setFilter] = useState<FilterKey>("ALL");
  const [search, setSearch] = useState("");
  const [range, setRange] = useState<"24H" | "7D" | "30D">("24H");

  useLayoutEffect(() => {
    if (!isAllowed || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const header = gsap.utils.toArray<HTMLElement>("[data-audit-animate]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-audit-row]");
      gsap.fromTo(
        header,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.05,
          clearProps: "transform",
        }
      );
      gsap.fromTo(
        rows,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.045,
          delay: 0.08,
          clearProps: "transform",
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [isAllowed, isBooting]);

  useEffect(() => {
    const token = getToken();
    const role = token ? getRoleFromToken(token) : null;
    if (!token) {
      toast("Please sign in");
      setCurrentView("login");
      return;
    }
    if (role !== "ADMIN") {
      toast("Not authorized");
      setCurrentView("home");
      return;
    }
    setIsAllowed(true);
  }, [setCurrentView]);

  useEffect(() => {
    if (!isAllowed) return;
    const t = window.setTimeout(() => setIsBooting(false), 650);
    return () => window.clearTimeout(t);
  }, [isAllowed]);

  const visibleEvents = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MOCK_EVENTS.filter((evt) => {
      const filterOk =
        filter === "ALL" ||
        (filter === "AUTH" && evt.type === "AUTH") ||
        (filter === "WORKERS" && evt.type === "WORKER") ||
        (filter === "SECURITY" && evt.type === "SECURITY");
      if (!filterOk) return false;
      if (!q) return true;
      return (
        evt.message.toLowerCase().includes(q) ||
        evt.actor.toLowerCase().includes(q) ||
        evt.type.toLowerCase().includes(q) ||
        evt.status.toLowerCase().includes(q) ||
        evt.timestamp.toLowerCase().includes(q)
      );
    });
  }, [filter, search]);

  if (!isAllowed) return null;

  return (
    <div ref={rootRef} className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <button
          type="button"
          onClick={() => setCurrentView("home")}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-10"
          data-audit-animate
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[3rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_30px_90px_-50px_rgba(15,23,42,0.42)] overflow-hidden">
            <div className="px-8 py-8 border-b border-white/60 bg-gradient-to-br from-white/90 via-white/65 to-white/80">
              <div
                className="flex items-start justify-between gap-6"
                data-audit-animate
              >
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                    System Logs
                  </h1>
                  <p className="text-slate-500 mt-2">
                    Recent security events, sign-ins, and worker registrations.
                  </p>
                </div>
                <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/15 via-indigo-500/10 to-violet-500/10 ring-1 ring-white/60 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.25)]">
                  <ShieldAlert className="size-5 text-slate-900/75" />
                </div>
              </div>

              <div
                className="mt-7 rounded-[2.25rem] border border-white/60 bg-white/70 backdrop-blur-2xl p-4 shadow-[0_18px_55px_-42px_rgba(15,23,42,0.22)]"
                data-audit-animate
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    {FILTER_PILLS.map((pill) => {
                      const active = pill.key === filter;
                      return (
                        <button
                          key={pill.key}
                          type="button"
                          onClick={() => setFilter(pill.key)}
                          className={[
                            "h-9 px-4 rounded-full text-sm font-semibold transition-all duration-200 ease-out",
                            active
                              ? "bg-slate-900 text-white shadow-[0_18px_55px_-42px_rgba(15,23,42,0.30)]"
                              : "bg-white/75 text-slate-800 ring-1 ring-slate-900/10 hover:bg-white",
                          ].join(" ")}
                        >
                          {pill.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <div className="relative w-full sm:w-[260px]">
                      <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search events…"
                        className="h-11 rounded-full bg-white/80 border-white/60 pl-11 text-slate-800 shadow-[0_12px_35px_-28px_rgba(15,23,42,0.25)]"
                      />
                    </div>

                    <Select
                      value={range}
                      onValueChange={(v) => setRange(v as "24H" | "7D" | "30D")}
                    >
                      <SelectTrigger className="h-11 w-full sm:w-[160px] rounded-full bg-white/80 border-white/60 shadow-[0_12px_35px_-28px_rgba(15,23,42,0.25)]">
                        <SelectValue placeholder="Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24H">Last 24h</SelectItem>
                        <SelectItem value="7D">Last 7d</SelectItem>
                        <SelectItem value="30D">Last 30d</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="rounded-[2.5rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_22px_60px_-44px_rgba(15,23,42,0.28)] overflow-hidden">
                <div className="px-7 py-5 border-b border-white/60">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">
                      Audit stream
                    </span>
                    <span className="text-xs text-slate-500">
                      UI placeholder — backend wiring later
                    </span>
                  </div>
                </div>

                <div className="p-2">
                  {isBooting ? (
                    <div className="space-y-2">
                      {[0, 1, 2].map((n) => (
                        <div
                          key={n}
                          className="rounded-[1.6rem] border border-white/60 bg-white/70 px-5 py-4"
                          data-audit-row
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <Skeleton className="h-7 w-20 rounded-full" />
                              <div className="min-w-0">
                                <Skeleton className="h-4 w-[240px] rounded-full" />
                                <div className="mt-2 flex gap-2">
                                  <Skeleton className="h-3 w-24 rounded-full" />
                                  <Skeleton className="h-3 w-16 rounded-full" />
                                </div>
                              </div>
                            </div>
                            <Skeleton className="h-7 w-20 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {visibleEvents.map((evt) => (
                        <div
                          key={evt.id}
                          className="rounded-[1.6rem] border border-white/60 bg-white/70 px-5 py-4 transition-colors hover:bg-white/80"
                          data-audit-row
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-3 min-w-0">
                              <div
                                className={[
                                  "mt-[2px] inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold ring-1",
                                  typeTone(evt.type),
                                ].join(" ")}
                              >
                                {evt.type}
                              </div>

                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-slate-900 truncate">
                                  {evt.message}
                                </div>
                                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                                  <span>{evt.timestamp}</span>
                                  <span className="text-slate-300">•</span>
                                  <span className="truncate max-w-[280px] sm:max-w-[340px]">
                                    {evt.actor}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3">
                              <div
                                className={[
                                  "inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold ring-1",
                                  statusTone(evt.status),
                                ].join(" ")}
                              >
                                {evt.status === "SUCCESS" ? "success" : "fail"}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {!visibleEvents.length && (
                        <div className="rounded-[1.6rem] border border-white/60 bg-white/70 px-6 py-8 text-center text-sm text-slate-600">
                          No events match your filters yet.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2.5rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_26px_80px_-55px_rgba(15,23,42,0.40)] overflow-hidden">
              <div className="px-7 py-6 border-b border-white/60 bg-gradient-to-br from-white/85 via-white/60 to-white/75">
                <div
                  className="flex items-start justify-between gap-4"
                  data-audit-animate
                >
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Admin audit
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Control Center placeholders
                    </p>
                  </div>
                  <div className="flex size-11 items-center justify-center rounded-full bg-slate-900 text-indigo-200 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.25)]">
                    <ShieldAlert className="size-5" />
                  </div>
                </div>
              </div>

              <div className="p-7 space-y-5" data-audit-animate>
                <div className="rounded-[1.75rem] border border-white/60 bg-white/75 px-6 py-5">
                  <div className="text-xs text-slate-500">Last login</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    —
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/60 bg-white/75 px-6 py-5">
                  <div className="text-xs text-slate-500">Last seen</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    —
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/60 bg-white/75 px-6 py-5">
                  <div className="text-xs text-slate-500">Active sessions</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    —
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/60 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-rose-500/10 px-6 py-6">
                  <div className="text-sm font-semibold text-slate-900">
                    Pro controls
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    Correlation IDs, export pipelines, and retention rules land
                    here later.
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
