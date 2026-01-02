"use client"

import { memo } from "react"

interface TrafficLightProps {
  isGreen: boolean
  size: number
}

export const TrafficLight = memo(function TrafficLight({ isGreen, size }: TrafficLightProps) {
  const housingW = Math.max(8, Math.round(size * 0.18))
  const housingH = Math.max(18, Math.round(size * 0.52))
  const lens = Math.max(5, Math.round(housingW * 0.7))

  return (
    <div
      className="absolute"
      style={{
        width: housingW,
        height: housingH,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%) translateZ(6px)",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.92) 55%, rgba(15,23,42,0.98) 100%)",
          boxShadow:
            "0 14px 22px -18px rgba(0,0,0,0.7), 0 2px 0 rgba(255,255,255,0.10) inset",
        }}
      />

      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: Math.round(housingH * 0.18),
          width: lens,
          height: lens,
        }}
      >
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            background: "rgba(239,68,68,0.95)",
            boxShadow: "0 0 10px rgba(239,68,68,0.65)",
            opacity: isGreen ? 0.2 : 1,
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.10) 45%, rgba(0,0,0,0) 70%)",
            opacity: isGreen ? 0.25 : 0.55,
          }}
        />
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: Math.round(housingH * 0.56),
          width: lens,
          height: lens,
        }}
      >
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            background: "rgba(34,197,94,0.95)",
            boxShadow: "0 0 10px rgba(34,197,94,0.55)",
            opacity: isGreen ? 1 : 0.18,
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.10) 45%, rgba(0,0,0,0) 70%)",
            opacity: isGreen ? 0.55 : 0.25,
          }}
        />
      </div>
    </div>
  )
})
