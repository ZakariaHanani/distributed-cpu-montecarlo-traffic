"use client";

import { useState, useEffect } from "react";
import { Cpu, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Toaster } from "@/components/ui/sonner";
import { ProfileMenu } from "@/components/ui/profile-menu";
import { useAuth } from "@/hooks/useAuth";
import type { ViewType } from "@/app/page";

interface NavigationProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

export function Navigation({ currentView, setCurrentView }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { isAuthed } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Simulations", href: "#capabilities" },
    { label: "Workers", href: "#network" },
    { label: "Docs", href: "#architecture" },
    { label: "FAQ", href: "#team" },
  ];

  const handleNavClick = (href: string, label: string) => {
    setActiveLink(label);
    if (currentView !== "home") {
      setCurrentView("home");
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <Toaster richColors position="top-center" />
      <nav
        className={`
          transition-all duration-300 ease-out
          ${
            isScrolled
              ? "max-w-[800px] w-full rounded-full bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
              : "max-w-[1400px] w-full rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-none"
          }
        `}
      >
        <div
          className={`
            flex items-center justify-between transition-all duration-300 ease-out
            ${isScrolled ? "px-4 py-2" : "px-6 py-4"}
          `}
        >
          <button
            onClick={() => setCurrentView("home")}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-xl group-hover:bg-indigo-500/40 transition-all duration-300" />
              <div className="relative bg-slate-900 p-2 rounded-xl transition-transform duration-200 group-hover:scale-105">
                <Cpu className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                CPU Grid
              </span>
              <span
                className={`text-[10px] text-slate-500 tracking-wide uppercase transition-all duration-300 ${
                  isScrolled ? "opacity-0 h-0" : "opacity-100 h-3"
                }`}
              >
                Traffic Monte Carlo
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href, link.label)}
                className={`
                  relative px-3 py-2 text-sm font-medium transition-colors duration-200
                  ${
                    activeLink === link.label
                      ? "text-slate-900"
                      : "text-slate-600 hover:text-slate-900"
                  }
                  group
                `}
              >
                {link.label}
                {/* Animated underline */}
                <span
                  className={`
                    absolute bottom-1 left-3 right-3 h-[2px] bg-indigo-500 rounded-full
                    transition-transform duration-300 origin-left
                    ${
                      activeLink === link.label
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }
                  `}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 min-w-[300px]">
            {isAuthed && <ProfileMenu setCurrentView={setCurrentView} />}

            <button
              type="button"
              onClick={toggleTheme}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
              className="
                relative flex h-9 w-9 items-center justify-center
                rounded-full border border-slate-200 bg-white/80
                transition-all duration-300 ease-out
                hover:-translate-y-[1px] hover:shadow-glow
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70
                dark:bg-slate-900 dark:border-slate-700
              "
            >
              <span
                className={`
                  absolute inset-0 rounded-full bg-gradient-to-br
                  from-indigo-500/15 via-violet-500/15 to-rose-500/15
                  transition-opacity duration-300
                  ${theme === "dark" ? "opacity-100" : "opacity-0"}
                `}
              />
              <span
                className={`
                  relative flex items-center justify-center
                  transition-transform duration-300
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

            {!isAuthed && (
              <>
                <button
                  onClick={() => setCurrentView("login")}
                  className="
                    relative px-4 py-2 text-sm font-medium text-slate-600 
                    rounded-full border border-transparent
                    transition-all duration-200 ease-out
                    hover:text-slate-900 hover:bg-slate-100 hover:border-slate-200 
                    hover:-translate-y-[1px] hover:shadow-sm
                    active:translate-y-0 active:shadow-none
                  "
                >
                  Sign in
                </button>

                <button
                  onClick={() => setCurrentView("signup")}
                  className="
                    relative px-5 py-2 text-sm font-semibold text-white 
                    rounded-full overflow-hidden
                    bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500
                    transition-all duration-200 ease-out
                    hover:scale-[1.02] hover:-translate-y-[1px]
                    hover:shadow-[0_8px_24px_rgba(99,102,241,0.4)]
                    active:scale-[0.98] active:translate-y-0
                  "
                >
                  <span className="relative z-10">Sign up</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-violet-400 to-rose-400 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
