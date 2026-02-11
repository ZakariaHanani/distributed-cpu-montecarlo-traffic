"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home, Cpu, ZapOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Simulation Error:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[rgb(var(--bg))]">
      {/* Red Alert Gradients */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
      
      {/* Glitch Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none animate-pulse" 
           style={{ backgroundImage: 'radial-gradient(circle, rgb(var(--grid)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Creative Icon */}
        <div className="relative inline-flex mb-8">
          <div className="absolute inset-0 bg-rose-500/20 blur-2xl rounded-full animate-ping" />
          <div className="relative bg-white/10 dark:bg-slate-900/50 backdrop-blur-xl border border-rose-500/30 dark:border-rose-500/20 p-6 rounded-3xl shadow-2xl animate-float">
            <Cpu className="w-16 h-16 text-rose-500" />
            <ZapOff className="absolute -top-2 -right-2 w-8 h-8 text-amber-500 animate-pulse" />
          </div>
        </div>

        {/* Error Status */}
        <div className="inline-flex items-center gap-2 bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase mb-6 border border-rose-500/20">
          Status 500: Monte Carlo Divergence Detected
        </div>

        {/* Text Content */}
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
          System <span className="text-rose-500">Overheat</span>
        </h1>
        
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-lg mx-auto font-medium">
          The computation encountered a critical exception during the Monte Carlo analysis. 
          Our worker nodes have paused the grid to prevent further divergence.
        </p>

        {/* Technical Info (Optional/Collapsed) */}
        {error.digest && (
          <div className="mb-10 p-4 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
            <p className="text-xs font-mono text-slate-400 dark:text-slate-500 break-all">
              DIVERGENCE_ID: {error.digest}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => reset()}
            size="lg"
            className="h-14 bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8 text-lg group shadow-lg shadow-rose-500/20 transition-all duration-300"
          >
            <RefreshCw className="mr-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Recalibrate Grid
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/'}
            className="h-14 rounded-full px-8 text-lg border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <Home className="mr-2 w-5 h-5" />
            Back to Home
          </Button>
        </div>

        {/* Technical Footer */}
        <div className="mt-20 pt-8 border-t border-slate-200/50 dark:border-white/5 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-rose-500/80">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-widest font-bold">
              Critical Computation Error
            </span>
          </div>
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
            Nodes Status: Error | Cooling System: Active | Data Integrity: Verified
          </p>
        </div>
      </div>
    </div>
  );
}
