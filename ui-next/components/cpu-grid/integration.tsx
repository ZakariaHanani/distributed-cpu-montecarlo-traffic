"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { Cpu, Layers, ArrowRight } from "lucide-react"

export function Integration() {
  const rootRef = useRef<HTMLElement>(null)
  const hasAnimatedRef = useRef(false)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches

      const header = rootRef.current?.querySelector<HTMLElement>('[data-integration="header"]')
      const cards = gsap.utils.toArray<HTMLElement>('[data-integration="card"]', rootRef.current)

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

        const header = root.querySelector<HTMLElement>('[data-integration="header"]')
        const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-integration="card"]'))

        const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power3.out" } })
        if (header) tl.to(header, { opacity: 1, y: 0, clearProps: "transform" })
        if (cards.length)
          tl.to(cards, { opacity: 1, y: 0, stagger: 0.12, clearProps: "transform" }, header ? "-=0.25" : 0)

        observer.disconnect()
      },
      { threshold: 0.25 }
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={rootRef} className="py-32 bg-canvas relative">
      <div className="max-w-7xl mx-auto px-6">
        <div data-integration="header" className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 mb-6">
            System Integration
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            A clear separation between control and compute in a distributed Monte Carlo platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div
            data-integration="card"
            className="
              group relative rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl
              shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)]
              p-10 transition-[transform,box-shadow,border-color] duration-300 ease-out
              hover:-translate-y-[3px] hover:border-indigo-500/25 hover:shadow-[0_30px_80px_-48px_rgba(99,102,241,0.25)]
              motion-reduce:transition-none motion-reduce:hover:translate-y-0
            "
          >
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 via-violet-500/18 to-rose-500/10 blur-[18px] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex size-14 items-center justify-center rounded-2xl bg-white/80 ring-1 ring-white/70 shadow-[0_18px_55px_-44px_rgba(15,23,42,0.25)]">
                  <Layers className="size-6 text-indigo-700" />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                    REST Control API
                  </h3>
                  <span className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600">
                    Spring Boot
                  </span>
                </div>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  CPU Grid exposes a REST-based control plane that allows clients to:
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "Submit Monte Carlo traffic simulation jobs",
                    "Monitor execution status in real time",
                    "Retrieve aggregated results after completion",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-[9px] size-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <span className="text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-slate-600 leading-relaxed">
                  The Next.js web interface is one client of this API, but the architecture allows future automation,
                  scripting, or external integrations.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600">
                  <ArrowRight className="size-4 text-indigo-600" />
                  API surface expanding as the platform evolves.
                </div>
              </div>
            </div>
          </div>

          <div
            data-integration="card"
            className="
              group relative rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl
              shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)]
              p-10 transition-[transform,box-shadow,border-color] duration-300 ease-out
              hover:-translate-y-[3px] hover:border-violet-500/25 hover:shadow-[0_30px_80px_-48px_rgba(99,102,241,0.22)]
              motion-reduce:transition-none motion-reduce:hover:translate-y-0
            "
          >
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-violet-500/20 via-indigo-500/18 to-cyan-500/10 blur-[18px] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex size-14 items-center justify-center rounded-2xl bg-white/80 ring-1 ring-white/70 shadow-[0_18px_55px_-44px_rgba(15,23,42,0.25)]">
                  <Cpu className="size-6 text-violet-700" />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                    Java RMI Worker Nodes
                  </h3>
                  <span className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600">
                    Java RMI
                  </span>
                </div>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  Worker nodes integrate directly with the Master via Java RMI:
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "Workers register themselves dynamically",
                    "The Master splits simulations into independent chunks",
                    "Tasks are executed in parallel across workers",
                    "Partial results are returned and aggregated centrally",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-[9px] size-1.5 rounded-full bg-violet-500 shrink-0" />
                      <span className="text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-slate-600 leading-relaxed">
                  This model demonstrates a classic Master–Worker distributed architecture, optimized for Monte Carlo
                  workloads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
