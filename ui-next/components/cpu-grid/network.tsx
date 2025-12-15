"use client"

import { Server, Cpu } from "lucide-react"

export function Network() {
  return (
    <section id="network" className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-white mb-6">
            Master / Worker Mesh
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A resilient distributed architecture that scales with your needs
          </p>
        </div>

        {/* Network Visualization */}
        <div className="relative">
          {/* Central Master Node */}
          <div className="flex justify-center mb-16">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
              <div className="relative glass-dark card-super p-8 border-indigo-500/50">
                <Server className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                <div className="text-xl font-bold text-white text-center">Master Node</div>
                <div className="text-slate-400 text-center text-sm mt-1">Orchestration & Scheduling</div>
              </div>
            </div>
          </div>

          {/* Connection Lines */}
          <div className="flex justify-center mb-8">
            <div className="w-px h-16 bg-gradient-to-b from-indigo-500 to-violet-500" />
          </div>

          {/* Worker Nodes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((node) => (
              <div key={node} className="relative group">
                <div className="absolute inset-0 bg-violet-500/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative glass-dark card-super p-6 border-slate-700 group-hover:border-violet-500/50 transition-colors">
                  <Cpu className="w-10 h-10 text-violet-400 mx-auto mb-3" />
                  <div className="text-lg font-semibold text-white text-center">Worker {node}</div>
                  <div className="text-slate-500 text-center text-sm">Compute Unit</div>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-slate-400">Online</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Network Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { label: "Latency", value: "<5ms" },
              { label: "Throughput", value: "10GB/s" },
              { label: "Redundancy", value: "3x" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-gradient-flow">{stat.value}</div>
                <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
