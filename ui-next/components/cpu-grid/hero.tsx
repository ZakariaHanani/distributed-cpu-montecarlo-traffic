"use client"

import { ArrowRight, Play, Zap, Globe, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-600">University Research Project</span>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[-0.05em] leading-[0.9] mb-6">
          <span className="text-slate-900">CPU Grid</span>
          <br />
          <span className="text-gradient-flow">Distributed Traffic</span>
          <br />
          <span className="text-slate-900">Monte Carlo</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed">
          High-performance distributed computing platform for traffic simulation and Monte Carlo analysis. Scale your
          computations across thousands of nodes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-6 text-lg group">
            Start Simulating
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-lg border-slate-300 hover:bg-slate-100 bg-transparent"
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Zap, value: "10M+", label: "Simulations Run" },
            { icon: Globe, value: "500+", label: "Active Nodes" },
            { icon: Cpu, value: "99.9%", label: "Uptime" },
          ].map((stat, i) => (
            <div key={i} className="glass card-super p-8 shadow-deep liquid-hover">
              <stat.icon className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
