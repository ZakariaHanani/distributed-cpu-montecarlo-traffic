"use client"

import { useEffect, useState } from "react"

export function AmbientLight() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-30 transition-all duration-1000 ease-out"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.15), transparent 40%)`,
      }}
      aria-hidden="true"
    />
  )
}
