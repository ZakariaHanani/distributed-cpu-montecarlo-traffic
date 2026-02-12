"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { toast } from "sonner";
import { Activity, ArrowRight, Beaker, ShieldCheck, X } from "lucide-react";

const notes = [
  {
    badge: {
      label: "Experiment",
      className:
        "bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-500/15 dark:bg-indigo-500/15 dark:text-indigo-200 dark:ring-indigo-500/25",
    },
    icon: Beaker,
    title: "Monte Carlo Congestion Behavior Study",
    description:
      "We simulate randomized traffic inflow and measure congestion probability under different density thresholds.",
    meta: ["Monte Carlo", "Traffic", "In progress"],
    cta: "Open notes",
    details: {
      overview: "This study investigates the nonlinear relationship between traffic density and congestion probability using Monte Carlo methods.",
      methodology: [
        "Iterative randomization of vehicle arrival rates.",
        "Simulation of lane-switching behavior under high-load conditions.",
        "Probabilistic modeling of bottleneck formation at exit ramps."
      ],
      findings: "Preliminary results show a critical threshold at 75% capacity where congestion probability jumps from 15% to 62%.",
      status: "Active - Data collection phase"
    }
  },
  {
    badge: {
      label: "Benchmark",
      className:
        "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/15 dark:bg-violet-500/15 dark:text-violet-200 dark:ring-violet-500/25",
    },
    icon: Activity,
    title: "Master/Worker Scaling Results (RMI)",
    description:
      "We track speedup vs. worker count, task chunk size impact, and network overhead.",
    meta: ["RMI", "Scaling", "Throughput"],
    cta: "View benchmark",
    details: {
      overview: "Analyzing the efficiency of the RMI-based distributed architecture across multiple heterogeneous nodes.",
      methodology: [
        "Scaling tests from 1 to 16 worker nodes.",
        "Comparison of fixed-size vs. adaptive task chunking.",
        "Latency measurement of RMI callbacks vs. polling."
      ],
      findings: "Observed near-linear scaling up to 12 nodes, after which network overhead and RMI registry latency become dominant.",
      status: "Completed - Optimization phase"
    }
  },
  {
    badge: {
      label: "Engineering",
      className:
        "bg-slate-900/5 text-slate-700 ring-1 ring-slate-900/10 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10",
    },
    icon: ShieldCheck,
    title: "Reliability & Fault Handling in Worker Mesh",
    description:
      "Retry strategy, worker availability states (AVAILABLE/BUSY), and safe task validation rules.",
    meta: ["Reliability", "Scheduling", "Validation"],
    cta: "Read design note",
    details: {
      overview: "Documentation of the fault-tolerance mechanisms implemented to handle worker dropouts and network partitions.",
      methodology: [
        "Heartbeat monitoring for worker health tracking.",
        "Automatic task reassignment upon worker failure detection.",
        "State consistency validation using RMI remote objects."
      ],
      findings: "System maintains 99.8% simulation integrity even with a 20% node failure rate simulated in local cluster.",
      status: "Draft - Peer review stage"
    }
  },
] as const;

export function Insights() {
  const rootRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);
  const [selectedNote, setSelectedNote] = useState<typeof notes[number] | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const header = rootRef.current?.querySelector<HTMLElement>(
        '[data-insights="header"]'
      );
      const cards = gsap.utils.toArray<HTMLElement>(
        '[data-insights="card"]',
        rootRef.current
      );

      if (prefersReducedMotion) {
        if (header) gsap.set(header, { opacity: 1, y: 0 });
        if (cards.length) gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      if (header) gsap.set(header, { opacity: 0, y: 12 });
      if (cards.length) gsap.set(cards, { opacity: 0, y: 12 });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        const header = root.querySelector<HTMLElement>(
          '[data-insights="header"]'
        );
        const cards = Array.from(
          root.querySelectorAll<HTMLElement>('[data-insights="card"]')
        );

        const tl = gsap.timeline({
          defaults: { duration: 0.6, ease: "power3.out" },
        });
        if (header)
          tl.to(header, { opacity: 1, y: 0, clearProps: "transform" });
        if (cards.length)
          tl.to(
            cards,
            { opacity: 1, y: 0, stagger: 0.08, clearProps: "transform" },
            header ? "-=0.28" : 0
          );

        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const openSoon = () => toast("Detailed research portal coming soon.");

  return (
    <section
      ref={rootRef}
      className="py-32 bg-[rgb(var(--bg))] relative overflow-hidden"
      aria-labelledby="insights-title"
    >
      {/* Modal for detailed notes */}
      {selectedNote && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedNote(null)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white/90 dark:bg-[rgb(var(--bg)/0.8)] backdrop-blur-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="absolute right-6 top-6 z-10">
              <button
                onClick={() => setSelectedNote(null)}
                className="flex size-10 items-center justify-center rounded-full bg-slate-900/5 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className={["inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", selectedNote.badge.className].join(" ")}>
                  {selectedNote.badge.label}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {selectedNote.details.status}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-6">
                {selectedNote.title}
              </h3>

              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">Overview</h4>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedNote.details.overview}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">Methodology</h4>
                  <ul className="space-y-3">
                    {selectedNote.details.methodology.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-indigo-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 p-6 border border-indigo-500/10">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">Key Findings</h4>
                  <p className="text-slate-700 dark:text-slate-200 font-medium">
                    {selectedNote.details.findings}
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex gap-2">
                  {selectedNote.meta.map(chip => (
                    <span key={chip} className="text-xs font-medium text-slate-400 dark:text-slate-500">#{chip}</span>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedNote(null)}
                  className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Close Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(226,232,240,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
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
              className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 dark:text-slate-100 mb-4"
            >
              Research Notes & Experiments
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-300 leading-relaxed">
              Findings from distributed computing work, Monte Carlo experiments,
              scaling benchmarks, and reliability notes.
            </p>
          </div>
          <button
            type="button"
            onClick={openSoon}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200 font-semibold group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded-full px-3 py-2"
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
              onClick={() => setSelectedNote(note)}
              className="
                group text-left
                glass card-super-lg p-8 rounded-3xl
                border border-white/50 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-xl
                shadow-deep
                transition-all duration-200 ease-out
                hover:-translate-y-1 hover:shadow-glow hover:border-white/80 dark:hover:border-white/10
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60
                liquid-hover
              "
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span
                    className={[
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                      note.badge.className,
                    ].join(" ")}
                  >
                    {note.badge.label}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-300">
                    Updated recently
                  </span>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-indigo-500/20 blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-200 motion-reduce:hidden animate-[pulse_2.6s_ease-in-out_infinite]" />
                  <div className="relative flex size-12 items-center justify-center rounded-2xl bg-slate-900/5 dark:bg-white/10 text-slate-800 dark:text-slate-200 ring-1 ring-slate-900/10 dark:ring-white/10">
                    <note.icon className="size-5" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {note.title}
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                  {note.description}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-2">
                {note.meta.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center rounded-full border border-white/50 dark:border-white/10 bg-white/70 dark:bg-[rgb(var(--glass)/0.65)] px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur-xl"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/50 dark:border-white/10 bg-white/70 dark:bg-[rgb(var(--glass)/0.65)] px-4 py-2 shadow-sm backdrop-blur-xl">
                  {note.cta}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
