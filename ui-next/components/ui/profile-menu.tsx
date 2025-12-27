"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { toast } from "sonner";
import {
  ChevronDown,
  FileDown,
  Layers,
  LogOut,
  ShieldAlert,
  Sparkles,
  UserCircle,
  Workflow,
} from "lucide-react";

import type { ViewType } from "@/app/page";
import { useAuth } from "@/hooks/useAuth";
import {
  clearAuthMeta,
  clearDisplayName,
  clearToken,
  getRoleFromToken,
} from "@/lib/authApi";

type ProfileMenuProps = {
  setCurrentView: (view: ViewType) => void;
};

export function ProfileMenu({ setCurrentView }: ProfileMenuProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { token, name } = useAuth();
  const tokenRole = token ? getRoleFromToken(token) : null;
  const displayName = name && name !== "—" ? name : null;
  const isAdmin = tokenRole === "ADMIN";
  const [isPresent, setIsPresent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsPresent(true);
    setIsOpen(true);
  };

  useLayoutEffect(() => {
    if (!isPresent) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (buttonRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      close();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isPresent]);

  useLayoutEffect(() => {
    if (!isPresent || !menuRef.current) return;

    const el = menuRef.current;
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.killTweensOf(el);
        gsap.fromTo(
          el,
          { opacity: 0, y: -6, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: "power2.out" }
        );
      } else {
        gsap.killTweensOf(el);
        gsap.to(el, {
          opacity: 0,
          y: -6,
          scale: 0.98,
          duration: 0.14,
          ease: "power2.in",
          onComplete: () => setIsPresent(false),
        });
      }
    }, menuRef);

    return () => ctx.revert();
  }, [isOpen, isPresent]);

  const handleVisitProfile = () => {
    setCurrentView(isAdmin ? "admin_profile" : "profile");
    close();
  };

  const handleManageWorkers = () => {
    if (!isAdmin) {
      toast("Admin access required");
      setCurrentView("home");
      close();
      return;
    }
    setCurrentView("admin_workers");
    close();
  };

  const handleSystemLogs = () => {
    if (!isAdmin) {
      toast("Admin access required");
      setCurrentView("home");
      close();
      return;
    }
    setCurrentView("admin_audit");
    close();
  };

  const handleMySimulations = () => {
    if (isAdmin) return;
    setCurrentView("simulations");
    close();
  };

  const handleExportResults = () => {
    if (isAdmin) return;
    toast("Export coming soon");
    close();
  };

  const handleSignOut = () => {
    clearToken();
    clearAuthMeta();
    clearDisplayName();
    window.dispatchEvent(new Event("auth:changed"));
    toast("Signed out");
    setCurrentView("home");
    close();
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => (isPresent && isOpen ? close() : open())}
        className="
          group
          relative inline-flex h-9 items-center gap-2 px-3
          rounded-full border border-white/50 bg-white/70 backdrop-blur-xl
          shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)]
          transition-all duration-200 ease-out
          hover:-translate-y-[1px] hover:shadow-[0_16px_44px_-20px_rgba(99,102,241,0.38)]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70
        "
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-rose-500/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <UserCircle className="relative size-4 text-slate-700" />
        <ChevronDown
          className={`relative size-4 text-slate-500 transition-transform duration-200 ${
            isPresent && isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
        <span className="sr-only">Open profile menu</span>
      </button>

      {isPresent && (
        <div
          ref={menuRef}
          role="menu"
          className="
            absolute right-0 mt-3 w-64
            rounded-[1.5rem] bg-white/80 backdrop-blur-2xl
            border border-white/50
            shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)]
            p-2
            origin-top-right
            will-change-transform
          "
        >
          <div className="px-3 py-2">
            {displayName ? (
              <div className="flex flex-col">
                <span className="text-xs text-slate-500">Signed in as</span>
                <span className="text-sm font-medium text-slate-900">
                  {displayName}
                </span>
              </div>
            ) : (
              <div className="text-xs text-slate-500">Signed in</div>
            )}
          </div>

          <button
            type="button"
            role="menuitem"
            onClick={handleVisitProfile}
            className="
              w-full flex items-center gap-3 px-3 py-3 rounded-[1.1rem]
              text-left text-sm font-medium text-slate-800
              transition-colors hover:bg-slate-900/5
            "
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-500/15">
              <Sparkles className="size-4" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-medium text-slate-900 leading-tight">
                Visit profile
              </span>
              <span className="text-xs text-slate-500 leading-tight">
                Account & settings
              </span>
            </span>
          </button>

          {isAdmin && (
            <div className="mt-2">
              <div className="px-3 pb-1 pt-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  Admin
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-900/5 text-slate-900 px-2.5 py-1 text-[11px] font-semibold ring-1 ring-slate-900/10">
                  ADMIN
                </span>
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={handleManageWorkers}
                className="
                  w-full flex items-center gap-3 px-3 py-3 rounded-[1.1rem]
                  text-left text-sm font-medium text-slate-800
                  transition-colors hover:bg-slate-900/5
                "
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/15">
                  <Workflow className="size-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900 leading-tight">
                    Manage workers
                  </span>
                  <span className="text-xs text-slate-500 leading-tight">
                    Monitor node mesh
                  </span>
                </span>
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={handleSystemLogs}
                className="
                  w-full flex items-center gap-3 px-3 py-3 rounded-[1.1rem]
                  text-left text-sm font-medium text-slate-800
                  transition-colors hover:bg-slate-900/5
                "
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/15">
                  <ShieldAlert className="size-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900 leading-tight">
                    System logs
                  </span>
                  <span className="text-xs text-slate-500 leading-tight">
                    Audit & security events
                  </span>
                </span>
              </button>
            </div>
          )}

          {!isAdmin && (
            <div className="mt-2">
              <button
                type="button"
                role="menuitem"
                onClick={handleMySimulations}
                className="
                  w-full flex items-center gap-3 px-3 py-3 rounded-[1.1rem]
                  text-left text-sm font-medium text-slate-800
                  transition-colors hover:bg-slate-900/5
                "
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-slate-900/5 text-slate-700 ring-1 ring-slate-900/10">
                  <Layers className="size-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900 leading-tight">
                    My simulations
                  </span>
                  <span className="text-xs text-slate-500 leading-tight">
                    Runs, durations, results
                  </span>
                </span>
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={handleExportResults}
                className="
                  w-full flex items-center gap-3 px-3 py-3 rounded-[1.1rem]
                  text-left text-sm font-medium text-slate-800
                  transition-colors hover:bg-slate-900/5
                "
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/15">
                  <FileDown className="size-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900 leading-tight">
                    Export results
                  </span>
                  <span className="text-xs text-slate-500 leading-tight">
                    CSV / PDF (coming soon)
                  </span>
                </span>
              </button>
            </div>
          )}

          <div className="my-2 h-px bg-slate-200/70" />

          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="
              w-full flex items-center gap-3 px-3 py-3 rounded-[1.1rem]
              text-left text-sm font-semibold text-rose-700
              transition-colors hover:bg-rose-500/10
            "
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/15">
              <LogOut className="size-4" />
            </span>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
