"use client"

import { TrendingUp, Activity, PieChart, BarChart3 } from "lucide-react"

export function DataVis() {
  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-white mb-6">
            Analytics & Results
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Comprehensive visualization tools for deep insights into your simulations
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="glass-dark card-super-lg p-8 shadow-deep border-slate-700">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700">
            <div>
              <h3 className="text-2xl font-bold text-white">Simulation Dashboard</h3>
              <p className="text-slate-400 text-sm mt-1">Real-time metrics and analysis</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-medium">Live</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Iterations", value: "10.2M", change: "+12.5%", icon: Activity },
              { label: "Mean Flow Rate", value: "847.3", change: "+3.2%", icon: TrendingUp },
              { label: "Std Deviation", value: "23.41", change: "-1.8%", icon: BarChart3 },
              { label: "Confidence", value: "99.7%", change: "+0.5%", icon: PieChart },
            ].map((metric, i) => (
              <div key={i} className="bg-slate-800/50 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <metric.icon className="w-5 h-5 text-slate-400" />
                  <span
                    className={`text-xs font-medium ${metric.change.startsWith("+") ? "text-green-400" : "text-rose-400"}`}
                  >
                    {metric.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-slate-400 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Chart Placeholder */}
          <div className="bg-slate-800/50 rounded-2xl p-6 h-64 flex items-end justify-between gap-2">
            {[65, 42, 78, 55, 89, 67, 91, 74, 82, 69, 95, 88].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-indigo-500 to-violet-500 rounded-t-lg transition-all hover:from-indigo-400 hover:to-violet-400"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
