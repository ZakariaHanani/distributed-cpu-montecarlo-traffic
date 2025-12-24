"use client"

import { Github, Linkedin, Twitter } from "lucide-react"

const team = [
  {
    name: "Alex Thompson",
    role: "Project Lead",
    bio: "Distributed systems researcher with focus on high-performance computing.",
    avatar: "AT",
  },
  {
    name: "Sarah Kim",
    role: "Algorithm Engineer",
    bio: "Monte Carlo methods specialist with background in statistical physics.",
    avatar: "SK",
  },
  {
    name: "Marcus Chen",
    role: "Infrastructure Lead",
    bio: "Cloud architect with experience scaling systems at major tech companies.",
    avatar: "MC",
  },
  {
    name: "Elena Rodriguez",
    role: "Data Scientist",
    bio: "Traffic modeling expert with PhD in transportation engineering.",
    avatar: "ER",
  },
]

export function Team() {
  return (
    <section id="team" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 mb-6">
            Project Team
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Meet the researchers and engineers behind CPU Grid
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div key={i} className="group glass card-super-lg p-8 shadow-deep text-center liquid-hover">
              {/* Avatar */}
              <div className="relative mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                  {member.avatar}
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
              <div className="text-indigo-600 font-medium mb-3">{member.role}</div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{member.bio}</p>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-3">
                {[Github, Linkedin, Twitter].map((Icon, j) => (
                  <button
                    key={j}
                    className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
