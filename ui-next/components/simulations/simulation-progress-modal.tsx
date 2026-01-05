"use client";

import { useMemo, useState, useCallback } from "react";
import { CheckCircle2, Cpu, Copy, Check, Server } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WorkerCard, type WorkerStatus } from "./worker-card";

export interface SimulationProgressWorker {
  id: string;
  name: string;
  status: WorkerStatus;
  progress: number;
  accentColor: string;
}

interface SimulationProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  workers: SimulationProgressWorker[];
}

export function SimulationProgressModal({
  open,
  onOpenChange,
  jobId,
  workers,
}: SimulationProgressModalProps) {
  const [copied, setCopied] = useState(false);
  const isCompleted = useMemo(
    () =>
      workers.length > 0 &&
      workers.every((w) => w.status === "COMPLETED" || w.progress >= 100),
    [workers]
  );

  const overallProgress = useMemo(
    () =>
      workers.length > 0
        ? workers.reduce((sum, w) => sum + w.progress, 0) / workers.length
        : 0,
    [workers]
  );

  const completedWorkers = useMemo(
    () => workers.filter((w) => w.status === "COMPLETED").length,
    [workers]
  );

  const handleCopyJobId = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(jobId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = jobId;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [jobId]);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !isCompleted) return;
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent
        className="max-w-[calc(100%-4cm)] max-h-[calc(100vh-4cm)] overflow-y-auto p-5 sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[80rem]"
        showCloseButton={false}
      >
        <DialogHeader>
          <div className="relative flex items-center">
            <div className="absolute left-0 bg-slate-900 p-2.5 rounded-xl">
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <Server className="w-5 h-5 text-indigo-400" />
              )}
            </div>
            <div className="w-full flex flex-col items-center text-center">
              <DialogTitle className="text-xl">
                {isCompleted
                  ? "Simulation Completed"
                  : "Distributed Simulation Execution"}
              </DialogTitle>
              <DialogDescription>
                {isCompleted
                  ? "All workers have finished processing"
                  : "Distributing Monte Carlo workload across CPU Grid"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Job ID Badge */}
        <div className="flex items-center justify-between bg-slate-100 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-600">Job ID:</span>
            <code className="font-mono text-sm font-semibold text-slate-900 bg-white px-2 py-1 rounded-lg border border-slate-200">
              {jobId}
            </code>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyJobId}
            className="h-8 px-2"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4 text-slate-500" />
            )}
          </Button>
        </div>

        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Overall Progress</span>
            <span className="font-semibold text-slate-900">
              {completedWorkers}/{workers.length} workers completed
            </span>
          </div>

          {/* Radial Progress */}
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                {/* Background circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke={isCompleted ? "#10b981" : "#6366f1"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(overallProgress / 100) * 251.2} 251.2`}
                  className="transition-all duration-300"
                  style={{
                    filter: isCompleted
                      ? "drop-shadow(0 0 8px #10b981)"
                      : "drop-shadow(0 0 6px #6366f1)",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`text-xl font-bold ${
                    isCompleted ? "text-emerald-600" : "text-slate-900"
                  }`}
                >
                  {Math.round(overallProgress)}%
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${overallProgress}%`,
                    background: isCompleted
                      ? "#10b981"
                      : "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    boxShadow: isCompleted
                      ? "0 0 12px #10b981"
                      : "0 0 12px rgba(99, 102, 241, 0.5)",
                  }}
                />
              </div>
              <p className="text-sm text-slate-500">
                {isCompleted
                  ? "Results aggregated successfully"
                  : "Processing distributed Monte Carlo chunks..."}
              </p>
            </div>
          </div>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-2 gap-3">
          {workers.map((worker) => (
            <WorkerCard
              key={worker.id}
              name={worker.name}
              status={worker.status}
              progress={worker.progress}
              accentColor={worker.accentColor}
            />
          ))}
        </div>

        {/* Success Animation */}
        {isCompleted && (
          <div className="flex items-center justify-center gap-2 py-2 text-emerald-600 animate-pulse">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Preparing results...</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
