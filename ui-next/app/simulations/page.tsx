"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
    ArrowLeft,
    Plus,
    Eye,
    CheckCircle2,
    Loader2,
    AlertCircle,
    Clock,
    Cpu,
    Grid3X3,
    Car,
    IterationCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type SimulationStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED"

interface Simulation {
    id: string
    status: SimulationStatus
    gridSize: number
    cars: number
    iterations: number
    submittedAt: Date
    progress?: number
}

// Mock data for simulations
const MOCK_SIMULATIONS: Simulation[] = [
    {
        id: "sim_8f3k2n9x",
        status: "RUNNING",
        gridSize: 10,
        cars: 500,
        iterations: 50000,
        submittedAt: new Date(Date.now() - 1000 * 60 * 5),
        progress: 67,
    },
    {
        id: "sim_2j7m4p1q",
        status: "COMPLETED",
        gridSize: 8,
        cars: 300,
        iterations: 25000,
        submittedAt: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
        id: "sim_9v5b8c3w",
        status: "PENDING",
        gridSize: 15,
        cars: 1000,
        iterations: 100000,
        submittedAt: new Date(Date.now() - 1000 * 60 * 2),
    },
    {
        id: "sim_1h6t2r8y",
        status: "FAILED",
        gridSize: 20,
        cars: 2000,
        iterations: 200000,
        submittedAt: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
        id: "sim_4d9s7l2m",
        status: "COMPLETED",
        gridSize: 5,
        cars: 150,
        iterations: 10000,
        submittedAt: new Date(Date.now() - 1000 * 60 * 120),
    },
]

const statusConfig: Record<SimulationStatus, { label: string; className: string; icon: React.ReactNode }> = {
    PENDING: {
        label: "Pending",
        className: "bg-slate-100 text-slate-600 border-slate-200",
        icon: <Clock className="w-3 h-3" />,
    },
    RUNNING: {
        label: "Running",
        className: "bg-blue-50 text-blue-600 border-blue-200 animate-pulse",
        icon: <Loader2 className="w-3 h-3 animate-spin" />,
    },
    COMPLETED: {
        label: "Completed",
        className: "bg-emerald-50 text-emerald-600 border-emerald-200",
        icon: <CheckCircle2 className="w-3 h-3" />,
    },
    FAILED: {
        label: "Failed",
        className: "bg-red-50 text-red-600 border-red-200",
        icon: <AlertCircle className="w-3 h-3" />,
    },
}

function formatTimeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return "Just now"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
}

function SimulationCard({ simulation }: { simulation: Simulation }) {
    const status = statusConfig[simulation.status]

    return (
        <div className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-lg transition-all duration-300">
            {/* Running animation background */}
            {simulation.status === "RUNNING" && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-transparent to-blue-50/50 animate-pulse" />
                </div>
            )}

            <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <code className="text-sm font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded-lg">
                                {simulation.id}
                            </code>
                            <Badge variant="outline" className={status.className}>
                                {status.icon}
                                {status.label}
                            </Badge>
                        </div>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(simulation.submittedAt)}
                        </p>
                    </div>
                    <Link href={`/simulations/${simulation.id}`}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl bg-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-100 p-2 rounded-lg">
                            <Grid3X3 className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Grid</p>
                            <p className="text-sm font-medium text-slate-900">
                                {simulation.gridSize}×{simulation.gridSize}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-100 p-2 rounded-lg">
                            <Car className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Cars</p>
                            <p className="text-sm font-medium text-slate-900">{simulation.cars.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-100 p-2 rounded-lg">
                            <IterationCw className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Iterations</p>
                            <p className="text-sm font-medium text-slate-900">{simulation.iterations.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Progress or status message */}
                {simulation.status === "RUNNING" && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
              <span className="text-blue-600 flex items-center gap-2">
                <Cpu className="w-4 h-4 animate-pulse" />
                Distributing chunks to worker nodes…
              </span>
                            <span className="text-slate-600 font-medium">{simulation.progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                                style={{ width: `${simulation.progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {simulation.status === "COMPLETED" && (
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                        Aggregation completed successfully
                    </div>
                )}

                {simulation.status === "FAILED" && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        Simulation failed - check logs for details
                    </div>
                )}

                {simulation.status === "PENDING" && (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-4 h-4" />
                        Waiting for available worker nodes…
                    </div>
                )}
            </div>
        </div>
    )
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="bg-slate-100 p-6 rounded-2xl mb-6">
                <Cpu className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No simulations yet</h3>
            <p className="text-slate-500 text-center max-w-md mb-6">
                Start your first distributed Monte Carlo simulation to see it appear here.
            </p>
            <Link href="/simulations/new">
                <Button className="h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    Start Your First Simulation
                </Button>
            </Link>
        </div>
    )
}

export default function SimulationsDashboardPage() {
    const [simulations, setSimulations] = useState<Simulation[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setSimulations(MOCK_SIMULATIONS)
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    // Simulate real-time updates for running simulations
    useEffect(() => {
        const interval = setInterval(() => {
            setSimulations((prev) =>
                prev.map((sim) => {
                    if (sim.status === "RUNNING" && sim.progress !== undefined) {
                        const newProgress = Math.min(sim.progress + Math.random() * 3, 100)
                        if (newProgress >= 100) {
                            return { ...sim, status: "COMPLETED" as SimulationStatus, progress: undefined }
                        }
                        return { ...sim, progress: Math.floor(newProgress) }
                    }
                    return sim
                }),
            )
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Simulation Dashboard</h1>
                            <p className="text-slate-500 text-lg">Monitor distributed Monte Carlo jobs across the CPU Grid.</p>
                        </div>
                        <Link href="/simulations/new">
                            <Button className="h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl">
                                <Plus className="w-4 h-4 mr-2" />
                                Start New Simulation
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
                    </div>
                ) : simulations.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-4">
                        {simulations.map((simulation) => (
                            <SimulationCard key={simulation.id} simulation={simulation} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
