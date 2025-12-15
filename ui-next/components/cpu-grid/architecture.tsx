"use client"

import { Database, Server, Cloud, Lock, Workflow } from "lucide-react"

const layers = [
  {
    title: "API Gateway",
    icon: Cloud,
    color: "from-indigo-500 to-indigo-600",
    items: ["Load Balancing", "Rate Limiting", "Authentication"],
  },
  {
    title: "Orchestration",
    icon: Workflow,
    color: "from-violet-500 to-violet-600",
    items: ["Job Scheduling", "Task Distribution", "State Management"],
  },
  {
    title: "Compute Layer",
    icon: Server,
    color: "from-rose-500 to-rose-600",
    items: ["Worker Nodes", "GPU Clusters", "Auto-scaling"],
  },
  {
    title: "Data Layer",
    icon: Database,
    color: "from-cyan-500 to-cyan-600",
    items: ["Time-series DB", "Object Storage", "Cache Layer"],
  },
]

export function Architecture() {
  return (
    <section id="architecture" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 mb-6">
            System Architecture
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Built on proven distributed systems patterns for reliability at scale
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-500 hidden lg:block" />

          <div className="space-y-8">
            {layers.map((layer, i) => (
              <div key={i} className={`flex items-center gap-8 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Card */}
                <div className="flex-1">
                  <div className="glass card-super-lg p-8 shadow-deep max-w-xl mx-auto lg:mx-0">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${layer.color} flex items-center justify-center`}
                      >
                        <layer.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">{layer.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {layer.items.map((item, j) => (
                        <span
                          key={j}
                          className="px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-600 font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>

          {/* Security Badge */}
          <div className="flex justify-center mt-16">
            <div className="glass card-super p-6 shadow-deep inline-flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900">SOC 2 Type II Compliant</div>
                <div className="text-slate-500 text-sm">Enterprise-grade security at every layer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
