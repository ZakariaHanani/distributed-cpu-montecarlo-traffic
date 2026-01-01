"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Car } from "./car";
import { TrafficLight } from "./traffic-light";
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
}

export function SimulationGridPreview({
  gridSize,
  numberOfCars,
  trafficLightsEnabled,
}: SimulationGridPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const [cars, setCars] = useState<CarType[]>(() =>
    generateCars(numberOfCars, gridSize)
  );
  const [trafficLights, setTrafficLights] = useState<TrafficLightState[]>(() =>
    generateTrafficLights(gridSize)
  );
  const [containerSize, setContainerSize] = useState(400);

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

          const cellSize = containerSize / gridSize;
          const intersectionSize = Math.max(12, cellSize * 0.4);
          const intersectionHalf = intersectionSize / 2 / containerSize;
          const epsilon = 2 / containerSize;
          const carRadius = 3 / containerSize;

          const normCar = { ...car, x: normalize(car.x), y: normalize(car.y) };
          const intersection = isNearIntersection(normCar, gridSize, 0.06);

          if (intersection.near && trafficLightsEnabled) {
            const light = getTrafficLightAt(
              trafficLights,
              intersection.row,
              intersection.col
            );
            waiting = shouldCarStop(car, light, trafficLightsEnabled);
          }

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

                if (newX >= entryX && newX <= exitX) {
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
                  if (trafficLightsEnabled && shouldStop) {
                    waiting = true;
                    newX = entryX - epsilon;
                  } else {
                    newX = exitX + epsilon;
                    crossedIntersection = { row: laneRow, col: nextCol };
                  }
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

                if (newY >= entryY && newY <= exitY) {
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
                  if (trafficLightsEnabled && shouldStop) {
                    waiting = true;
                    newY = entryY - epsilon;
                  } else {
                    newY = exitY + epsilon;
                    crossedIntersection = { row: nextRow, col: laneCol };
                  }
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

  const cellSize = containerSize / gridSize;
  const gap = Math.max(1, 2);

  return (
    <div className="space-y-3">
      <div className="text-center">
        <p className="text-sm font-medium text-slate-700">
          Live Traffic Preview (Visual Only)
        </p>
        <p className="text-xs text-slate-500 mt-1">
          This map is a small city grid: gray lines are roads and each crossing
          is an intersection.
        </p>
        <p className="text-xs text-slate-500 mt-2">
          The moving blue dots are cars (wrapping around the edges). If traffic
          lights are enabled, intersections show a red/green light and cars slow
          down or stop at crossings. This is a visual preview only.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${containerSize} ${containerSize}`}
        >
          {Array.from({ length: gridSize }).map((_, i) => {
            const y = ((i + 0.5) / gridSize) * containerSize;
            return (
              <line
                key={`h-${i}`}
                x1={0}
                y1={y}
                x2={containerSize}
                y2={y}
                stroke="#cbd5e1"
                strokeWidth={Math.max(2, 8 - gridSize * 0.3)}
              />
            );
          })}
          {Array.from({ length: gridSize }).map((_, i) => {
            const x = ((i + 0.5) / gridSize) * containerSize;
            return (
              <line
                key={`v-${i}`}
                x1={x}
                y1={0}
                x2={x}
                y2={containerSize}
                stroke="#cbd5e1"
                strokeWidth={Math.max(2, 8 - gridSize * 0.3)}
              />
            );
          })}
        </svg>

        {Array.from({ length: gridSize }).map((_, row) =>
          Array.from({ length: gridSize }).map((_, col) => {
            const x = ((col + 0.5) / gridSize) * containerSize;
            const y = ((row + 0.5) / gridSize) * containerSize;
            const light = trafficLights.find(
              (l) => l.row === row && l.col === col
            );
            const intersectionSize = Math.max(12, cellSize * 0.4);

            return (
              <div
                key={`intersection-${row}-${col}`}
                className="absolute bg-white border border-slate-200 rounded-sm"
                style={{
                  width: intersectionSize,
                  height: intersectionSize,
                  left: x - intersectionSize / 2,
                  top: y - intersectionSize / 2,
                }}
              >
                {trafficLightsEnabled && light && (
                  <TrafficLight
                    isGreen={light.isGreen}
                    size={intersectionSize}
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
          />
        ))}
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
