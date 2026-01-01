"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Cpu, TrafficCone } from "lucide-react";
import { Car } from "./car";
import { TrafficLight } from "./traffic-light";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  generateCars,
  generateTrafficLights,
  isNearIntersection,
  getTrafficLightAt,
  shouldCarStop,
  type Car as CarType,
  type TrafficLightState,
} from "./grid-utils";

interface SimulationGridPreviewProps {
  gridSize: number;
  numberOfCars: number;
  trafficLightsEnabled: boolean;
  activeWorkers?: number | null;
}

export function SimulationGridPreview({
  gridSize,
  numberOfCars,
  trafficLightsEnabled,
  activeWorkers = null,
}: SimulationGridPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const workerAnimRef = useRef<number | null>(null);
  const workerHighlightTimeoutRef = useRef<number | null>(null);
  const lastWorkerTargetRef = useRef<number | null>(null);

  const [cars, setCars] = useState<CarType[]>(() =>
    generateCars(numberOfCars, gridSize)
  );
  const [trafficLights, setTrafficLights] = useState<TrafficLightState[]>(() =>
    generateTrafficLights(gridSize)
  );
  const [containerSize, setContainerSize] = useState(400);
  const [displayWorkers, setDisplayWorkers] = useState<number | null>(
    typeof activeWorkers === "number" ? activeWorkers : null
  );
  const [workerHighlight, setWorkerHighlight] = useState(false);

  useEffect(() => {
    setCars(generateCars(numberOfCars, gridSize));
    setTrafficLights(generateTrafficLights(gridSize));
  }, [gridSize, numberOfCars]);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const size = containerRef.current.offsetWidth;
        setContainerSize(size);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [gridSize]);

  useEffect(() => {
    if (workerAnimRef.current) {
      cancelAnimationFrame(workerAnimRef.current);
      workerAnimRef.current = null;
    }
    if (workerHighlightTimeoutRef.current) {
      window.clearTimeout(workerHighlightTimeoutRef.current);
      workerHighlightTimeoutRef.current = null;
    }

    if (typeof activeWorkers !== "number") {
      lastWorkerTargetRef.current = null;
      setDisplayWorkers(null);
      setWorkerHighlight(false);
      return;
    }

    const to = Math.max(0, Math.floor(activeWorkers));
    const from =
      lastWorkerTargetRef.current === null ? to : lastWorkerTargetRef.current;

    if (lastWorkerTargetRef.current === null) {
      lastWorkerTargetRef.current = to;
      setDisplayWorkers(to);
      return;
    }

    if (from === to) return;

    lastWorkerTargetRef.current = to;
    setWorkerHighlight(true);
    workerHighlightTimeoutRef.current = window.setTimeout(() => {
      setWorkerHighlight(false);
    }, 450);

    const durationMs = 320;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(from + (to - from) * eased);
      setDisplayWorkers(next);
      if (t < 1) workerAnimRef.current = requestAnimationFrame(step);
    };
    workerAnimRef.current = requestAnimationFrame(step);

    return () => {
      if (workerAnimRef.current) cancelAnimationFrame(workerAnimRef.current);
      workerAnimRef.current = null;
    };
  }, [activeWorkers]);

  const normalize = (value: number) => ((value % 1) + 1) % 1;

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      setTrafficLights((prevLights) =>
        prevLights.map((light) => {
          const newTimeRemaining = light.timeRemaining - deltaTime;
          if (newTimeRemaining <= 0) {
            return {
              ...light,
              isGreen: !light.isGreen,
              timeRemaining: 2500 + Math.random() * 1500,
            };
          }
          return { ...light, timeRemaining: newTimeRemaining };
        })
      );

      setCars((prevCars) =>
        prevCars.map((car) => {
          let waiting = false;
          let newX = car.x;
          let newY = car.y;
          let newDirection = car.direction;
          let crossedIntersection: { row: number; col: number } | null = null;

          const sceneInset = Math.max(18, Math.round(containerSize * 0.11));
          const worldSize = Math.max(60, containerSize - sceneInset * 2);
          const cellSize = worldSize / gridSize;
          const roadWidth = Math.min(
            cellSize * 0.32,
            Math.max(7, cellSize * 0.2)
          );
          const platformSize = Math.min(
            cellSize * 0.6,
            Math.max(10, cellSize * 0.34)
          );
          const intersectionHalf = platformSize / 2 / worldSize;
          const epsilon = 2 / worldSize;
          const carRadius = Math.max(3, roadWidth * 0.28) / worldSize;

          const normCar = { ...car, x: normalize(car.x), y: normalize(car.y) };
          const intersection = isNearIntersection(normCar, gridSize, 0.06);

          if (!waiting) {
            const speedMultiplier = intersection.near ? 0.5 : 1;
            const movement = car.speed * speedMultiplier * (deltaTime / 16);

            if (car.direction === "horizontal") {
              newX = car.x + movement;
              if (newX > 1.1) newX = -0.1;

              const laneRow = Math.max(
                0,
                Math.min(gridSize - 1, Math.round(normCar.y * gridSize - 0.5))
              );
              newY = (laneRow + 0.5) / gridSize;

              if (car.x >= 0 && car.x <= 1 && newX >= 0 && newX <= 1) {
                const cell = Math.floor(car.x * gridSize);
                const centerX = (cell + 0.5) / gridSize;
                const nextCol = (car.x >= centerX ? cell + 1 : cell) % gridSize;
                const intersectionX = (nextCol + 0.5) / gridSize;
                const entryX = intersectionX - intersectionHalf - carRadius;
                const exitX = intersectionX + intersectionHalf + carRadius;

                const light = getTrafficLightAt(
                  trafficLights,
                  laneRow,
                  nextCol
                );
                const shouldStop = shouldCarStop(
                  car,
                  light,
                  trafficLightsEnabled
                );
                const stopPoint = entryX - epsilon;
                const slowZone = Math.min(
                  0.04,
                  Math.max(0.015, intersectionHalf * 0.9)
                );

                if (trafficLightsEnabled && shouldStop) {
                  const dist = stopPoint - car.x;
                  if (dist <= 0) {
                    waiting = true;
                    newX = stopPoint;
                  } else {
                    const easedMove = movement * Math.min(1, dist / slowZone);
                    newX = Math.min(stopPoint, car.x + easedMove);
                    if (newX >= stopPoint - epsilon) waiting = true;
                  }
                } else if (newX >= entryX && newX <= exitX) {
                  newX = exitX + epsilon;
                  crossedIntersection = { row: laneRow, col: nextCol };
                }
              }
            } else {
              newY = car.y + movement;
              if (newY > 1.1) newY = -0.1;

              const laneCol = Math.max(
                0,
                Math.min(gridSize - 1, Math.round(normCar.x * gridSize - 0.5))
              );
              newX = (laneCol + 0.5) / gridSize;

              if (car.y >= 0 && car.y <= 1 && newY >= 0 && newY <= 1) {
                const cell = Math.floor(car.y * gridSize);
                const centerY = (cell + 0.5) / gridSize;
                const nextRow = (car.y >= centerY ? cell + 1 : cell) % gridSize;
                const intersectionY = (nextRow + 0.5) / gridSize;
                const entryY = intersectionY - intersectionHalf - carRadius;
                const exitY = intersectionY + intersectionHalf + carRadius;

                const light = getTrafficLightAt(
                  trafficLights,
                  nextRow,
                  laneCol
                );
                const shouldStop = shouldCarStop(
                  car,
                  light,
                  trafficLightsEnabled
                );
                const stopPoint = entryY - epsilon;
                const slowZone = Math.min(
                  0.04,
                  Math.max(0.015, intersectionHalf * 0.9)
                );

                if (trafficLightsEnabled && shouldStop) {
                  const dist = stopPoint - car.y;
                  if (dist <= 0) {
                    waiting = true;
                    newY = stopPoint;
                  } else {
                    const easedMove = movement * Math.min(1, dist / slowZone);
                    newY = Math.min(stopPoint, car.y + easedMove);
                    if (newY >= stopPoint - epsilon) waiting = true;
                  }
                } else if (newY >= entryY && newY <= exitY) {
                  newY = exitY + epsilon;
                  crossedIntersection = { row: nextRow, col: laneCol };
                }
              }
            }

            if (crossedIntersection && Math.random() < 0.01) {
              if (car.direction === "horizontal") {
                newDirection = "vertical";
                const intersectionX =
                  (crossedIntersection.col + 0.5) / gridSize;
                const intersectionY =
                  (crossedIntersection.row + 0.5) / gridSize;
                newX = intersectionX;
                newY = intersectionY + intersectionHalf + carRadius + epsilon;
              } else {
                newDirection = "horizontal";
                const intersectionX =
                  (crossedIntersection.col + 0.5) / gridSize;
                const intersectionY =
                  (crossedIntersection.row + 0.5) / gridSize;
                newX = intersectionX + intersectionHalf + carRadius + epsilon;
                newY = intersectionY;
              }
            }
          }

          if (newX >= 0 && newX <= 1 && newY >= 0 && newY <= 1) {
            const candidateRow = Math.max(
              0,
              Math.min(gridSize - 1, Math.round(newY * gridSize - 0.5))
            );
            const candidateCol = Math.max(
              0,
              Math.min(gridSize - 1, Math.round(newX * gridSize - 0.5))
            );
            const intersectionX = (candidateCol + 0.5) / gridSize;
            const intersectionY = (candidateRow + 0.5) / gridSize;
            const halfForbidden = intersectionHalf + carRadius;

            if (
              Math.abs(newX - intersectionX) < halfForbidden &&
              Math.abs(newY - intersectionY) < halfForbidden
            ) {
              if (newDirection === "horizontal") {
                newX = intersectionX + halfForbidden + epsilon;
              } else {
                newY = intersectionY + halfForbidden + epsilon;
              }
            }
          }

          return {
            ...car,
            x: newX,
            y: newY,
            direction: newDirection,
            waiting,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    },
    [gridSize, trafficLightsEnabled, trafficLights, containerSize]
  );

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const sceneInset = Math.max(18, Math.round(containerSize * 0.11));
  const worldSize = Math.max(60, containerSize - sceneInset * 2);
  const worldOffset = (containerSize - worldSize) / 2;
  const cellSize = worldSize / gridSize;
  const roadWidthPx = Math.min(cellSize * 0.32, Math.max(7, cellSize * 0.2));
  const platformSizePx = Math.min(
    cellSize * 0.6,
    Math.max(10, cellSize * 0.34)
  );
  const isoPerspective = Math.max(720, Math.round(containerSize * 2.1));
  const isoScale = containerSize < 380 ? 0.9 : 0.94;
  const roadElevationPx = Math.max(
    4,
    Math.round(Math.min(10, roadWidthPx * 0.25))
  );
  const platformElevationPx =
    roadElevationPx + Math.max(2, Math.round(roadElevationPx * 0.6));
  const curbRedPx = Math.max(1, Math.round(roadWidthPx * 0.085));
  const curbWhitePx = Math.max(1, Math.round(roadWidthPx * 0.055));
  const roadConcrete = "rgb(226,232,240)";
  const roadRed = "rgb(239,68,68)";
  const roadWhite = "rgb(248,250,252)";
  const roadShadow = `0 ${roadElevationPx * 1.1}px ${
    roadElevationPx * 2.8
  }px rgba(15,23,42,0.14)`;
  const horizontalRoadBg = `linear-gradient(to bottom, ${roadRed} 0px, ${roadRed} ${curbRedPx}px, ${roadWhite} ${curbRedPx}px, ${roadWhite} ${
    curbRedPx + curbWhitePx
  }px, ${roadConcrete} ${curbRedPx + curbWhitePx}px, ${roadConcrete} ${
    roadWidthPx - (curbRedPx + curbWhitePx)
  }px, ${roadWhite} ${
    roadWidthPx - (curbRedPx + curbWhitePx)
  }px, ${roadWhite} ${roadWidthPx - curbRedPx}px, ${roadRed} ${
    roadWidthPx - curbRedPx
  }px, ${roadRed} ${roadWidthPx}px)`;
  const verticalRoadBg = `linear-gradient(to right, ${roadRed} 0px, ${roadRed} ${curbRedPx}px, ${roadWhite} ${curbRedPx}px, ${roadWhite} ${
    curbRedPx + curbWhitePx
  }px, ${roadConcrete} ${curbRedPx + curbWhitePx}px, ${roadConcrete} ${
    roadWidthPx - (curbRedPx + curbWhitePx)
  }px, ${roadWhite} ${
    roadWidthPx - (curbRedPx + curbWhitePx)
  }px, ${roadWhite} ${roadWidthPx - curbRedPx}px, ${roadRed} ${
    roadWidthPx - curbRedPx
  }px, ${roadRed} ${roadWidthPx}px)`;

  const buildings = useMemo(() => {
    const seed = (gridSize * 2654435761 + containerSize * 1013904223) >>> 0;
    let s = seed;
    const rand = () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };

    const blocks: Array<{
      id: string;
      x: number;
      y: number;
      w: number;
      d: number;
      h: number;
      tone: number;
      warm: number;
    }> = [];

    const addBlock = (
      id: string,
      x: number,
      y: number,
      w: number,
      d: number
    ) => {
      const h = Math.round(12 + rand() * 32);
      const tone = Math.round(216 + rand() * 26);
      const warm = Math.round(6 + rand() * 12);
      blocks.push({ id, x, y, w, d, h, tone, warm });
    };

    const ring = Math.max(10, Math.floor(worldOffset));
    const pad = Math.max(6, Math.round(ring * 0.18));
    const minFoot = Math.max(8, Math.round(Math.min(cellSize * 0.55, ring)));
    const maxFoot = Math.max(
      minFoot + 4,
      Math.round(Math.min(cellSize * 1.25, ring * 1.65))
    );

    const countPerSide = Math.min(
      10,
      Math.max(4, Math.round(containerSize / 110))
    );

    const overlaps = (
      ax: number,
      ay: number,
      aw: number,
      ad: number,
      bx: number,
      by: number,
      bw: number,
      bd: number
    ) => ax < bx + bw && ax + aw > bx && ay < by + bd && ay + ad > by;

    const place = (
      id: string,
      minX: number,
      maxX: number,
      minY: number,
      maxY: number
    ) => {
      if (maxX <= minX || maxY <= minY) return;
      for (let attempt = 0; attempt < 14; attempt += 1) {
        const w = minFoot + rand() * (maxFoot - minFoot);
        const d = minFoot + rand() * (maxFoot - minFoot);
        const x = minX + rand() * Math.max(1, maxX - minX - w);
        const y = minY + rand() * Math.max(1, maxY - minY - d);
        const margin = 3;

        const collides = blocks.some((b) =>
          overlaps(
            x - margin,
            y - margin,
            w + margin * 2,
            d + margin * 2,
            b.x,
            b.y,
            b.w,
            b.d
          )
        );
        if (!collides) {
          addBlock(id, x, y, w, d);
          return;
        }
      }
    };

    const topMaxY = Math.floor(worldOffset - pad);
    const bottomMinY = Math.ceil(worldOffset + worldSize + pad);
    const leftMaxX = Math.floor(worldOffset - pad);
    const rightMinX = Math.ceil(worldOffset + worldSize + pad);

    for (let i = 0; i < countPerSide; i += 1) {
      place(`t-${i}`, pad, containerSize - pad, pad, topMaxY);
      place(
        `b-${i}`,
        pad,
        containerSize - pad,
        bottomMinY,
        containerSize - pad
      );
      place(`l-${i}`, pad, leftMaxX, pad, containerSize - pad);
      place(`r-${i}`, rightMinX, containerSize - pad, pad, containerSize - pad);
    }

    return blocks;
  }, [gridSize, cellSize, containerSize, worldOffset, worldSize]);
  const isWorkersOnline =
    typeof activeWorkers === "number" && activeWorkers > 0;
  const showWorkersTooltip =
    typeof activeWorkers !== "number" || activeWorkers <= 0;
  const workersTooltipText =
    typeof activeWorkers !== "number"
      ? "Fetching worker status…"
      : "No workers connected";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="bg-slate-900 p-2 rounded-xl">
          <TrafficCone className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Simulation Grid Preview
          </h2>

          <div className="mt-0.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm text-slate-500 dark:text-slate-300">
              {gridSize} × {gridSize} intersections
            </p>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className={[
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-2.5 min-h-[44px]",
                    "bg-white/70 dark:bg-white/5 backdrop-blur-xl",
                    "shadow-[0_18px_55px_-44px_rgba(15,23,42,0.22)] dark:shadow-[0_18px_55px_-44px_rgba(0,0,0,0.55)]",
                    "transition-all duration-200 ease-out",
                    "animate-in fade-in-0 slide-in-from-right-2",
                    workerHighlight
                      ? "ring-2 ring-emerald-400/25 shadow-[0_20px_65px_-50px_rgba(16,185,129,0.55)]"
                      : "",
                    isWorkersOnline
                      ? "border-emerald-500/25 hover:border-emerald-500/40"
                      : "border-slate-300/60 dark:border-white/10",
                  ].join(" ")}
                >
                  <Cpu
                    className={[
                      "w-3.5 h-3.5",
                      isWorkersOnline
                        ? "text-emerald-600 dark:text-emerald-300"
                        : "text-slate-400 dark:text-slate-400",
                    ].join(" ")}
                  />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Active Workers
                  </span>
                  <span className="flex items-center gap-2">
                    <span
                      className={[
                        "h-2 w-2 rounded-full",
                        isWorkersOnline
                          ? "bg-emerald-500 motion-safe:animate-[pulse_3.2s_ease-in-out_infinite]"
                          : "bg-slate-400",
                      ].join(" ")}
                      style={{
                        boxShadow: isWorkersOnline
                          ? "0 0 10px rgba(16,185,129,0.45)"
                          : "none",
                      }}
                    />
                    <span className="text-xs font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                      {displayWorkers === null ? "—" : displayWorkers}
                    </span>
                  </span>
                </button>
              </TooltipTrigger>
              {showWorkersTooltip && (
                <TooltipContent side="bottom" sideOffset={10}>
                  {workersTooltipText}
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <div className="w-full max-w-[400px] lg:max-w-[550px]">
          <div
            ref={containerRef}
            className="relative w-full aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200"
          >
            <div
              className="absolute inset-0"
              style={{
                perspective: `${isoPerspective}px`,
                perspectiveOrigin: "50% 35%",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  transform: `rotateX(30deg) scale(${isoScale})`,
                  transformOrigin: "50% 55%",
                  transformStyle: "preserve-3d",
                }}
              >
                {buildings.map((b) => {
                  const base = `rgb(${Math.max(
                    0,
                    Math.min(255, b.tone + b.warm)
                  )}, ${Math.max(0, Math.min(255, b.tone))}, ${Math.max(
                    0,
                    Math.min(255, b.tone - b.warm)
                  )})`;
                  const top = `rgb(${Math.max(
                    0,
                    Math.min(255, b.tone + b.warm + 12)
                  )}, ${Math.max(0, Math.min(255, b.tone + 10))}, ${Math.max(
                    0,
                    Math.min(255, b.tone - b.warm + 6)
                  )})`;
                  const side = `rgb(${Math.max(
                    0,
                    Math.min(255, b.tone + b.warm - 2)
                  )}, ${Math.max(0, Math.min(255, b.tone - 6))}, ${Math.max(
                    0,
                    Math.min(255, b.tone - b.warm - 10)
                  )})`;

                  return (
                    <div
                      key={b.id}
                      className="absolute rounded-lg"
                      style={{
                        left: b.x,
                        top: b.y,
                        width: b.w,
                        height: b.d,
                        transform: `translateZ(${Math.max(
                          0,
                          Math.round(b.h * 0.55)
                        )}px)`,
                        transformStyle: "preserve-3d",
                        background: `linear-gradient(135deg, ${top} 0%, ${base} 52%, ${side} 100%)`,
                        boxShadow:
                          "0 24px 38px -34px rgba(15,23,42,0.55), 0 2px 0 rgba(255,255,255,0.22) inset",
                        opacity: 0.92,
                      }}
                    />
                  );
                })}

                <div
                  className="absolute"
                  style={{
                    left: worldOffset,
                    top: worldOffset,
                    width: worldSize,
                    height: worldSize,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {Array.from({ length: gridSize }).map((_, i) => {
                    const y =
                      ((i + 0.5) / gridSize) * worldSize - roadWidthPx / 2;
                    return (
                      <div
                        key={`road-h-${i}`}
                        className="absolute rounded-md"
                        style={{
                          left: 0,
                          top: y,
                          width: worldSize,
                          height: roadWidthPx,
                          background: horizontalRoadBg,
                          transform: `translateZ(${roadElevationPx}px)`,
                          boxShadow: roadShadow,
                          opacity: 0.98,
                        }}
                      />
                    );
                  })}
                  {Array.from({ length: gridSize }).map((_, i) => {
                    const x =
                      ((i + 0.5) / gridSize) * worldSize - roadWidthPx / 2;
                    return (
                      <div
                        key={`road-v-${i}`}
                        className="absolute rounded-md"
                        style={{
                          left: x,
                          top: 0,
                          width: roadWidthPx,
                          height: worldSize,
                          background: verticalRoadBg,
                          transform: `translateZ(${roadElevationPx}px)`,
                          boxShadow: roadShadow,
                          opacity: 0.98,
                        }}
                      />
                    );
                  })}

                  {Array.from({ length: gridSize }).map((_, row) =>
                    Array.from({ length: gridSize }).map((_, col) => {
                      const cx = ((col + 0.5) / gridSize) * worldSize;
                      const cy = ((row + 0.5) / gridSize) * worldSize;
                      const light = trafficLights.find(
                        (l) => l.row === row && l.col === col
                      );

                      return (
                        <div
                          key={`intersection-${row}-${col}`}
                          className="absolute rounded-lg"
                          style={{
                            width: platformSizePx,
                            height: platformSizePx,
                            left: cx - platformSizePx / 2,
                            top: cy - platformSizePx / 2,
                            background:
                              "linear-gradient(135deg, rgb(226,232,240) 0%, rgb(203,213,225) 60%, rgb(186,197,210) 100%)",
                            boxShadow:
                              "0 22px 34px -30px rgba(15,23,42,0.55), 0 2px 0 rgba(255,255,255,0.28) inset",
                            transform: `translateZ(${platformElevationPx}px)`,
                            transformStyle: "preserve-3d",
                          }}
                        >
                          {trafficLightsEnabled && light && (
                            <TrafficLight
                              isGreen={light.isGreen}
                              size={platformSizePx}
                            />
                          )}
                        </div>
                      );
                    })
                  )}

                  {cars.map((car) => (
                    <Car
                      key={car.id}
                      x={car.x}
                      y={car.y}
                      direction={car.direction}
                      color={car.color}
                      containerSize={containerSize}
                      waiting={car.waiting}
                      worldSize={worldSize}
                      offsetX={0}
                      offsetY={0}
                      size={Math.max(4, Math.round(roadWidthPx * 0.42))}
                      z={roadElevationPx + 5}
                      zIndex={40 + Math.round(car.y * 10000)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 bg-blue-500 rounded-full"
            style={{ boxShadow: "0 0 4px rgba(59,130,246,0.5)" }}
          />
          <span>Cars</span>
        </div>
        {trafficLightsEnabled && (
          <>
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 bg-green-500 rounded-full"
                style={{ boxShadow: "0 0 4px rgba(34,197,94,0.5)" }}
              />
              <span>Green</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 bg-red-500 rounded-full"
                style={{ boxShadow: "0 0 4px rgba(239,68,68,0.5)" }}
              />
              <span>Red</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
