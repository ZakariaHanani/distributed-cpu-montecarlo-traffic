"use client"

import { ArrowRight, FileText, Video, Podcast } from "lucide-react"

const insights = [
  {
    type: "Paper",
    icon: FileText,
    title: "Distributed Monte Carlo Methods for Large-Scale Traffic Networks",
    description: "A novel approach to scaling probabilistic traffic simulation across commodity hardware.",
    date: "Dec 2024",
  },
  {
    type: "Video",
    icon: Video,
    title: "GPU-Accelerated Traffic Flow Analysis",
    description: "Deep dive into our CUDA implementation for real-time traffic prediction.",
    date: "Nov 2024",
  },
  {
    type: "Podcast",
    icon: Podcast,
    title: "The Future of Urban Mobility Simulation",
    description: "Our team discusses emerging trends in transportation modeling.",
    date: "Oct 2024",
  },
]

export function Insights() {
  return (
    <section className="py-32 bg-canvas relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 mb-4">
              Research & Insights
            </h2>
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
              Stay updated with our latest research publications and technical deep dives
            </p>
          </div>
          <button className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium group">
            View All Publications
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((insight, i) => (
            <article
              key={i}
              className="group glass card-super-lg p-8 shadow-deep hover:shadow-glow transition-all liquid-hover"
            >
              {/* Type Badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <insight.icon className="w-4 h-4 text-slate-600" />
                </div>
                <span className="text-sm font-medium text-slate-500">{insight.type}</span>
                <span className="text-slate-300">•</span>
                <span className="text-sm text-slate-400">{insight.date}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {insight.title}
              </h3>
              <p className="text-slate-500 leading-relaxed mb-6">{insight.description}</p>

              <button className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium text-sm group/btn">
                Read More
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
