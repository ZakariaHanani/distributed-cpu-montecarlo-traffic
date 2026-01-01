"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { Preloader } from "@/components/cpu-grid/preloader";
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
import { AuthPage } from "@/components/cpu-grid/auth-page";
import { LegalPage } from "@/components/cpu-grid/legal-page";
import { ProfilePage } from "@/components/cpu-grid/profile-page";
import { AdminProfilePage } from "@/components/cpu-grid/admin-profile-page";
import { AdminWorkersPage } from "@/components/cpu-grid/admin-workers-page";
import { AdminAuditPage } from "@/components/cpu-grid/admin-audit-page";
import { MySimulationsPage } from "@/components/cpu-grid/my-simulations-page";
import { BecomeWorkerPage } from "@/components/cpu-grid/become-worker-page";
import { NoiseOverlay } from "@/components/cpu-grid/noise-overlay";
import { AmbientLight } from "@/components/cpu-grid/ambient-light";
import { WebGLBackground } from "@/components/cpu-grid/webgl-background";
import { EligibilityPage } from "@/components/cpu-grid/eligibility-page";
import { RewardRulesPage } from "@/components/cpu-grid/reward-rules-page";

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
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [isLoading, setIsLoading] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(false);

  const isAuthView = currentView === "login" || currentView === "signup";
  const isFocusedOnboarding =
    currentView === "become_worker" ||
    currentView === "eligibility" ||
    currentView === "reward_rules";

  useEffect(() => {
    const url = new URL(window.location.href);
    const rawView = url.searchParams.get("view");
    if (!rawView) return;

    const view = rawView as ViewType;
    const allowed: ViewType[] = [
      "home",
      "login",
      "signup",
      "profile",
      "simulations",
      "become_worker",
      "eligibility",
      "reward_rules",
      "admin_profile",
      "admin_audit",
      "admin_workers",
      "privacy",
      "terms",
      "cookies",
    ];
    if (allowed.includes(view)) {
      setCurrentView(view);
    }

    url.searchParams.delete("view");
    const nextQuery = url.searchParams.toString();
    window.history.replaceState(
      {},
      "",
      url.pathname + (nextQuery ? `?${nextQuery}` : "") + url.hash
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (
      currentView === "become_worker" ||
      currentView === "eligibility" ||
      currentView === "reward_rules"
    ) {
      setIsNavVisible(false);
    }
  }, [currentView]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main className="relative min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      {/* Global layers */}
      <NoiseOverlay />
      <AmbientLight />
      <WebGLBackground />

      {/* Navigation */}
      {!isAuthView && (
        <Navigation
          currentView={currentView}
          setCurrentView={setCurrentView}
          isVisible={!isFocusedOnboarding || isNavVisible}
        />
      )}

      {isFocusedOnboarding && (
        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={() => setIsNavVisible((v) => !v)}
          className="
            fixed top-5 left-4 z-50
            flex h-11 w-11 items-center justify-center
            rounded-full border border-white/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))]
            bg-white/70 dark:bg-[rgb(var(--glass)/0.55)] backdrop-blur-2xl
            shadow-[0_18px_55px_-44px_rgba(15,23,42,0.35)] dark:shadow-[0_18px_55px_-44px_rgba(0,0,0,0.55)]
            text-slate-900 dark:text-slate-100
            transition-all duration-200 ease-out
            hover:-translate-y-[1px]
            hover:shadow-[0_22px_70px_-44px_rgba(99,102,241,0.35)]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70
          "
        >
          <span className="text-[22px] leading-none">☰</span>
        </button>
      )}

      {isFocusedOnboarding && isNavVisible && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsNavVisible(false)}
          className="fixed inset-0 z-40 cursor-default"
        />
      )}

      {/* View Router */}
      {currentView === "home" && (
        <div className="relative z-10">
          <div id="home" className="scroll-mt-28" />
          <Hero setCurrentView={setCurrentView} />
          <div id="workers" className="scroll-mt-28" />
          <WorkerTeaser setCurrentView={setCurrentView} />
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
          <Footer setCurrentView={setCurrentView} />
        </div>
      )}

      {(currentView === "login" || currentView === "signup") && (
        <AuthPage mode={currentView} setCurrentView={setCurrentView} />
      )}

      {currentView === "profile" && (
        <ProfilePage setCurrentView={setCurrentView} />
      )}

      {currentView === "simulations" && (
        <MySimulationsPage setCurrentView={setCurrentView} />
      )}

      {currentView === "become_worker" && (
        <BecomeWorkerPage setCurrentView={setCurrentView} />
      )}

      {currentView === "eligibility" && (
        <EligibilityPage setCurrentView={setCurrentView} />
      )}

      {currentView === "reward_rules" && (
        <RewardRulesPage setCurrentView={setCurrentView} />
      )}

      {currentView === "admin_profile" && (
        <AdminProfilePage setCurrentView={setCurrentView} />
      )}

      {currentView === "admin_audit" && (
        <AdminAuditPage setCurrentView={setCurrentView} />
      )}

      {currentView === "admin_workers" && (
        <AdminWorkersPage setCurrentView={setCurrentView} />
      )}

      {(currentView === "privacy" ||
        currentView === "terms" ||
        currentView === "cookies") && (
        <LegalPage type={currentView} setCurrentView={setCurrentView} />
      )}
    </main>
  );
}
