"use client";

import { AdminWorkersPage } from "@/components/cpu-grid/admin-workers-page";
import { Navigation } from "@/components/cpu-grid/navigation";
import { NoiseOverlay } from "@/components/cpu-grid/noise-overlay";
import { AmbientLight } from "@/components/cpu-grid/ambient-light";
import { WebGLBackground } from "@/components/cpu-grid/webgl-background";

export default function AdminWorkersRoute() {
  return (
    <main className="relative min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      <NoiseOverlay />
      <AmbientLight />
      <WebGLBackground />
      <Navigation currentView="admin_workers" />
      <AdminWorkersPage />
    </main>
  );
}
