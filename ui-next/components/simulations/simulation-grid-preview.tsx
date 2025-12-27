"use client"

import { useMemo } from "react"

interface SimulationGridPreviewProps {
    gridSize: number
    trafficLightsEnabled: boolean
}

export function SimulationGridPreview({ gridSize, trafficLightsEnabled }: SimulationGridPreviewProps) {
    const cells = useMemo(() => {
        return Array.from({ length: gridSize * gridSize }, (_, i) => ({
            id: i,
            row: Math.floor(i / gridSize),
            col: i % gridSize,
        }))
    }, [gridSize])

    const cellSize = Math.max(8, Math.min(40, 320 / gridSize))
    const gap = Math.max(2, Math.min(4, 40 / gridSize))

    return (
        <div className="relative w-full aspect-square flex items-center justify-center bg-white rounded-xl overflow-hidden">
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
                    gap: `${gap}px`,
                }}
            >
                {cells.map((cell) => (
                    <div
                        key={`${gridSize}-${cell.id}`}
                        className="relative rounded-sm bg-slate-200 hover:bg-slate-300 transition-colors"
                        style={{
                            width: cellSize,
                            height: cellSize,
                        }}
                    >
                        {trafficLightsEnabled && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                    className="rounded-full bg-indigo-500"
                                    style={{
                                        width: Math.max(3, cellSize * 0.25),
                                        height: Math.max(3, cellSize * 0.25),
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, transparent calc(50% - 1px), rgba(99, 102, 241, 0.1) calc(50% - 1px), rgba(99, 102, 241, 0.1) calc(50% + 1px), transparent calc(50% + 1px)),
            linear-gradient(to bottom, transparent calc(50% - 1px), rgba(99, 102, 241, 0.1) calc(50% - 1px), rgba(99, 102, 241, 0.1) calc(50% + 1px), transparent calc(50% + 1px))
          `,
                }}
            />
        </div>
    )
}
