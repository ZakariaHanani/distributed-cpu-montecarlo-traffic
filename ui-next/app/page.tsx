"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { Navigation } from "@/components/cpu-grid/navigation";
import { Hero } from "@/components/cpu-grid/hero";
import { WorkerTeaser } from "@/components/cpu-grid/worker-teaser";
import { CoreCapabilities } from "@/components/cpu-grid/core-capabilities";
import { Network } from "@/components/cpu-grid/network";
import { Process } from "@/components/cpu-grid/process";
import { Integration } from "@/components/cpu-grid/integration";
import { Architecture } from "@/components/cpu-grid/architecture";
import { DataVis } from "@/components/cpu-grid/data-vis";
import { Showcase } from "@/components/cpu-grid/showcase";
import { Insights } from "@/components/cpu-grid/insights";
import { Team } from "@/components/cpu-grid/team";
import { Contact } from "@/components/cpu-grid/contact";
import { Footer } from "@/components/cpu-grid/footer";
import { NoiseOverlay } from "@/components/cpu-grid/noise-overlay";
import { AmbientLight } from "@/components/cpu-grid/ambient-light";
import { WebGLBackground } from "@/components/cpu-grid/webgl-background";

export type ViewType =
  | "home"
  | "login"
  | "signup"
  | "profile"
  | "simulations"
  | "become_worker"
  | "eligibility"
  | "reward_rules"
  | "admin_profile"
  | "admin_audit"
  | "admin_workers"
  | "privacy"
  | "terms"
  | "cookies";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="relative min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      {/* Global layers */}
      <NoiseOverlay />
      <AmbientLight />
      <WebGLBackground />

      {/* Navigation */}
      <Navigation currentView="home" />

      <div className="relative z-10">
        <div id="home" className="scroll-mt-28" />
        <Hero />
        <div id="workers" className="scroll-mt-28" />
        <WorkerTeaser />
        <CoreCapabilities />
        <Network />
        <div id="simulations" className="scroll-mt-28" />
        <Process />
        <Integration />
        <div id="architecture" className="scroll-mt-28" />
        <Architecture />
        <DataVis />
        <Showcase />
        <Insights />
        <div id="team" className="scroll-mt-28" />
        <Team />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
