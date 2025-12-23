"use client"

import type React from "react"

import { useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Play, RotateCcw, Cloud, Sun, CloudFog, TrafficCone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SimulationGridPreview } from "@/components/simulations/simulation-grid-preview"

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
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsSubmitting(false)
        // Here you would typically redirect or show success state
    }

    const weatherIcons: Record<Weather, React.ReactNode> = {
        SUNNY: <Sun className="w-4 h-4" />,
        RAINY: <Cloud className="w-4 h-4" />,
        FOGGY: <CloudFog className="w-4 h-4" />,
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Start New Simulation</h1>
                    <p className="text-slate-500 text-lg">
                        Configure your distributed Monte Carlo traffic simulation parameters.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Configuration Panel */}
                    <div className="space-y-8">
                        {/* Grid Size */}
                        <div className="space-y-3">
                            <Label htmlFor="gridSize" className="text-slate-900 font-medium">
                                Grid Size
                            </Label>
                            <p className="text-sm text-slate-500">Generates a grid of N × N intersections (1-20)</p>
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
                            <Label htmlFor="numberOfCars" className="text-slate-900 font-medium">
                                Number of Cars
                            </Label>
                            <p className="text-sm text-slate-500">Total vehicles in the simulation (1-2000)</p>
                            <div className="flex items-center gap-6">
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
                            <Label htmlFor="iterations" className="text-slate-900 font-medium">
                                Monte Carlo Iterations
                            </Label>
                            <p className="text-sm text-slate-500">Number of simulation iterations to run</p>
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
                            <Label className="text-slate-900 font-medium">Weather</Label>
                            <p className="text-sm text-slate-500">Environmental conditions for the simulation</p>
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
                                    <Label htmlFor="trafficLights" className="text-slate-900 font-medium">
                                        Enable Traffic Lights
                                    </Label>
                                    <p className="text-sm text-slate-500">Include traffic light signals at intersections</p>
                                </div>
                                <Switch
                                    id="trafficLights"
                                    checked={config.trafficLightsEnabled}
                                    onCheckedChange={(checked) => updateConfig("trafficLightsEnabled", checked)}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-xl"
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
                        </div>
                    </div>

                    {/* Grid Preview Panel */}
                    <div className="lg:sticky lg:top-12 h-fit">
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-slate-900 p-2 rounded-xl">
                                    <TrafficCone className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Simulation Grid Preview</h2>
                                    <p className="text-sm text-slate-500">
                                        {config.gridSize} × {config.gridSize} intersections
                                    </p>
                                </div>
                            </div>
                            <SimulationGridPreview gridSize={config.gridSize} trafficLightsEnabled={config.trafficLightsEnabled} />
                            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
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
        </div>
    )
}
