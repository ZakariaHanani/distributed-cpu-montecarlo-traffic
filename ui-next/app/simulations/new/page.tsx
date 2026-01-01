"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Play, RotateCcw, Cloud, Sun, CloudFog, TrafficCone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SimulationGridPreview } from "@/components/simulations/simulation-grid-preview"
import { SimulationProgressModal } from "@/components/simulations/simulation-progress-modal"


type Weather = "SUNNY" | "RAINY" | "FOGGY"

interface SimulationConfig {
    gridSize: number
    numberOfCars: number
    monteCarloIterations: number
    weather: Weather
    trafficLightsEnabled: boolean
}

const DEFAULT_CONFIG: SimulationConfig = {
    gridSize: 5,
    numberOfCars: 100,
    monteCarloIterations: 10000,
    weather: "SUNNY",
    trafficLightsEnabled: true,
}

export default function NewSimulationPage() {
    const [config, setConfig] = useState<SimulationConfig>(DEFAULT_CONFIG)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [jobId, setJobId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [workerCount, setWorkerCount] = useState<number | null>(null)
    const [showResults, setShowResults] = useState(false)
    const [finalResult, setFinalResult] = useState<any | null>(null)
    const [workerResults, setWorkerResults] = useState<Record<string, any[]> | null>(null)

    // Check worker count on mount
    useEffect(() => {
        fetch('http://localhost:8081/api/simulations/workers')
            .then(res => res.json())
            .then(data => setWorkerCount(data.count))
            .catch(err => console.error("Failed to fetch worker count", err))
    }, [])

    const updateConfig = useCallback(<K extends keyof SimulationConfig>(key: K, value: SimulationConfig[K]) => {
        setConfig((prev) => ({ ...prev, [key]: value }))
    }, [])

    const handleGridSizeChange = (value: string) => {
        const num = Number.parseInt(value, 10)
        if (!isNaN(num) && num >= 1 && num <= 20) {
            updateConfig("gridSize", num)
        }
    }

    const handleCarsChange = (value: number[]) => {
        updateConfig("numberOfCars", value[0])
    }

    const handleCarsInputChange = (value: string) => {
        const num = Number.parseInt(value, 10)
        if (!isNaN(num) && num >= 1 && num <= 2000) {
            updateConfig("numberOfCars", num)
        }
    }

    const handleIterationsChange = (value: string) => {
        const num = Number.parseInt(value, 10)
        if (!isNaN(num) && num >= 1) {
            updateConfig("monteCarloIterations", num)
        }
    }

    const handleReset = () => {
        setConfig(DEFAULT_CONFIG)
        setJobId(null)
        setError(null)
        setShowResults(false)
        setFinalResult(null)
        setWorkerResults(null)
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        setJobId(null)
        setError(null)
        
        try {
            // Generate a random seed
            const seed = Math.floor(Math.random() * 1_000_000_000)
            
            // Map frontend config to backend SimulationParams
            const payload = {
                numberOfCars: config.numberOfCars,
                iterations: config.monteCarloIterations,
                weather: config.weather,
                trafficLightsEnabled: config.trafficLightsEnabled,
                seed: seed,
                gridSize: config.gridSize
            }

            const response = await fetch('http://localhost:8081/api/simulations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error || 'Failed to submit simulation')
            }

            const data = await response.json()
            setJobId(data.jobId)
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Poll for job completion and fetch results
    useEffect(() => {
        if (!jobId) return
        let isCancelled = false
        const poll = async () => {
            try {
                const res = await fetch(`http://localhost:8081/api/simulations/${jobId}`)
                if (!res.ok) throw new Error("Failed to fetch job status")
                const jr = await res.json()
                if (jr.status === "COMPLETED") {
                    const finalRes = jr.result
                    const wrRes = await fetch(`http://localhost:8081/api/simulations/${jobId}/worker-results`)
                    const wr = wrRes.ok ? await wrRes.json() : {}
                    if (!isCancelled) {
                        setFinalResult(finalRes)
                        setWorkerResults(wr)
                        setShowResults(true)
                    }
                } else if (jr.status === "FAILED") {
                    if (!isCancelled) {
                        setError(jr.errorMessage || "Simulation failed")
                    }
                } else {
                    setTimeout(poll, 1000)
                }
            } catch (e: any) {
                setTimeout(poll, 1500)
            }
        }
        poll()
        return () => { isCancelled = true }
    }, [jobId])

    const weatherIcons: Record<Weather, React.ReactNode> = {
        SUNNY: <Sun className="w-4 h-4" />,
        RAINY: <Cloud className="w-4 h-4" />,
        FOGGY: <CloudFog className="w-4 h-4" />,
    }

    return (
        <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Header */}
                <div className="mb-8 lg:mb-12 text-center lg:text-left">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors mb-6 lg:mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-2">Start New Simulation</h1>
                    <p className="text-slate-500 dark:text-slate-300 text-base lg:text-lg">
                        Configure your distributed Monte Carlo traffic simulation parameters.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-stretch justify-center">
                    {/* Configuration Panel */}
                    <div className="w-full lg:w-1/2 lg:max-w-md space-y-8">
                        {/* Grid Size */}
                        <div className="space-y-3">
                            <Label htmlFor="gridSize" className="text-slate-900 dark:text-slate-100 font-medium">
                                Grid Size
                            </Label>
                            <p className="text-sm text-slate-500 dark:text-slate-300">Generates a grid of N × N intersections (1-20)</p>
                            <Input
                                id="gridSize"
                                type="number"
                                min={1}
                                max={20}
                                value={config.gridSize}
                                onChange={(e) => handleGridSizeChange(e.target.value)}
                                className="h-12 rounded-xl max-w-[120px]"
                            />
                        </div>

                        {/* Number of Cars */}
                        <div className="space-y-3">
                            <Label htmlFor="numberOfCars" className="text-slate-900 dark:text-slate-100 font-medium">
                                Number of Cars
                            </Label>
                            <p className="text-sm text-slate-500 dark:text-slate-300">Total vehicles in the simulation (1-2000)</p>
                            <div className="flex items-center gap-4 lg:gap-6">
                                <Slider
                                    value={[config.numberOfCars]}
                                    onValueChange={handleCarsChange}
                                    min={1}
                                    max={2000}
                                    step={1}
                                    className="flex-1"
                                />
                                <Input
                                    id="numberOfCars"
                                    type="number"
                                    min={1}
                                    max={2000}
                                    value={config.numberOfCars}
                                    onChange={(e) => handleCarsInputChange(e.target.value)}
                                    className="h-12 rounded-xl w-[100px]"
                                />
                            </div>
                        </div>

                        {/* Monte Carlo Iterations */}
                        <div className="space-y-3">
                            <Label htmlFor="iterations" className="text-slate-900 dark:text-slate-100 font-medium">
                                Monte Carlo Iterations
                            </Label>
                            <p className="text-sm text-slate-500 dark:text-slate-300">Number of simulation iterations to run</p>
                            <Input
                                id="iterations"
                                type="number"
                                min={1}
                                value={config.monteCarloIterations}
                                onChange={(e) => handleIterationsChange(e.target.value)}
                                className="h-12 rounded-xl max-w-[160px]"
                            />
                        </div>

                        {/* Weather */}
                        <div className="space-y-3">
                            <Label className="text-slate-900 dark:text-slate-100 font-medium">Weather</Label>
                            <p className="text-sm text-slate-500 dark:text-slate-300">Environmental conditions for the simulation</p>
                            <Select value={config.weather} onValueChange={(value: Weather) => updateConfig("weather", value)}>
                                <SelectTrigger className="h-12 rounded-xl w-[180px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SUNNY">
                                        <div className="flex items-center gap-2">
                                            <Sun className="w-4 h-4 text-amber-500" />
                                            Sunny
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="RAINY">
                                        <div className="flex items-center gap-2">
                                            <Cloud className="w-4 h-4 text-blue-500" />
                                            Rainy
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="FOGGY">
                                        <div className="flex items-center gap-2">
                                            <CloudFog className="w-4 h-4 text-slate-500" />
                                            Foggy
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Traffic Lights Toggle */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label htmlFor="trafficLights" className="text-slate-900 dark:text-slate-100 font-medium">
                                        Enable Traffic Lights
                                    </Label>
                                    <p className="text-sm text-slate-500 dark:text-slate-300">Include traffic light signals at intersections</p>
                                </div>
                                <Switch
                                    id="trafficLights"
                                    checked={config.trafficLightsEnabled}
                                    onCheckedChange={(checked) => updateConfig("trafficLightsEnabled", checked)}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-100 rounded-xl"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Running...
                  </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Run Distributed Simulation
                  </span>
                                )}
                            </Button>
                            <Button variant="outline" onClick={handleReset} className="h-12 px-6 rounded-xl bg-transparent">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reset Configuration
                            </Button>
                            {workerCount !== null && (
                                <div className="text-sm text-slate-500 sm:ml-4 self-center">
                                    Active Workers: <span className="font-bold text-slate-900">{workerCount}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 lg:max-w-lg">
                        {/* Status Messages */}
                        {jobId && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                                <h3 className="text-green-800 font-semibold mb-1">Simulation Started Successfully!</h3>
                                <p className="text-green-700 text-sm">
                                    Job ID: <span className="font-mono font-bold">{jobId}</span>
                                </p>
                            </div>
                        )}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <h3 className="text-red-800 font-semibold mb-1">Error Starting Simulation</h3>
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Simulation Grid Preview */}
                        <div className="bg-slate-50 dark:bg-[rgb(var(--glass)/0.35)] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-white/10 lg:sticky lg:top-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-slate-900 p-2 rounded-xl">
                                    <TrafficCone className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Simulation Grid Preview</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-300">
                                        {config.gridSize} × {config.gridSize} intersections
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-full max-w-[400px]">
                                    <SimulationGridPreview
                                        gridSize={config.gridSize}
                                        numberOfCars={config.numberOfCars}
                                        trafficLightsEnabled={config.trafficLightsEnabled}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-300">
                                <span>{config.gridSize * config.gridSize} total intersections</span>
                                <span className="flex items-center gap-1">
                  {weatherIcons[config.weather]}
                                    {config.weather.charAt(0) + config.weather.slice(1).toLowerCase()}
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Popup */}
            {showResults && finalResult && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-2xl mx-4 bg-white dark:bg-[rgb(var(--glass)/0.9)] rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Monte Carlo Results</h3>
                            <button
                                onClick={() => setShowResults(false)}
                                className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                            >
                                Close
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                    <div className="text-sm text-slate-500 dark:text-slate-300">Total Jams</div>
                                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{finalResult.totalJamsDetected}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                    <div className="text-sm text-slate-500 dark:text-slate-300">Average Speed</div>
                                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{Number(finalResult.averageSpeed).toFixed(2)}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                    <div className="text-sm text-slate-500 dark:text-slate-300">Min Speed</div>
                                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{Number(finalResult.minSpeedObserved).toFixed(2)}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                    <div className="text-sm text-slate-500 dark:text-slate-300">Max Speed</div>
                                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{Number(finalResult.maxSpeedObserved).toFixed(2)}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                    <div className="text-sm text-slate-500 dark:text-slate-300">Accident Probability</div>
                                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{Number(finalResult.accidentProbability).toFixed(2)}%</div>
                                </div>
                            </div>
                            {workerResults && (
                                <div>
                                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Per-Worker Results</div>
                                    <div className="space-y-2 max-h-64 overflow-auto pr-2">
                                        {Object.entries(workerResults).map(([wid, results]) => (
                                            <div key={wid} className="p-3 rounded-xl border border-slate-200 dark:border-white/10">
                                                <div className="text-sm text-slate-600 dark:text-slate-300 mb-1">Worker: <span className="font-mono">{wid}</span></div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {results.map((r: any, idx: number) => (
                                                        <div key={idx} className="text-xs text-slate-600 dark:text-slate-300">
                                                            <span className="font-semibold">Task:</span> {r.taskId || "N/A"} •
                                                            <span className="ml-1 font-semibold">Avg:</span> {Number(r.averageSpeed).toFixed(2)} •
                                                            <span className="ml-1 font-semibold">Jams:</span> {r.totalJamsDetected}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 flex justify-end">
                            <Button onClick={() => setShowResults(false)} className="rounded-xl">Close</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
