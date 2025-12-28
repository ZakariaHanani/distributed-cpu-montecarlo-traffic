"use client"

import { useEffect, useRef } from "react"

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gridSize = 50
      const offsetY = (time * 0.5) % gridSize

      ctx.strokeStyle = "rgba(99, 102, 241, 0.05)"
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = -gridSize + offsetY; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Floating shapes
      const shapes = 5
      for (let i = 0; i < shapes; i++) {
        const x = canvas.width * (0.2 + i * 0.15) + Math.sin(time * 0.001 + i) * 30
        const y = canvas.height * 0.3 + Math.cos(time * 0.001 + i * 2) * 50 + i * 100
        const size = 30 + Math.sin(time * 0.002 + i) * 10

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(time * 0.0005 + i)

        // Glass icosahedron approximation (hexagon)
        ctx.beginPath()
        for (let j = 0; j < 6; j++) {
          const angle = (j / 6) * Math.PI * 2
          const px = Math.cos(angle) * size
          const py = Math.sin(angle) * size
          if (j === 0) {
            ctx.moveTo(px, py)
          } else {
            ctx.lineTo(px, py)
          }
        }
        ctx.closePath()

        ctx.fillStyle = `rgba(99, 102, 241, ${0.02 + Math.sin(time * 0.002 + i) * 0.01})`
        ctx.fill()
        ctx.strokeStyle = "rgba(99, 102, 241, 0.1)"
        ctx.stroke()

        ctx.restore()
      }

      time++
      animationFrameId = requestAnimationFrame(drawGrid)
    }

    resize()
    window.addEventListener("resize", resize)
    drawGrid()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
}
