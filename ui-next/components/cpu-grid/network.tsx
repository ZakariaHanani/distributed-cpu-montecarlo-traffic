"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { gsap } from "gsap";
import { Activity, ArrowUpRight, Cpu, Server, ShieldCheck } from "lucide-react";

type MeshLayout = {
  width: number;
  height: number;
  master: { x: number; y: number };
  workers: { x: number; y: number }[];
};

export function NetworkBackground({
  reduceMotion: _reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-transparent" />
      <div className="absolute inset-0 opacity-[0.34] [background-image:linear-gradient(to_right,rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.055)_1px,transparent_1px)] [background-size:52px_52px]" />
    </div>
  );
}

export function Network() {
  const sectionRef = useRef<HTMLElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const masterRef = useRef<HTMLDivElement>(null);
  const workerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const workerPulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const packetPrimaryRefs = useRef<(SVGCircleElement | null)[]>([]);
  const packetSecondaryRefs = useRef<(SVGCircleElement | null)[]>([]);
  const dispatchChipRef = useRef<HTMLDivElement>(null);

  const [reduceMotion, setReduceMotion] = useState(false);
  const [layout, setLayout] = useState<MeshLayout | null>(null);
  const [metrics, setMetrics] = useState({
    latency: 0,
    throughput: 0,
    redundancy: 0,
  });
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [flowsEnabled, setFlowsEnabled] = useState(false);
  const [hoveredWorker, setHoveredWorker] = useState<number | null>(null);
  const [workerStatus, setWorkerStatus] = useState<("Idle" | "Busy")[]>(() => [
    "Idle",
    "Idle",
    "Idle",
    "Idle",
  ]);
  const [tasksProcessed, setTasksProcessed] = useState<number[]>(() => [
    1284, 972, 1441, 1108,
  ]);

  const hasAnimatedRef = useRef(false);
  const flowTimeoutsRef = useRef<number[]>([]);
  const metricsRafRef = useRef<number | null>(null);
  const busyTimeoutsRef = useRef<number[]>([]);

  const workerAccents = useMemo(
    () => [
      {
        ring: "bg-gradient-to-br from-violet-500/28 via-violet-500/12 to-transparent group-hover:from-violet-500/40 group-hover:via-violet-500/18",
        iconWrap:
          "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/18 shadow-[0_0_0_6px_rgba(139,92,246,0.10)]",
        pulse:
          "bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.20),transparent_58%)]",
        line: "rgba(139,92,246,0.56)",
        glow: "rgba(139,92,246,0.24)",
        packet: "rgba(139,92,246,0.90)",
      },
      {
        ring: "bg-gradient-to-br from-indigo-500/28 via-indigo-500/12 to-transparent group-hover:from-indigo-500/40 group-hover:via-indigo-500/18",
        iconWrap:
          "bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-500/18 shadow-[0_0_0_6px_rgba(99,102,241,0.10)]",
        pulse:
          "bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.20),transparent_58%)]",
        line: "rgba(99,102,241,0.56)",
        glow: "rgba(99,102,241,0.24)",
        packet: "rgba(99,102,241,0.90)",
      },
      {
        ring: "bg-gradient-to-br from-teal-500/26 via-emerald-500/10 to-transparent group-hover:from-teal-500/36 group-hover:via-emerald-500/16",
        iconWrap:
          "bg-teal-500/10 text-teal-700 ring-1 ring-teal-500/18 shadow-[0_0_0_6px_rgba(20,184,166,0.10)]",
        pulse:
          "bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.20),transparent_58%)]",
        line: "rgba(20,184,166,0.54)",
        glow: "rgba(20,184,166,0.22)",
        packet: "rgba(20,184,166,0.88)",
      },
      {
        ring: "bg-gradient-to-br from-rose-500/16 via-rose-500/7 to-transparent group-hover:from-rose-500/22 group-hover:via-rose-500/10",
        iconWrap:
          "bg-rose-500/8 text-rose-700 ring-1 ring-rose-500/16 shadow-[0_0_0_6px_rgba(244,63,94,0.08)]",
        pulse:
          "bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.12),transparent_60%)]",
        line: "rgba(244,63,94,0.40)",
        glow: "rgba(244,63,94,0.18)",
        packet: "rgba(244,63,94,0.72)",
      },
    ],
    []
  );

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return;
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (reduceMotion) return;
      const master = sectionRef.current?.querySelector<HTMLElement>(
        '[data-mesh="master"]'
      );
      const workers = gsap.utils.toArray<HTMLElement>(
        '[data-mesh="worker"]',
        sectionRef.current
      );
      const stats = gsap.utils.toArray<HTMLElement>(
        '[data-mesh="stat"]',
        sectionRef.current
      );
      gsap.set([master, ...workers, ...stats], { opacity: 0, y: 14 });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;
        setHasEnteredView(true);

        const master = el.querySelector<HTMLElement>('[data-mesh="master"]');
        const workers = Array.from(
          el.querySelectorAll<HTMLElement>('[data-mesh="worker"]')
        );
        const stats = Array.from(
          el.querySelectorAll<HTMLElement>('[data-mesh="stat"]')
        );

        const tl = gsap.timeline({
          defaults: { duration: 0.6, ease: "power2.out" },
        });
        if (master)
          tl.to(master, { opacity: 1, y: 0, clearProps: "transform" });
        if (workers.length)
          tl.to(
            workers,
            { opacity: 1, y: 0, stagger: 0.1, clearProps: "transform" },
            master ? "-=0.30" : 0
          );
        if (stats.length)
          tl.to(
            stats,
            { opacity: 1, y: 0, stagger: 0.08, clearProps: "transform" },
            "-=0.22"
          );

        tl.call(() => {
          setFlowsEnabled(true);
        });

        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useLayoutEffect(() => {
    const container = meshRef.current;
    if (!container) return;

    const compute = () => {
      const masterEl = masterRef.current;
      if (!masterEl) return;
      const containerRect = container.getBoundingClientRect();
      const masterRect = masterEl.getBoundingClientRect();
      const masterPoint = {
        x: masterRect.left + masterRect.width / 2 - containerRect.left,
        y: masterRect.bottom - containerRect.top,
      };
      const workers = workerRefs.current
        .map((node) => {
          if (!node) return null;
          const rect = node.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top - containerRect.top,
          };
        })
        .filter(Boolean) as { x: number; y: number }[];

      setLayout({
        width: containerRect.width,
        height: containerRect.height,
        master: masterPoint,
        workers,
      });
    };

    compute();
    const ro = new ResizeObserver(() => compute());
    ro.observe(container);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setMetrics({ latency: 5, throughput: 10, redundancy: 3 });
      return;
    }
    if (!hasEnteredView) return;
    if (!sectionRef.current) return;

    const start = performance.now();
    const duration = 850;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setMetrics({
        latency: Math.round(5 * eased),
        throughput: Math.round(10 * eased),
        redundancy: Math.round(3 * eased),
      });
      if (t < 1) metricsRafRef.current = requestAnimationFrame(tick);
    };

    metricsRafRef.current = requestAnimationFrame(tick);
    return () => {
      if (metricsRafRef.current) cancelAnimationFrame(metricsRafRef.current);
      metricsRafRef.current = null;
    };
  }, [hasEnteredView, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    if (!layout) return;
    if (!flowsEnabled) return;

    const setBusy = (index: number) => {
      setWorkerStatus((prev) =>
        prev.map((value, i) => (i === index ? "Busy" : value))
      );
      const prior = busyTimeoutsRef.current[index];
      if (prior) window.clearTimeout(prior);
      busyTimeoutsRef.current[index] = window.setTimeout(() => {
        setWorkerStatus((prev) =>
          prev.map((value, i) => (i === index ? "Idle" : value))
        );
      }, 1200);
    };

    const bumpTasks = (index: number) => {
      const delta = 1 + Math.floor(Math.random() * 3);
      setTasksProcessed((prev) =>
        prev.map((value, i) => (i === index ? value + delta : value))
      );
    };

    const pulseDispatchChip = () => {
      const chip = dispatchChipRef.current;
      if (!chip) return;
      gsap.killTweensOf(chip);
      gsap.fromTo(
        chip,
        { scale: 1 },
        {
          scale: 1.03,
          duration: 0.14,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        }
      );
    };

    const sendPacket = (index: number, variant: 0 | 1) => {
      const packet =
        variant === 0
          ? packetPrimaryRefs.current[index]
          : packetSecondaryRefs.current[index];
      const pulse = workerPulseRefs.current[index];
      const worker = layout.workers[index];
      if (!packet || !worker) return;

      pulseDispatchChip();
      gsap.killTweensOf(packet);
      gsap.set(packet, {
        opacity: 0,
        attr: { cx: layout.master.x, cy: layout.master.y },
      });

      gsap.to(packet, {
        opacity: 1,
        duration: 0.12,
        ease: "power1.out",
      });

      gsap.to(packet, {
        attr: { cx: worker.x, cy: worker.y },
        duration: 0.95,
        ease: "none",
        onComplete: () => {
          gsap.to(packet, { opacity: 0, duration: 0.18, ease: "power1.in" });
          setBusy(index);
          bumpTasks(index);
          if (pulse) {
            gsap.killTweensOf(pulse);
            gsap.fromTo(
              pulse,
              { opacity: 0, scale: 0.98 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.16,
                yoyo: true,
                repeat: 1,
                ease: "power2.out",
              }
            );
          }
        },
      });
    };

    const schedule = (index: number) => {
      const next = 700 + Math.random() * 2100;
      const id = window.setTimeout(() => {
        sendPacket(index, 0);
        if (Math.random() < 0.35) {
          window.setTimeout(
            () => sendPacket(index, 1),
            160 + Math.random() * 220
          );
        }
        schedule(index);
      }, next);
      flowTimeoutsRef.current[index] = id;
    };

    flowTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
    flowTimeoutsRef.current = [];
    for (let i = 0; i < layout.workers.length; i += 1) {
      const id = window.setTimeout(() => schedule(i), 300 + i * 180);
      flowTimeoutsRef.current[i] = id;
    }

    return () => {
      flowTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
      flowTimeoutsRef.current = [];
      busyTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
      busyTimeoutsRef.current = [];
    };
  }, [flowsEnabled, layout, reduceMotion]);

  return (
    <section
      id="network"
      ref={sectionRef}
      className="relative overflow-hidden py-32"
    >
      <NetworkBackground reduceMotion={reduceMotion} />

      <div className="relative z-10 w-full px-6">
        <div className="mx-auto mb-20 max-w-7xl text-center">
          <h2 className="text-5xl md:text-6xl font-bold tracking-[-0.04em] text-slate-900">
            Distributed Compute Mesh
          </h2>
          <p className="mt-6 text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            A real-time orchestration layer that splits Monte Carlo workloads
            into verified task chunks—executed in parallel across dynamic
            workers.
          </p>
        </div>

        <div
          ref={meshRef}
          className="relative w-full overflow-hidden rounded-[40px] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_40px_90px_-35px_rgba(0,0,0,0.14)] after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-white/70 after:content-['']"
        >
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:46px_46px]" />

          <div className="relative p-10 md:p-12">
            <div className="relative">
              <div className="flex justify-center">
                <div
                  ref={masterRef}
                  data-mesh="master"
                  className="relative w-full max-w-[460px]"
                >
                  <div className="rounded-[2.75rem] bg-[linear-gradient(135deg,rgba(99,102,241,0.32),rgba(139,92,246,0.22),rgba(99,102,241,0.16))] p-px shadow-[0_22px_70px_-55px_rgba(15,23,42,0.24)]">
                    <div className="rounded-[2.7rem] border border-white/70 bg-white/60 backdrop-blur-2xl px-8 py-7">
                      <div className="flex items-center justify-between gap-6">
                        <div>
                          <div className="text-sm font-semibold text-slate-900 tracking-[-0.01em]">
                            Master Node
                          </div>
                          <div className="mt-1 text-sm text-slate-600">
                            Orchestration · Scheduling · Verification
                          </div>
                        </div>
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-500/18 shadow-[0_0_0_6px_rgba(99,102,241,0.10)]">
                          <Server className="size-6" />
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-3">
                        {[
                          { label: "Queue" },
                          { label: "Dispatch", dispatch: true },
                          { label: "Verify" },
                        ].map((chip) => (
                          <div
                            key={chip.label}
                            ref={chip.dispatch ? dispatchChipRef : undefined}
                            className={[
                              "relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 px-3 py-2 text-[11px] font-semibold text-slate-700",
                              chip.dispatch && flowsEnabled && !reduceMotion
                                ? "shadow-[0_0_0_6px_rgba(99,102,241,0.10)]"
                                : "",
                            ].join(" ")}
                            style={
                              reduceMotion
                                ? undefined
                                : ({
                                    ["--mesh-shimmer-duration" as never]:
                                      chip.dispatch && flowsEnabled
                                        ? "2.2s"
                                        : "3s",
                                  } as CSSProperties)
                            }
                          >
                            <span
                              className="pointer-events-none absolute inset-0 opacity-70"
                              style={{
                                background:
                                  "linear-gradient(110deg,transparent 0%,rgba(99,102,241,0.18) 35%,rgba(139,92,246,0.14) 50%,transparent 70%)",
                                backgroundSize: "200% 100%",
                                animation: reduceMotion
                                  ? undefined
                                  : "mesh-shimmer var(--mesh-shimmer-duration) linear infinite",
                              }}
                              aria-hidden="true"
                            />
                            <span className="relative">{chip.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-7">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    ref={(node) => {
                      workerRefs.current[index] = node;
                    }}
                    data-mesh="worker"
                    className="group relative outline-none motion-reduce:transition-none"
                    tabIndex={0}
                    aria-label={`Worker ${index + 1}`}
                    onMouseEnter={() => setHoveredWorker(index)}
                    onMouseLeave={() => setHoveredWorker(null)}
                    onFocus={() => setHoveredWorker(index)}
                    onBlur={() => setHoveredWorker(null)}
                  >
                    <div
                      ref={(node) => {
                        workerPulseRefs.current[index] = node;
                      }}
                      className={[
                        "pointer-events-none absolute -inset-5 rounded-[2.75rem] opacity-0 blur-xl",
                        workerAccents[index]?.pulse ?? "",
                      ].join(" ")}
                    />

                    <div
                      className={[
                        "rounded-[2.75rem] p-px transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                        workerAccents[index]?.ring ?? "",
                      ].join(" ")}
                    >
                      <div className="relative rounded-[2.75rem] border border-white/70 bg-white/60 backdrop-blur-2xl p-7 shadow-[0_22px_70px_-60px_rgba(15,23,42,0.18)] transition-[box-shadow,border-color] duration-300 ease-out group-hover:shadow-[0_30px_90px_-70px_rgba(15,23,42,0.20)]">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">
                              Worker {index + 1}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">
                              Compute unit
                            </div>
                          </div>
                          <div
                            className={[
                              "flex size-11 items-center justify-center rounded-2xl",
                              workerAccents[index]?.iconWrap ?? "",
                            ].join(" ")}
                          >
                            <Cpu className="size-5 animate-[spin_26s_linear_infinite] group-hover:[animation-duration:12s] motion-reduce:animate-none" />
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-3 py-1 text-[11px] font-semibold text-slate-700">
                            <span
                              className="relative flex size-2.5 items-center justify-center"
                              aria-hidden="true"
                            >
                              <span
                                className={[
                                  "absolute inline-flex size-2.5 rounded-full motion-reduce:animate-none",
                                  workerStatus[index] === "Busy"
                                    ? "bg-amber-500/30 animate-ping"
                                    : "bg-emerald-500/30 animate-ping",
                                ].join(" ")}
                                style={{
                                  animationDuration: `${2.2 + index * 0.55}s`,
                                  animationDelay: `${0.15 + index * 0.33}s`,
                                }}
                              />
                              <span
                                className={[
                                  "relative inline-flex size-2.5 rounded-full shadow-[0_0_0_6px_rgba(16,185,129,0.10)]",
                                  workerStatus[index] === "Busy"
                                    ? "bg-amber-500 shadow-[0_0_0_6px_rgba(245,158,11,0.10)]"
                                    : "bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.10)]",
                                ].join(" ")}
                              />
                            </span>
                            Online · {workerStatus[index]}
                          </div>

                          <div className="text-right text-[11px] text-slate-500">
                            <div className="font-medium text-slate-500">
                              Tasks processed
                            </div>
                            <div className="mt-0.5 font-semibold tabular-nums text-slate-800">
                              {tasksProcessed[index].toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 text-[11px] text-slate-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                          {workerStatus[index] === "Busy"
                            ? "Processing task chunk…"
                            : "Ready to accept tasks"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {layout && (
                <svg
                  className="pointer-events-none absolute inset-0"
                  viewBox={`0 0 ${layout.width} ${layout.height}`}
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter
                      id="meshGlow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur stdDeviation="2.4" result="blur" />
                      <feColorMatrix
                        in="blur"
                        type="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0"
                      />
                    </filter>
                  </defs>

                  {layout.workers.map((worker, i) => (
                    <g key={i}>
                      {(() => {
                        const accent = workerAccents[i] ?? workerAccents[1];
                        const isActive = hoveredWorker === i;
                        const baseOpacity = isActive ? 0.92 : 0.48;
                        const glowOpacity = isActive ? 0.28 : 0.14;
                        return (
                          <>
                            <line
                              x1={layout.master.x}
                              y1={layout.master.y}
                              x2={worker.x}
                              y2={worker.y}
                              stroke={accent.line}
                              strokeWidth={1.2}
                              strokeLinecap="round"
                              opacity={baseOpacity}
                            />
                            <line
                              x1={layout.master.x}
                              y1={layout.master.y}
                              x2={worker.x}
                              y2={worker.y}
                              stroke={accent.glow}
                              strokeWidth={3.0}
                              strokeLinecap="round"
                              opacity={glowOpacity}
                              filter="url(#meshGlow)"
                            />
                            <circle
                              ref={(node) => {
                                packetPrimaryRefs.current[i] = node;
                              }}
                              cx={layout.master.x}
                              cy={layout.master.y}
                              r={3.0}
                              fill={accent.packet}
                              opacity={0}
                            />
                            <circle
                              ref={(node) => {
                                packetSecondaryRefs.current[i] = node;
                              }}
                              cx={layout.master.x}
                              cy={layout.master.y}
                              r={2.5}
                              fill={accent.packet}
                              opacity={0}
                            />
                          </>
                        );
                      })()}
                    </g>
                  ))}
                </svg>
              )}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
              <span className="inline-flex size-1.5 rounded-full bg-slate-400/70" />
              Live task routing (UI demo)
            </div>

            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Latency",
                  value: `<${metrics.latency}ms`,
                  icon: Activity,
                  accent:
                    "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/18 shadow-[0_0_0_6px_rgba(139,92,246,0.08)]",
                  bar: "via-violet-500/70",
                  caption: "End-to-end scheduling delay",
                },
                {
                  label: "Throughput",
                  value: `${metrics.throughput}GB/s`,
                  icon: ArrowUpRight,
                  accent:
                    "bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-500/18 shadow-[0_0_0_6px_rgba(99,102,241,0.08)]",
                  bar: "via-indigo-500/70",
                  caption: "Aggregate execution bandwidth",
                },
                {
                  label: "Redundancy",
                  value: `${metrics.redundancy}x`,
                  icon: ShieldCheck,
                  accent:
                    "bg-teal-500/10 text-teal-700 ring-1 ring-teal-500/18 shadow-[0_0_0_6px_rgba(20,184,166,0.08)]",
                  bar: "via-teal-500/70",
                  caption: "Verified task chunk replication",
                },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  data-mesh="stat"
                  className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/65 backdrop-blur-2xl px-6 py-6 shadow-[0_18px_60px_-55px_rgba(15,23,42,0.16)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {stat.label}
                      </div>
                      <div className="mt-3 text-3xl font-bold tracking-[-0.02em] text-gradient-flow tabular-nums">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {stat.caption}
                      </div>
                    </div>
                    <div
                      className={[
                        "flex size-10 items-center justify-center rounded-2xl",
                        stat.accent,
                      ].join(" ")}
                    >
                      <stat.icon className="size-5" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="mt-4 h-px w-full bg-slate-900/10 overflow-hidden">
                    <div
                      className={[
                        "h-px w-1/3 bg-gradient-to-r from-transparent to-transparent opacity-0",
                        stat.bar,
                      ].join(" ")}
                      style={{
                        animation: reduceMotion
                          ? undefined
                          : `mesh-underline ${
                              7.5 + idx * 0.8
                            }s ease-in-out infinite`,
                        animationDelay: reduceMotion
                          ? undefined
                          : `${1.1 + idx * 0.55}s`,
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes mesh-shimmer {
          0% {
            background-position: 160% 50%;
          }
          100% {
            background-position: -60% 50%;
          }
        }

        @keyframes mesh-underline {
          0% {
            transform: translateX(-120%);
            opacity: 0;
          }
          12% {
            opacity: 0.85;
          }
          55% {
            opacity: 0.55;
          }
          100% {
            transform: translateX(120%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
