"use client"

import { memo } from "react"

interface CarProps {
    x: number
    y: number
    direction: "horizontal" | "vertical"
    color: string
    containerSize: number
    waiting: boolean
}

export const Car = memo(function Car({ x, y, direction, color, containerSize, waiting }: CarProps) {
    const dotSize = 6

    return (
        <div
            className="absolute rounded-full transition-opacity duration-150"
            data-direction={direction}
            style={{
                width: dotSize,
                height: dotSize,
                backgroundColor: color,
                left: x * containerSize - dotSize / 2,
                top: y * containerSize - dotSize / 2,
                opacity: waiting ? 0.7 : 1,
                boxShadow: "0 1px 2px rgba(15,23,42,0.25)",
            }}
        />
    )
})
