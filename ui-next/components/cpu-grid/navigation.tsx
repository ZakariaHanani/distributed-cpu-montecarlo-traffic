"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Toaster } from "@/components/ui/sonner";
import { ProfileMenu } from "@/components/ui/profile-menu";
import { useAuth } from "@/hooks/useAuth";
import type { ViewType } from "@/app/page";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isVisible?: boolean;
}

export function Navigation({
  currentView,
  setCurrentView,
  isVisible = true,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { isAuthed } = useAuth();
  const isAuthView = currentView === "login" || currentView === "signup";

  useEffect(() => {
    const threshold = 12;
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", action: "scroll" as const },
    { label: "Simulations", href: "#simulations", action: "scroll" as const },
    { label: "Workers", href: "#workers", action: "flow" as const },
    { label: "Architecture", href: "#architecture", action: "scroll" as const },
    { label: "Team", href: "#team", action: "scroll" as const },
  ];

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (
    href: string,
    label: string,
    action: "scroll" | "flow"
  ) => {
    setActiveLink(label);

    if (action === "flow") {
      setCurrentView("become_worker");
      return;
    }

    if (currentView !== "home") {
      setCurrentView("home");
      setTimeout(() => scrollTo(href), 50);
      return;
    }

    scrollTo(href);
  };

  const containerClassName = [
    "relative w-full mx-auto",
    "transition-[max-width,transform,opacity,background-color,backdrop-filter,box-shadow,border-radius,border-color] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
    isVisible
      ? "opacity-100 translate-y-0 pointer-events-auto"
      : "opacity-0 -translate-y-6 pointer-events-none",
    isScrolled
      ? "max-w-[1320px] rounded-full bg-white/82 backdrop-blur-2xl border border-white/60 shadow-[0_14px_46px_rgba(0,0,0,0.14)]"
      : isAuthView
      ? "max-w-none rounded-none bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_10px_34px_rgba(0,0,0,0.08)]"
      : "max-w-none rounded-none bg-transparent backdrop-blur-0 border border-transparent shadow-none",
  ].join(" ");

  const innerClassName = [
    "flex w-full items-center justify-between gap-5 min-w-0",
    "transition-[padding,height] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
    isScrolled ? "h-14 px-4 sm:px-6" : "h-[60px] px-5 sm:px-7",
  ].join(" ");

  const headerClassName = [
    "fixed top-0 left-0 right-0 z-50 flex justify-center",
    "transition-[padding] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
    isScrolled ? "px-4 pt-4" : "px-0 pt-3",
  ].join(" ");

  return (
    <header className={headerClassName}>
      <Toaster richColors position="top-center" />
      <nav className={containerClassName}>
        <div className={innerClassName}>
          <div className="flex items-center shrink-0 whitespace-nowrap">
            <button
              onClick={() => setCurrentView("home")}
              className="flex items-center gap-3 group shrink-0 whitespace-nowrap"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-xl group-hover:bg-indigo-500/40 transition-[opacity,filter,background-color] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <div
                  className={[
                    "relative bg-slate-900 p-2 rounded-xl",
                    "ring-1 ring-white/10",
                    "transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105",
                    isScrolled ? "scale-[0.96]" : "scale-100",
                  ].join(" ")}
                >
                  <div className="relative size-5">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 flex size-[10px] items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 shadow-[0_0_0_1px_rgba(255,255,255,0.10)]">
                      <div className="size-[3px] rounded-full bg-white/90" />
                    </div>

                    <div className="absolute left-[9px] top-[6px] h-px w-[11px] origin-left -rotate-[26deg] rounded-full bg-gradient-to-r from-indigo-300/70 via-violet-300/70 to-violet-300/10" />
                    <div className="absolute left-[9px] top-1/2 h-px w-[11px] -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-300/70 via-violet-300/70 to-violet-300/10" />
                    <div className="absolute left-[9px] bottom-[6px] h-px w-[11px] origin-left rotate-[26deg] rounded-full bg-gradient-to-r from-indigo-300/70 via-violet-300/70 to-violet-300/10" />

                    <div className="absolute right-0 top-[2px] size-[6px] rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
                    <div className="absolute right-0 top-1/2 size-[6px] -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
                    <div className="absolute right-0 bottom-[2px] size-[6px] rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start leading-none whitespace-nowrap">
                <div
                  className={[
                    "text-lg text-slate-900 tracking-tight leading-none whitespace-nowrap",
                    "transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isScrolled ? "scale-[0.985]" : "scale-100",
                  ].join(" ")}
                >
                  <span className="font-semibold">CPU</span>{" "}
                  <span className="font-bold">Grid</span>
                </div>
                <span
                  className={[
                    "hidden sm:block text-[10px] text-slate-500 tracking-wide whitespace-nowrap",
                    "transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isScrolled
                      ? "opacity-75 translate-y-[0.5px]"
                      : "opacity-100",
                  ].join(" ")}
                >
                  Distributed Monte Carlo Computing
                </span>
              </div>
            </button>
          </div>

          <div className="flex-1 min-w-0 flex items-center justify-center">
            <div className="hidden lg:flex items-center min-w-0">
              <div className="flex items-center gap-1 lg:gap-2 min-w-0">
                {navLinks.map((link) => (
                  <div key={link.href} className="flex items-center">
                    <button
                      onClick={() =>
                        handleNavClick(link.href, link.label, link.action)
                      }
                      className={[
                        "relative px-2.5 lg:px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap",
                        activeLink === link.label
                          ? "text-slate-900"
                          : "text-slate-600 hover:text-slate-900",
                        "group",
                      ].join(" ")}
                    >
                      {link.label}
                      <span
                        className={[
                          "absolute bottom-1 left-3 right-3 h-[2px] bg-indigo-500 rounded-full",
                          "transition-transform duration-300 origin-left",
                          activeLink === link.label
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100",
                        ].join(" ")}
                      />
                    </button>

                    {link.label === "Simulations" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            aria-label="Simulation actions"
                            className={[
                              "ml-0.5 flex h-8 w-8 items-center justify-center rounded-full",
                              "transition-colors duration-200",
                              activeLink === link.label
                                ? "text-slate-900"
                                : "text-slate-500 hover:text-slate-900",
                              "hover:bg-slate-900/5",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70",
                            ].join(" ")}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="min-w-56 rounded-xl border border-white/50 bg-white/80 p-1 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-2xl"
                        >
                          <DropdownMenuItem
                            onSelect={(event) => {
                              event.preventDefault();
                              handleNavClick(link.href, link.label, "scroll");
                            }}
                            className="cursor-pointer rounded-lg"
                          >
                            Simulation workflow
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-1 bg-white/40" />
                          <DropdownMenuItem
                            asChild
                            className="cursor-pointer rounded-lg"
                          >
                            <Link
                              href="/simulations/new"
                              onClick={() => setActiveLink("Simulations")}
                            >
                              New simulation
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex lg:hidden items-center justify-center shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open navigation menu"
                    className={[
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      "border border-white/55 bg-white/55 backdrop-blur-2xl",
                      "text-slate-700 transition-[transform,box-shadow] duration-200 ease-out",
                      "hover:-translate-y-[1px] hover:shadow-[0_10px_26px_-18px_rgba(15,23,42,0.35)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70",
                      "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                    ].join(" ")}
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="min-w-60 rounded-xl border border-white/50 bg-white/85 p-1 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-2xl"
                >
                  {navLinks.map((link) => (
                    <DropdownMenuItem
                      key={link.href}
                      onSelect={(event) => {
                        event.preventDefault();
                        handleNavClick(link.href, link.label, link.action);
                      }}
                      className="cursor-pointer rounded-lg"
                    >
                      {link.label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="my-1 bg-white/40" />
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      handleNavClick("#simulations", "Simulations", "scroll");
                    }}
                    className="cursor-pointer rounded-lg"
                  >
                    Simulation workflow
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer rounded-lg"
                  >
                    <Link
                      href="/simulations/new"
                      onClick={() => setActiveLink("Simulations")}
                    >
                      New simulation
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 lg:gap-3 shrink-0 whitespace-nowrap">
            <button
              type="button"
              onClick={toggleTheme}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
              className="
                relative flex h-9 w-9 items-center justify-center
                rounded-full border border-slate-200 bg-white/80
                transition-[transform,box-shadow,background-color,border-color] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:-translate-y-[1px] hover:shadow-glow
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70
                motion-reduce:transition-none motion-reduce:hover:translate-y-0
                dark:bg-slate-900 dark:border-slate-700
              "
            >
              <span
                className={`
                  absolute inset-0 rounded-full bg-gradient-to-br
                  from-indigo-500/15 via-violet-500/15 to-rose-500/15
                  transition-opacity duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${theme === "dark" ? "opacity-100" : "opacity-0"}
                `}
              />
              <span
                className={`
                  relative flex items-center justify-center
                  transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${
                    theme === "dark"
                      ? "rotate-180 scale-110"
                      : "rotate-0 scale-100"
                  }
                `}
              >
                {theme === "dark" ? (
                  <Moon className="h-4 w-4 text-slate-100" />
                ) : (
                  <Sun className="h-4 w-4 text-amber-400" />
                )}
              </span>
              <span className="sr-only">
                {theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"}
              </span>
            </button>

            {isAuthed && <ProfileMenu setCurrentView={setCurrentView} />}

            {!isAuthed && (
              <>
                <button
                  onClick={() => setCurrentView("login")}
                  className="
                    relative whitespace-nowrap
                    px-3 sm:px-4 py-2 text-sm font-medium text-slate-600
                    rounded-full border border-transparent
                    transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out
                    hover:text-slate-900 hover:bg-slate-100 hover:border-slate-200
                    hover:-translate-y-[1px] hover:shadow-sm
                    active:translate-y-0 active:shadow-none
                    motion-reduce:transition-none motion-reduce:hover:translate-y-0
                  "
                >
                  Sign in
                </button>

                <button
                  onClick={() => setCurrentView("signup")}
                  className="
                    relative whitespace-nowrap
                    px-4 sm:px-5 py-2 text-sm font-semibold text-white
                    rounded-full overflow-visible
                    bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500
                    transition-[transform,box-shadow] duration-200 ease-out
                    hover:scale-[1.02] hover:-translate-y-[1px]
                    hover:shadow-[0_8px_24px_rgba(99,102,241,0.4)]
                    active:scale-[0.98] active:translate-y-0
                    motion-reduce:transition-none motion-reduce:hover:translate-y-0
                  "
                >
                  <span className="relative z-10">Sign up</span>
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-rose-400 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
