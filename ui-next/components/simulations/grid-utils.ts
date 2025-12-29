// Grid utility functions for traffic simulation

export interface Position {
    x: number
    y: number
}

export interface Car {
    id: number
    x: number
    y: number
    targetX: number
    targetY: number
    direction: "horizontal" | "vertical"
    speed: number
    color: string
    waiting: boolean
    waitTime: number
}

export interface TrafficLightState {
    row: number
    col: number
    isGreen: boolean
    timeRemaining: number
}

// Generate initial car positions distributed across the grid
export function generateCars(count: number, gridSize: number): Car[] {
    const cars: Car[] = []
    const colors = ["#64748b", "#3b82f6", "#6366f1", "#8b5cf6", "#0ea5e9"]

    // Limit visible cars for performance
    const visibleCount = Math.min(count, gridSize * gridSize * 2)

    for (let i = 0; i < visibleCount; i++) {
        const direction = Math.random() > 0.5 ? "horizontal" : "vertical"
        const gridPos = Math.floor(Math.random() * gridSize)
        const offset = Math.random()

        let x: number, y: number
        if (direction === "horizontal") {
            x = offset
            y = (gridPos + 0.5) / gridSize
        } else {
            x = (gridPos + 0.5) / gridSize
            y = offset
        }

        cars.push({
            id: i,
            x,
            y,
            targetX: x,
            targetY: y,
            direction,
            speed: 0.002 + Math.random() * 0.003,
            color: colors[Math.floor(Math.random() * colors.length)],
            waiting: false,
            waitTime: 0,
        })
    }

    return cars
}

// Generate initial traffic light states
export function generateTrafficLights(gridSize: number): TrafficLightState[] {
    const lights: TrafficLightState[] = []

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            lights.push({
                row,
                col,
                isGreen: (row + col) % 2 === 0,
                timeRemaining: 2000 + Math.random() * 1000,
            })
        }
    }

    return lights
}

// Check if a car is near an intersection
export function isNearIntersection(
    car: Car,
    gridSize: number,
    threshold = 0.08,
): { near: boolean; row: number; col: number } {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const intersectionX = (col + 0.5) / gridSize
            const intersectionY = (row + 0.5) / gridSize

            const distX = Math.abs(car.x - intersectionX)
            const distY = Math.abs(car.y - intersectionY)

            if (distX < threshold && distY < threshold) {
                return { near: true, row, col }
            }
        }
    }

    return { near: false, row: -1, col: -1 }
}

// Get traffic light state at intersection
export function getTrafficLightAt(
    lights: TrafficLightState[],
    row: number,
    col: number,
): TrafficLightState | undefined {
    return lights.find((l) => l.row === row && l.col === col)
}

// Decide if car should stop based on direction and light state
export function shouldCarStop(car: Car, light: TrafficLightState | undefined, trafficLightsEnabled: boolean): boolean {
    if (!trafficLightsEnabled || !light) return false

    // Horizontal cars stop on red (when isGreen is false for their direction)
    // Vertical cars stop on green (alternating pattern)
    if (car.direction === "horizontal") {
        return !light.isGreen
    } else {
        return light.isGreen
    }
}
