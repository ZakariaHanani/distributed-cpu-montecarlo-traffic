"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { toast } from "sonner"
import { Activity, ArrowRight, Beaker, ShieldCheck } from "lucide-react"

const notes = [
  {
    badge: { label: "Experiment", className: "bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-500/15" },
    icon: Beaker,
    title: "Monte Carlo Congestion Behavior Study",
    description:
      "We simulate randomized traffic inflow and measure congestion probability under different density thresholds.",
    meta: ["Monte Carlo", "Traffic", "In progress"],
    cta: "Open notes",
  },
  {
    badge: { label: "Benchmark", className: "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/15" },
    icon: Activity,
    title: "Master/Worker Scaling Results (RMI)",
    description: "We track speedup vs. worker count, task chunk size impact, and network overhead.",
    meta: ["RMI", "Scaling", "Throughput"],
    cta: "View benchmark",
  },
  {
    badge: { label: "Engineering", className: "bg-slate-900/5 text-slate-700 ring-1 ring-slate-900/10" },
    icon: ShieldCheck,
    title: "Reliability & Fault Handling in Worker Mesh",
    description: "Retry strategy, worker availability states (AVAILABLE/BUSY), and safe task validation rules.",
    meta: ["Reliability", "Scheduling", "Validation"],
    cta: "Read design note",
  },
] as const

export function Insights() {
  const rootRef = useRef<HTMLElement>(null)
  const hasAnimatedRef = useRef(false)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches

      const header = rootRef.current?.querySelector<HTMLElement>('[data-insights="header"]')
      const cards = gsap.utils.toArray<HTMLElement>('[data-insights="card"]', rootRef.current)

      if (prefersReducedMotion) {
        if (header) gsap.set(header, { opacity: 1, y: 0 })
        if (cards.length) gsap.set(cards, { opacity: 1, y: 0 })
        return
      }

      if (header) gsap.set(header, { opacity: 0, y: 12 })
      if (cards.length) gsap.set(cards, { opacity: 0, y: 12 })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        if (hasAnimatedRef.current) return
        hasAnimatedRef.current = true

        const header = root.querySelector<HTMLElement>('[data-insights="header"]')
        const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-insights="card"]'))

        const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power3.out" } })
        if (header) tl.to(header, { opacity: 1, y: 0, clearProps: "transform" })
        if (cards.length)
          tl.to(cards, { opacity: 1, y: 0, stagger: 0.08, clearProps: "transform" }, header ? "-=0.28" : 0)

        observer.disconnect()
      },
      { threshold: 0.25 }
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  const openSoon = () => toast("This note opens soon.")

  return (
    <section ref={rootRef} className="py-32 bg-white relative overflow-hidden" aria-labelledby="insights-title">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute left-1/2 top-24 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.10),transparent_60%)] blur-3xl" />
        <div className="absolute left-1/2 top-44 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_62%)] blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div
          data-insights="header"
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <h2
              id="insights-title"
              className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 mb-4"
            >
              Research Notes & Experiments
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed">
              Findings from distributed computing work, Monte Carlo experiments, scaling benchmarks, and reliability
              notes.
            </p>
          </div>
          <button
            type="button"
            onClick={openSoon}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded-full px-3 py-2"
          >
            View all notes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <button
              key={note.title}
              type="button"
              data-insights="card"
              onClick={openSoon}
              className="
                group text-left
                glass card-super-lg p-8 rounded-3xl
                border border-white/50 bg-white/70 backdrop-blur-xl
                shadow-deep
                transition-all duration-200 ease-out
                hover:-translate-y-1 hover:shadow-glow hover:border-white/80
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60
                liquid-hover
              "
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span className={["inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", note.badge.className].join(" ")}>
                    {note.badge.label}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Updated recently</span>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-indigo-500/20 blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-200 motion-reduce:hidden animate-[pulse_2.6s_ease-in-out_infinite]" />
                  <div className="relative flex size-12 items-center justify-center rounded-2xl bg-slate-900/5 text-slate-800 ring-1 ring-slate-900/10">
                    <note.icon className="size-5" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{note.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{note.description}</p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-2">
                {note.meta.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center rounded-full border border-white/50 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-xl"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-xl">
                  {note.cta}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
