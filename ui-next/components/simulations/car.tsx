"use client";

import { memo } from "react";

interface CarProps {
  x: number;
  y: number;
  direction: "horizontal" | "vertical";
  color: string;
  containerSize: number;
  waiting: boolean;
  worldSize?: number;
  offsetX?: number;
  offsetY?: number;
  size?: number;
  z?: number;
  zIndex?: number;
}

export const Car = memo(function Car({
  x,
  y,
  direction,
  color,
  containerSize,
  waiting,
  worldSize,
  offsetX,
  offsetY,
  size,
  z,
  zIndex,
}: CarProps) {
  const base = typeof size === "number" ? size : 6;
  const w = direction === "horizontal" ? base * 1.65 : base * 1.05;
  const h = direction === "horizontal" ? base * 1.05 : base * 1.65;
  const world = typeof worldSize === "number" ? worldSize : containerSize;
  const ox = typeof offsetX === "number" ? offsetX : 0;
  const oy = typeof offsetY === "number" ? offsetY : 0;
  const zPx = typeof z === "number" ? z : 0;

  return (
    <div
      className="absolute"
      data-direction={direction}
      style={{
        left: ox + x * world - w / 2,
        top: oy + y * world - h / 2,
        zIndex,
        transform: `translateZ(${zPx}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: w * 0.9,
          height: h * 0.9,
          background: "rgba(15,23,42,0.18)",
          filter: "blur(4px)",
          transform: `translate3d(0, ${base * 0.55}px, -${Math.max(2, zPx)}px)`,
        }}
      />
      <div
        className="relative rounded-full transition-opacity duration-150"
        style={{
          width: w,
          height: h,
          opacity: waiting ? 0.72 : 1,
          background: `linear-gradient(135deg, ${color} 0%, rgba(59,130,246,0.92) 55%, rgba(30,64,175,0.95) 100%)`,
          boxShadow:
            "0 10px 18px -14px rgba(15,23,42,0.85), 0 2px 0 rgba(255,255,255,0.35) inset",
        }}
      />
    </div>
  );
});
