"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu } from "lucide-react";
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

function CpuRoadLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="CPU Grid"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <rect x="12" y="12" width="40" height="40" rx="6" />
        <path d="M20 6v6M28 6v6M36 6v6M44 6v6" />
        <path d="M20 52v6M28 52v6M36 52v6M44 52v6" />
        <path d="M6 20h6M6 28h6M6 36h6M6 44h6" />
        <path d="M52 20h6M52 28h6M52 36h6M52 44h6" />
      </g>

      <path
        d="M14 48c10-12 16-8 22-18 6-10 11-8 26-16"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 46c9-10 14-7 20-16 6-9 12-8 26-15"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6 6"
      />

      <g fill="white" stroke="currentColor" strokeWidth="2">
        <rect x="25" y="24" width="12" height="8" rx="2" />
        <circle cx="28" cy="33" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="34" cy="33" r="1.5" fill="currentColor" stroke="none" />
        <rect x="29" y="35" width="12" height="8" rx="2" />
        <circle cx="32" cy="44" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="38" cy="44" r="1.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

interface NavigationProps {
  currentView?: ViewType;
  setCurrentView?: (view: ViewType) => void;
  isVisible?: boolean;
}

import { usePathname, useRouter } from "next/navigation";

export function Navigation({
  currentView: propView,
  isVisible = true,
}: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { isAuthed } = useAuth();
  
  // Use pathname to determine view if propView is not specific
  const currentView = propView || (pathname === "/" ? "home" : pathname.slice(1) as ViewType);
  const isAuthView = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    // Set active link based on pathname
    if (pathname === "/") setActiveLink("Home");
    else if (pathname === "/simulations") setActiveLink("Simulations");
    else if (pathname === "/become-worker") setActiveLink("Workers");
    else if (pathname === "/team") setActiveLink("Team");
  }, [pathname]);

  useEffect(() => {
    const threshold = 12;
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/", action: "link" as const },
    { label: "Simulations", href: "/simulations", action: "link" as const },
    { label: "Workers", href: "/become-worker", action: "link" as const },
    { label: "Architecture", href: "/#architecture", action: "scroll" as const },
    { label: "Team", href: "/team", action: "link" as const },
  ];

  const scrollTo = (href: string) => {
    const id = href.split("#")[1];
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (
    href: string,
    label: string,
    action: "scroll" | "link"
  ) => {
    setActiveLink(label);

    if (action === "link") {
      router.push(href);
      return;
    }

    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => scrollTo(href), 100);
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
      ? "max-w-[1320px] rounded-full bg-white/82 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-2xl border border-white/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] shadow-[0_14px_46px_rgba(0,0,0,0.14)] dark:shadow-[0_14px_46px_rgba(0,0,0,0.45)]"
      : isAuthView
      ? "max-w-none rounded-none bg-white/80 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-2xl border border-white/40 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] shadow-[0_10px_34px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_34px_rgba(0,0,0,0.38)]"
      : "max-w-none rounded-none bg-transparent backdrop-blur-0 border border-transparent shadow-none",
  ].join(" ");

  const innerClassName = [
    "flex w-full items-center gap-5 min-w-0",
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
          <div className="flex-1 flex items-center justify-start min-w-0">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-3 group shrink-0 whitespace-nowrap"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-xl group-hover:bg-indigo-500/40 transition-[opacity,filter,background-color] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <div
                  className={[
                    "relative bg-white p-2 rounded-xl",
                    "ring-1 ring-slate-900/10 dark:ring-white/10",
                    "transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105",
                    isScrolled ? "scale-[0.96]" : "scale-100",
                  ].join(" ")}
                >
                  <CpuRoadLogo className="size-5 text-slate-900" />
                </div>
              </div>
              <div className="flex flex-col items-start leading-none whitespace-nowrap">
                <div
                  className={[
                    "text-lg text-slate-900 dark:text-slate-100 tracking-tight leading-none whitespace-nowrap",
                    "transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isScrolled ? "scale-[0.985]" : "scale-100",
                  ].join(" ")}
                >
                  <span className="font-semibold">CPU</span>{" "}
                  <span className="font-bold">Grid</span>
                </div>
                <span
                  className={[
                    "hidden sm:block text-[10px] text-slate-500 dark:text-slate-300 tracking-wide whitespace-nowrap",
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

          <div className="flex-none flex items-center justify-center">
            <div className="hidden lg:flex items-center">
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
                          ? "text-slate-900 dark:text-slate-100"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100",
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
                                ? "text-slate-900 dark:text-slate-100"
                                : "text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100",
                              "hover:bg-slate-900/5",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70",
                            ].join(" ")}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="min-w-56 rounded-xl border border-white/50 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/80 dark:bg-[rgb(var(--glass)/0.72)] p-1 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
                        >
                          <DropdownMenuItem
                            onSelect={(event) => {
                              event.preventDefault();
                              handleNavClick("/#simulations", link.label, "scroll");
                            }}
                            className="cursor-pointer rounded-lg"
                          >
                            Simulation workflow
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-1 bg-white/40 dark:bg-white/10" />
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
                      "border border-white/55 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/55 dark:bg-[rgb(var(--glass)/0.55)] backdrop-blur-2xl",
                      "text-slate-700 dark:text-slate-200 transition-[transform,box-shadow] duration-200 ease-out",
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
                  className="min-w-60 rounded-xl border border-white/50 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/85 dark:bg-[rgb(var(--glass)/0.76)] p-1 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
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
                  <DropdownMenuSeparator className="my-1 bg-white/40 dark:bg-white/10" />
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      handleNavClick("/#simulations", "Simulations", "scroll");
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

          <div className="flex-1 flex items-center justify-end gap-2 lg:gap-3 shrink-0 whitespace-nowrap">
            {isAuthed && <ProfileMenu />}

            {!isAuthed && (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="
                    relative whitespace-nowrap
                    px-3 sm:px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300
                    rounded-full border border-transparent
                    transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out
                    hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-200 dark:hover:border-white/10
                    hover:-translate-y-[1px] hover:shadow-sm
                    active:translate-y-0 active:shadow-none
                    motion-reduce:transition-none motion-reduce:hover:translate-y-0
                  "
                >
                  Sign in
                </button>

                <button
                  onClick={() => router.push("/signup")}
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
