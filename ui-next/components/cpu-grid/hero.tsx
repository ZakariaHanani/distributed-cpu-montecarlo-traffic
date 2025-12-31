"use client";

import { ArrowRight, Cpu, Globe, Server, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ViewType } from "@/app/page";

type HeroProps = {
  setCurrentView: (view: ViewType) => void;
};

export function Hero({ setCurrentView }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/10 rounded-full px-4 py-2 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            University Research Project
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[-0.05em] leading-[0.9] mb-6">
          <span className="text-slate-900 dark:text-slate-100">CPU Grid</span>
          <br />
          <span className="text-gradient-flow">Distributed Traffic</span>
          <br />
          <span className="text-slate-900 dark:text-slate-100">
            Monte Carlo
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          High-performance distributed computing platform for traffic simulation
          and Monte Carlo analysis. Scale your computations across thousands of
          nodes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 text-lg group"
            asChild
          >
            <Link href="/simulations/new">
              Launch Simulation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setCurrentView("become_worker")}
            className="
                h-14 rounded-full px-8 text-lg
                bg-white/60 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-xl
                border border-indigo-500/20 dark:border-[rgb(var(--border)/var(--glass-border-alpha))]
                text-slate-900 dark:text-slate-100
                shadow-[0_14px_45px_-34px_rgba(15,23,42,0.25)] dark:shadow-[0_14px_45px_-34px_rgba(0,0,0,0.55)]
                transition-all duration-200 ease-out
                hover:-translate-y-[2px]
                hover:shadow-[0_22px_70px_-44px_rgba(99,102,241,0.40)]
              "
          >
            <Server className="mr-2 w-5 h-5 text-indigo-600" />
            Join the Worker Network
          </Button>
        </div>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
          Contribute compute power by running a worker node in the CPU Grid.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
          {[
            { icon: Zap, value: "10M+", label: "Simulations Run" },
            { icon: Globe, value: "500+", label: "Active Nodes" },
            { icon: Cpu, value: "99.9%", label: "Uptime" },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass card-super p-8 shadow-deep liquid-hover"
            >
              <stat.icon className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-500 dark:text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
