"use client"

import { Layers, GitBranch, BarChart3, Shield, Zap, Cloud } from "lucide-react"

const capabilities = [
  {
    icon: Layers,
    title: "Distributed Computing",
    description: "Scale simulations across multiple nodes with automatic load balancing and fault tolerance.",
  },
  {
    icon: GitBranch,
    title: "Monte Carlo Methods",
    description: "Advanced probabilistic algorithms for traffic flow analysis and prediction modeling.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Live dashboards and visualization tools for monitoring simulation progress and results.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "End-to-end encryption, secure API access, and comprehensive audit logging.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Optimized algorithms delivering 10x faster results than traditional approaches.",
  },
  {
    icon: Cloud,
    title: "Cloud Native",
    description: "Deploy anywhere with containerized architecture and Kubernetes support.",
  },
]

export function CoreCapabilities() {
  return (
    <section id="capabilities" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 mb-6">
            Core Capabilities
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Everything you need to run complex traffic simulations at scale
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="group glass card-super-lg p-10 shadow-deep hover:shadow-glow transition-all duration-500 liquid-hover"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-violet-500 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300">
                  <cap.icon className="w-8 h-8 text-slate-600 group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{cap.title}</h3>
              <p className="text-slate-500 leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
