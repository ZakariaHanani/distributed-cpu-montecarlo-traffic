"use client";

import { useState, useEffect } from "react";
import { Preloader } from "@/components/cpu-grid/preloader";
import { Navigation } from "@/components/cpu-grid/navigation";
import { Hero } from "@/components/cpu-grid/hero";
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
import { AuthPage } from "@/components/cpu-grid/auth-page";
import { LegalPage } from "@/components/cpu-grid/legal-page";
import { ProfilePage } from "@/components/cpu-grid/profile-page";
import { NoiseOverlay } from "@/components/cpu-grid/noise-overlay";
import { AmbientLight } from "@/components/cpu-grid/ambient-light";
import { WebGLBackground } from "@/components/cpu-grid/webgl-background";

export type ViewType =
  | "home"
  | "login"
  | "signup"
  | "profile"
  | "privacy"
  | "terms"
  | "cookies";

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main className="relative min-h-screen bg-white">
      {/* Global layers */}
      <NoiseOverlay />
      <AmbientLight />
      <WebGLBackground />

      {/* Navigation */}
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />

      {/* View Router */}
      {currentView === "home" && (
        <div className="relative z-10">
          <Hero />
          <CoreCapabilities />
          <Network />
          <Process />
          <Integration />
          <Architecture />
          <DataVis />
          <Showcase />
          <Insights />
          <Team />
          <Contact />
          <Footer setCurrentView={setCurrentView} />
        </div>
      )}

      {(currentView === "login" || currentView === "signup") && (
        <AuthPage mode={currentView} setCurrentView={setCurrentView} />
      )}

      {currentView === "profile" && (
        <ProfilePage setCurrentView={setCurrentView} />
      )}

      {(currentView === "privacy" ||
        currentView === "terms" ||
        currentView === "cookies") && (
        <LegalPage type={currentView} setCurrentView={setCurrentView} />
      )}
    </main>
  );
}
