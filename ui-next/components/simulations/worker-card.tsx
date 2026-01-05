"use client";

import { Clock, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type WorkerStatus = "PENDING" | "RUNNING" | "COMPLETED";

interface WorkerCardProps {
  name: string;
  status: WorkerStatus;
  progress: number;
  accentColor: string;
}

export function WorkerCard({
  name,
  status,
  progress,
  accentColor,
}: WorkerCardProps) {
  const statusIcons = {
    PENDING: <Clock className="w-4 h-4 text-slate-400" />,
    RUNNING: (
      <Loader2
        className="w-4 h-4 animate-spin"
        style={{ color: accentColor }}
      />
    ),
    COMPLETED: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
  };

  const statusLabels = {
    PENDING: "Waiting",
    RUNNING: "Processing",
    COMPLETED: "Done",
  };

  return (
    <div
      className={cn(
        "relative bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all duration-500",
        status === "RUNNING" && "border-slate-300 shadow-md",
        status === "COMPLETED" && "border-emerald-200 bg-emerald-50/50"
      )}
    >
      {/* Pulse effect for running workers */}
      {status === "RUNNING" && (
        <div
          className="absolute inset-0 rounded-xl animate-pulse opacity-20"
          style={{ backgroundColor: accentColor }}
        />
      )}

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  status === "COMPLETED" ? "#10b981" : accentColor,
                boxShadow:
                  status === "RUNNING" ? `0 0 8px ${accentColor}` : "none",
              }}
            />
            <span className="text-sm font-medium text-slate-900">{name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            {statusIcons[status]}
            <span>{statusLabels[status]}</span>
          </div>
        </div>

        {/* Mini radial progress */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              {/* Background circle */}
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="4"
              />
              {/* Progress circle */}
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke={status === "COMPLETED" ? "#10b981" : accentColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${(progress / 100) * 125.6} 125.6`}
                className="transition-all duration-300"
                style={{
                  filter:
                    status === "RUNNING"
                      ? `drop-shadow(0 0 4px ${accentColor})`
                      : "none",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-slate-700">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex-1 space-y-1">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  backgroundColor:
                    status === "COMPLETED" ? "#10b981" : accentColor,
                  boxShadow:
                    status === "RUNNING" ? `0 0 8px ${accentColor}` : "none",
                }}
              />
            </div>
            <p className="text-xs text-slate-500">
              {status === "PENDING" && "Awaiting task assignment..."}
              {status === "RUNNING" && "Processing Monte Carlo iterations..."}
              {status === "COMPLETED" && "Chunk processed successfully"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
