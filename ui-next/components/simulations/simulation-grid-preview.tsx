"use client"

import { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

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

    // Calculate cell size to fit within container
    const cellSize = Math.max(8, Math.min(40, 320 / gridSize))
    const gap = Math.max(2, Math.min(4, 40 / gridSize))

    return (
        <div className="relative w-full aspect-square flex items-center justify-center bg-white rounded-xl overflow-hidden">
            <motion.div
                layout
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
                    gap: `${gap}px`,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <AnimatePresence mode="popLayout">
                    {cells.map((cell) => (
                        <motion.div
                            key={`${gridSize}-${cell.id}`}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                                duration: 0.2,
                                delay: (cell.row + cell.col) * 0.02,
                                ease: "easeOut",
                            }}
                            className="relative rounded-sm bg-slate-200 hover:bg-slate-300 transition-colors"
                            style={{
                                width: cellSize,
                                height: cellSize,
                            }}
                        >
                            {/* Traffic light indicator */}
                            {trafficLightsEnabled && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div
                                        className="rounded-full bg-indigo-500"
                                        style={{
                                            width: Math.max(3, cellSize * 0.25),
                                            height: Math.max(3, cellSize * 0.25),
                                        }}
                                    />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Grid overlay lines for roads */}
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
