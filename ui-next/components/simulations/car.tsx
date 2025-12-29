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
    const carWidth = direction === "horizontal" ? 8 : 4
    const carHeight = direction === "horizontal" ? 4 : 8

    return (
        <div
            className="absolute rounded-sm transition-opacity duration-150"
            style={{
                width: carWidth,
                height: carHeight,
                backgroundColor: color,
                left: x * containerSize - carWidth / 2,
                top: y * containerSize - carHeight / 2,
                opacity: waiting ? 0.7 : 1,
                boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
        />
    )
})
