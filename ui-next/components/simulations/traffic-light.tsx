"use client"

import { memo } from "react"

interface TrafficLightProps {
    isGreen: boolean
    size: number
}

export const TrafficLight = memo(function TrafficLight({ isGreen, size }: TrafficLightProps) {
    const lightSize = Math.max(4, size * 0.35)

    return (
        <div
            className="absolute rounded-full transition-all duration-300"
            style={{
                width: lightSize,
                height: lightSize,
                backgroundColor: isGreen ? "#22c55e" : "#ef4444",
                boxShadow: isGreen ? "0 0 8px 2px rgba(34, 197, 94, 0.5)" : "0 0 8px 2px rgba(239, 68, 68, 0.5)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        />
    )
})
