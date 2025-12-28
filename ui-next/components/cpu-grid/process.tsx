"use client"

import { Upload, Settings, Play, Download, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Configuration",
    description: "Define your traffic network topology and simulation parameters through our intuitive interface.",
  },
  {
    icon: Settings,
    step: "02",
    title: "Configure Simulation",
    description: "Set Monte Carlo iterations, distribution parameters, and analysis thresholds.",
  },
  {
    icon: Play,
    step: "03",
    title: "Execute Distributed",
    description: "Watch as your simulation scales across the worker mesh in real-time.",
  },
  {
    icon: Download,
    step: "04",
    title: "Collect Results",
    description: "Download comprehensive analytics, visualizations, and raw data exports.",
  },
]

export function Process() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 mb-6">
            Simulation Workflow
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            From configuration to results in four simple steps
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {/* Step Number */}
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full blur-xl opacity-50" />
                    <div className="relative w-20 h-20 bg-white border-4 border-slate-200 rounded-full flex items-center justify-center shadow-deep">
                      <span className="text-2xl font-bold text-gradient-flow">{step.step}</span>
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div className="glass card-super-lg p-8 shadow-deep h-full">
                  <div className="bg-slate-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                    <step.icon className="w-7 h-7 text-slate-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Completion Badge */}
          <div className="flex justify-center mt-16">
            <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-6 py-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-700 font-medium">Results ready in minutes, not hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
