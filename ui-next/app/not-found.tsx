"use client";

import Link from "next/link";
import { MoveLeft, Cpu, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[rgb(var(--bg))]">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, rgb(var(--grid)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Creative Icon */}
        <div className="relative inline-flex mb-8">
          <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="relative bg-white/10 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 rounded-3xl shadow-2xl animate-float">
            <Cpu className="w-16 h-16 text-indigo-500" />
            <Ghost className="absolute -top-2 -right-2 w-8 h-8 text-slate-400 dark:text-slate-500 animate-bounce" />
          </div>
        </div>

        {/* Error Code */}
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase mb-6 border border-indigo-500/20">
          Error 404: Simulation Out of Bounds
        </div>

        {/* Text Content */}
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
          Packet Lost in <span className="text-gradient-flow">The Grid</span>
        </h1>
        
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-lg mx-auto font-medium">
          The coordinate you're looking for doesn't exist in our current simulation space. 
          It might have diverged, been dropped by the load balancer, or simply never existed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-14 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white rounded-full px-8 text-lg group transition-all duration-300"
          >
            <Link href="/">
              <MoveLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Return to Home Base
            </Link>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            asChild
            className="h-14 rounded-full px-8 text-lg border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <Link href="/?view=simulations">
              Check Active Simulations
            </Link>
          </Button>
        </div>

        {/* Technical Footer */}
        <div className="mt-20 pt-8 border-t border-slate-200/50 dark:border-white/5">
          <p className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Grid Status: Nominal | Connection: Active | Redirecting: Possible
          </p>
        </div>
      </div>
    </div>
  );
}
