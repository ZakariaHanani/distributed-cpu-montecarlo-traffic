"use client";

import { useEffect, useState } from "react";

export function AmbientLight() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-30 dark:opacity-45 transition-all duration-1000 ease-out"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgb(var(--glow1) / 0.18), rgb(var(--glow2) / 0.12) 30%, rgb(var(--glow3) / 0.08) 48%, transparent 65%)`,
      }}
      aria-hidden="true"
    />
  );
}
