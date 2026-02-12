"use client";

import { Team } from "@/components/cpu-grid/team";
import { Navigation } from "@/components/cpu-grid/navigation";
import { NoiseOverlay } from "@/components/cpu-grid/noise-overlay";
import { AmbientLight } from "@/components/cpu-grid/ambient-light";
import { WebGLBackground } from "@/components/cpu-grid/webgl-background";
import { Footer } from "@/components/cpu-grid/footer";

export default function TeamRoute() {
  return (
    <main className="relative min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      <NoiseOverlay />
      <AmbientLight />
      <WebGLBackground />
      <Navigation currentView="home" />
      <div className="pt-24 pb-12">
        <Team />
      </div>
      <Footer />
    </main>
  );
}
