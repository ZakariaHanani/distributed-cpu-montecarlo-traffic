"use client";

import { useParams } from "next/navigation";
import { LegalPage } from "@/components/cpu-grid/legal-page";
import { Navigation } from "@/components/cpu-grid/navigation";
import { NoiseOverlay } from "@/components/cpu-grid/noise-overlay";
import { AmbientLight } from "@/components/cpu-grid/ambient-light";
import { WebGLBackground } from "@/components/cpu-grid/webgl-background";

export default function LegalRoute() {
  const params = useParams();
  const type = params.type as "privacy" | "terms" | "cookies";

  return (
    <main className="relative min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      <NoiseOverlay />
      <AmbientLight />
      <WebGLBackground />
      <Navigation currentView={type} />
      <LegalPage type={type} />
    </main>
  );
}
