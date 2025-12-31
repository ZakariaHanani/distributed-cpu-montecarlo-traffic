"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  ChartColumn,
  Cpu,
  Database,
  Gauge,
  KeyRound,
  Lock,
  Sparkles,
  Timer,
  Trash2,
  User,
} from "lucide-react";
import { toast } from "sonner";

import type { ViewType } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ApiError,
  changePassword,
  clearAuthMeta,
  clearDisplayName,
  clearToken,
  deleteMe,
  deleteHistory,
  getDisplayNameFromToken,
  getMustChangePasswordFromToken,
  getMe,
  getMyStats,
  getRoleFromToken,
  getToken,
  setAuthMeta,
  setDisplayName,
  setToken,
  updateMe,
  type UserStats,
} from "@/lib/authApi";

type ProfilePageProps = {
  setCurrentView: (view: ViewType) => void;
};

type ProfileTabKey = "profile" | "stats" | "security" | "data";

export function ProfilePage({ setCurrentView }: ProfilePageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoadingMe, setIsLoadingMe] = useState(true);
  const [fullName, setFullName] = useState<string>("—");
  const [role, setRole] = useState<"USER" | "ADMIN" | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTabKey>("profile");
  const [mustChangePassword, setMustChangePassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [username, setUsername] = useState("—");
  const [email, setEmail] = useState("—");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [activity, setActivity] = useState<
    Array<{ title: string; status: "Completed" | "Pending" | "Failed" }>
  >([
    { title: "Monte Carlo batch run", status: "Completed" as const },
    { title: "Worker mesh warmup", status: "Pending" as const },
    { title: "Traffic grid export", status: "Completed" as const },
    { title: "Scenario sweep", status: "Failed" as const },
    { title: "Result aggregation", status: "Pending" as const },
  ]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [isDeletingHistory, setIsDeletingHistory] = useState(false);

  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [deleteAccountPhrase, setDeleteAccountPhrase] = useState("");
  const [deleteAccountConfirmed, setDeleteAccountConfirmed] = useState(false);
  const [deleteAccountPassword, setDeleteAccountPassword] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setCurrentView("login");
      toast("Please sign in");
      return;
    }

    setIsAllowed(true);
    const mustChange = getMustChangePasswordFromToken(token);
    setMustChangePassword(mustChange);
    if (mustChange) {
      setActiveTab("security");
      toast("Password update required");
    }
    const name = getDisplayNameFromToken(token) ?? "—";
    setFullName(name);
    setRole(getRoleFromToken(token));

    const parts = name === "—" ? [] : name.trim().split(/\s+/).filter(Boolean);
    const nextFirst = parts[0] ?? "";
    const nextLast = parts.length > 1 ? parts.slice(1).join(" ") : "";
    setFirstName(nextFirst);
    setLastName(nextLast);

    let cancelled = false;

    const boot = async () => {
      try {
        const me = await getMe();
        if (cancelled) return;
        setFirstName(me.firstName ?? "");
        setLastName(me.lastName ?? "");
        setCity(me.city ?? "");
        setUsername(me.username ?? "—");
        setEmail(me.email ?? "—");
        const nextFullName = `${me.firstName ?? ""} ${
          me.lastName ?? ""
        }`.trim();
        if (nextFullName) {
          setFullName(nextFullName);
          setDisplayName(nextFullName);
          window.dispatchEvent(new Event("auth:changed"));
        }
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 401) {
          clearToken();
          clearAuthMeta();
          clearDisplayName();
          window.dispatchEvent(new Event("auth:changed"));
          setCurrentView("login");
          toast("Session expired. Please sign in again.");
          return;
        }
        toast(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        if (!cancelled) setIsLoadingMe(false);
      }
    };

    void boot();

    return () => {
      cancelled = true;
    };
  }, [setCurrentView]);

  useLayoutEffect(() => {
    if (!isAllowed || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-profile-animate]");
      gsap.fromTo(
        items,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.06,
          clearProps: "transform",
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [isAllowed]);

  useLayoutEffect(() => {
    if (!isAllowed || !panelRef.current) return;
    const el = panelRef.current;
    const ctx = gsap.context(() => {
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { opacity: 0, y: 10, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.28,
          ease: "power2.out",
          clearProps: "filter,transform",
        }
      );
    }, panelRef);
    return () => ctx.revert();
  }, [activeTab, isAllowed]);

  const handleAuthExpired = () => {
    clearToken();
    clearAuthMeta();
    clearDisplayName();
    window.dispatchEvent(new Event("auth:changed"));
    setCurrentView("login");
    toast("Session expired. Please sign in again.");
  };

  const handleApiError = (err: unknown, fallbackMessage: string) => {
    if (err instanceof ApiError && err.status === 401) {
      handleAuthExpired();
      return;
    }
    toast(err instanceof Error ? err.message : fallbackMessage);
  };

  useEffect(() => {
    if (!isAllowed) return;
    if (activeTab !== "stats") return;
    if (stats !== null) return;

    let cancelled = false;
    setIsLoadingStats(true);
    const load = async () => {
      try {
        const next = await getMyStats();
        if (cancelled) return;
        setStats(next);
      } catch (err) {
        if (cancelled) return;
        handleApiError(err, "Failed to load stats");
      } finally {
        if (!cancelled) setIsLoadingStats(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [activeTab, isAllowed, stats]);

  const handleSaveChanges = async () => {
    if (isSavingProfile) return;
    setIsSavingProfile(true);
    try {
      const payloadCity = city.trim() ? city.trim() : null;
      const me = await updateMe({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        city: payloadCity,
      });
      setFirstName(me.firstName ?? "");
      setLastName(me.lastName ?? "");
      setCity(me.city ?? "");
      setUsername(me.username ?? "—");
      setEmail(me.email ?? "—");
      const nextFullName = `${me.firstName ?? ""} ${me.lastName ?? ""}`.trim();
      if (nextFullName) {
        setFullName(nextFullName);
        setDisplayName(nextFullName);
        window.dispatchEvent(new Event("auth:changed"));
      }
      toast("Profile updated");
    } catch (err) {
      handleApiError(err, "Failed to update profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (isChangingPassword) return;
    if (!currentPassword) {
      toast("Current password is required");
      return;
    }
    if (!newPassword) {
      toast("New password is required");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast("Passwords do not match");
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await changePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      if (res.token) {
        setToken(res.token);
        const name = getDisplayNameFromToken(res.token);
        if (name) setDisplayName(name);
        const nextRole = getRoleFromToken(res.token);
        setAuthMeta({ role: nextRole ?? "USER", name: name ?? "—" });
        setMustChangePassword(getMustChangePasswordFromToken(res.token));
        window.dispatchEvent(new Event("auth:changed"));
      }
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      toast(res.message || "Password updated");
    } catch (err) {
      handleApiError(err, "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteHistory = async () => {
    if (isDeletingHistory) return;
    setIsDeletingHistory(true);
    try {
      const res = await deleteHistory();
      setActivity([]);
      setStats((prev) =>
        prev
          ? {
              ...prev,
              totalSimulations: 0,
              avgExecutionMs: 0,
              successRate: 0,
              lastRunAt: null,
            }
          : prev
      );
      toast(res.message || "History deleted");
      setIsDeleteOpen(false);
      setDeleteConfirmed(false);
    } catch (err) {
      handleApiError(err, "Failed to delete history");
    } finally {
      setIsDeletingHistory(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (isDeletingAccount) return;
    if (deleteAccountPhrase.trim().toUpperCase() !== "DELETE") return;
    if (!deleteAccountConfirmed) return;
    if (!deleteAccountPassword.trim()) {
      toast("Password is required");
      return;
    }
    setIsDeletingAccount(true);
    try {
      await deleteMe({
        confirmText: deleteAccountPhrase.trim(),
        password: deleteAccountPassword,
      });
      clearToken();
      clearAuthMeta();
      clearDisplayName();
      window.dispatchEvent(new Event("auth:changed"));
      setIsDeleteAccountOpen(false);
      setDeleteAccountPhrase("");
      setDeleteAccountPassword("");
      setDeleteAccountConfirmed(false);
      setCurrentView("login");
      toast("Account deleted");
    } catch (err) {
      handleApiError(err, "Failed to delete account");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const isBooting = isLoadingMe;
  const signedInLabel = fullName === "—" ? "—" : fullName;

  const avatarLetter = useMemo(() => {
    const base = signedInLabel === "—" ? "" : signedInLabel;
    return base.trim().slice(0, 1).toUpperCase() || "U";
  }, [signedInLabel]);

  if (!isAllowed) {
    return <div className="min-h-screen bg-white dark:bg-[rgb(var(--bg))]" />;
  }

  const tabs = [
    { key: "profile" as const, label: "Profile", icon: User },
    { key: "stats" as const, label: "Stats", icon: ChartColumn },
    { key: "security" as const, label: "Security", icon: KeyRound },
    { key: "data" as const, label: "Data", icon: Database },
  ];

  const formatSuccessRate = (value: number) => {
    const rawPercent = value <= 1 ? value * 100 : value;
    const bounded = Math.max(0, Math.min(100, rawPercent));
    return `${Math.round(bounded)}%`;
  };

  const formatAvgExecution = (ms: number) => {
    if (!Number.isFinite(ms) || ms <= 0) return "—";
    if (ms >= 1000) return `${(ms / 1000).toFixed(2)}s`;
    return `${Math.round(ms)}ms`;
  };

  const formatLastRun = (iso: string | null) => {
    if (!iso) return "—";
    const dt = new Date(iso);
    if (Number.isNaN(dt.getTime())) return "—";
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const isStatsBooting = isLoadingStats || stats === null;

  const totalSimulationsValue =
    stats && Number.isFinite(stats.totalSimulations)
      ? stats.totalSimulations.toLocaleString()
      : "—";
  const successRateValue = stats ? formatSuccessRate(stats.successRate) : "—";
  const avgExecutionValue = stats
    ? formatAvgExecution(stats.avgExecutionMs)
    : "—";
  const lastRunValue = stats ? formatLastRun(stats.lastRunAt) : "—";

  const statCards = [
    {
      icon: Cpu,
      label: "Total simulations run",
      value: totalSimulationsValue,
      accent: "from-indigo-500 via-violet-500 to-rose-500",
    },
    {
      icon: Gauge,
      label: "Success rate",
      value: successRateValue,
      accent: "from-emerald-500 via-teal-500 to-cyan-500",
    },
    {
      icon: Timer,
      label: "Average execution time",
      value: avgExecutionValue,
      accent: "from-violet-500 via-indigo-500 to-sky-500",
    },
    {
      icon: Calendar,
      label: "Last run date",
      value: lastRunValue,
      accent: "from-rose-500 via-fuchsia-500 to-violet-500",
    },
  ] as const;

  const tabTitle =
    activeTab === "profile"
      ? "Profile"
      : activeTab === "stats"
      ? "Stats"
      : activeTab === "security"
      ? "Security"
      : "Data";

  const tabSubtitle =
    activeTab === "profile"
      ? "Edit your account details."
      : activeTab === "stats"
      ? "Your simulation telemetry snapshot."
      : activeTab === "security"
      ? "Update your password."
      : "Manage your stored simulation history.";

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-white dark:bg-[rgb(var(--bg))] pt-24"
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <button
          onClick={() => {
            if (mustChangePassword) {
              toast("Password update required");
              setActiveTab("security");
              return;
            }
            setCurrentView("home");
          }}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors mb-10"
          data-profile-animate
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="grid lg:grid-cols-[360px_1fr] gap-8 items-start">
          <aside
            className="glass card-super-lg shadow-deep p-8 relative overflow-hidden lg:sticky lg:top-28"
            data-profile-animate
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -right-24 size-80 rounded-full bg-indigo-500/15 blur-3xl" />
              <div className="absolute -bottom-28 -left-24 size-96 rounded-full bg-rose-500/10 blur-3xl" />
            </div>

            <div className="relative flex items-start gap-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/25 via-violet-500/25 to-rose-500/20 blur-xl" />
                <div className="relative rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500 p-[2px]">
                  <div className="flex size-16 items-center justify-center rounded-full bg-white dark:bg-slate-950">
                    <span className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                      {isBooting ? (
                        <Skeleton className="h-6 w-6 rounded-full bg-slate-200/80" />
                      ) : (
                        avatarLetter
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight truncate">
                      {isBooting ? (
                        <Skeleton className="h-6 w-44 rounded-full bg-slate-200/80" />
                      ) : (
                        signedInLabel
                      )}
                    </h1>
                    <div className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                      Signed in as{" "}
                      <span className="text-slate-900 dark:text-slate-100 font-medium">
                        {isBooting ? (
                          <Skeleton className="inline-block h-4 w-32 rounded-full bg-slate-200/80 align-middle" />
                        ) : (
                          signedInLabel
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-700 px-3 py-1 text-xs font-semibold ring-1 ring-emerald-500/20">
                      <BadgeCheck className="size-4" />
                      Authenticated
                    </div>
                    {role === "ADMIN" && (
                      <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 dark:bg-white/10 text-slate-900 dark:text-slate-100 px-3 py-1 text-xs font-semibold ring-1 ring-slate-900/10 dark:ring-white/10">
                        <Lock className="size-4" />
                        Admin
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-[1.75rem] border border-white/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/60 dark:bg-[rgb(var(--glass)/0.55)] backdrop-blur-2xl px-5 py-4 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.30)] dark:shadow-[0_18px_55px_-40px_rgba(0,0,0,0.55)]">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-rose-500/10 ring-1 ring-indigo-500/15">
                  <Sparkles className="size-5 text-indigo-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Account panel
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-300">
                    Identity, access, and controls
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      if (mustChangePassword && tab.key !== "security") {
                        toast("Password update required");
                        setActiveTab("security");
                        return;
                      }
                      setActiveTab(tab.key);
                    }}
                    className={`
                      group relative w-full flex items-center gap-3 px-4 py-3 rounded-[1.25rem]
                      text-left text-sm font-semibold
                      transition-all duration-200 ease-out
                      ${
                        isActive
                          ? "bg-slate-900 text-white shadow-[0_18px_55px_-35px_rgba(15,23,42,0.45)]"
                          : "text-slate-800 hover:bg-slate-900/5"
                      }
                    `}
                  >
                    <span
                      className={`
                        flex size-10 items-center justify-center rounded-full ring-1 transition-colors
                        ${
                          isActive
                            ? "bg-white/10 ring-white/15"
                            : "bg-white/70 ring-white/60"
                        }
                      `}
                    >
                      <tab.icon
                        className={`
                          size-5 transition-colors
                          ${isActive ? "text-indigo-200" : "text-indigo-600"}
                        `}
                      />
                    </span>
                    <span className="flex-1">{tab.label}</span>
                    <span
                      className={`
                        h-[3px] w-10 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500
                        transition-opacity duration-200
                        ${
                          isActive
                            ? "opacity-80"
                            : "opacity-0 group-hover:opacity-35"
                        }
                      `}
                    />
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="space-y-6" data-profile-animate>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                  {tabTitle}
                </h2>
                <p className="text-sm text-slate-500 mt-2">{tabSubtitle}</p>
              </div>
              <div className="hidden md:flex items-center gap-3 rounded-full bg-slate-900 text-white px-4 py-2 shadow-[0_16px_40px_-20px_rgba(15,23,42,0.45)]">
                <div className="relative size-4">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 flex size-[7px] items-center justify-center rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 shadow-[0_0_0_1px_rgba(255,255,255,0.10)]">
                    <div className="size-[2px] rounded-full bg-white/90" />
                  </div>

                  <div className="absolute left-[6px] top-[4px] h-px w-[7px] origin-left -rotate-[26deg] rounded-full bg-gradient-to-r from-indigo-200/70 via-violet-200/70 to-violet-200/10" />
                  <div className="absolute left-[6px] top-1/2 h-px w-[7px] -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-200/70 via-violet-200/70 to-violet-200/10" />
                  <div className="absolute left-[6px] bottom-[4px] h-px w-[7px] origin-left rotate-[26deg] rounded-full bg-gradient-to-r from-indigo-200/70 via-violet-200/70 to-violet-200/10" />

                  <div className="absolute right-0 top-[1px] size-[4px] rounded-full bg-gradient-to-br from-indigo-200 to-violet-300 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
                  <div className="absolute right-0 top-1/2 size-[4px] -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-200 to-violet-300 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
                  <div className="absolute right-0 bottom-[1px] size-[4px] rounded-full bg-gradient-to-br from-indigo-200 to-violet-300 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
                </div>
                <span className="text-sm font-semibold">CPU Grid</span>
              </div>
            </div>

            <div
              ref={panelRef}
              className="glass card-super-lg shadow-deep p-8 min-h-[640px] relative overflow-hidden"
            >
              {activeTab === "profile" && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-700">
                        First name
                      </Label>
                      {isBooting ? (
                        <Skeleton className="h-12 rounded-xl bg-slate-200/70" />
                      ) : (
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="h-12 rounded-xl bg-white/70 border-white/60"
                          placeholder="First name"
                          autoComplete="given-name"
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-700">
                        Last name
                      </Label>
                      {isBooting ? (
                        <Skeleton className="h-12 rounded-xl bg-slate-200/70" />
                      ) : (
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="h-12 rounded-xl bg-white/70 border-white/60"
                          placeholder="Last name"
                          autoComplete="family-name"
                        />
                      )}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="city" className="text-slate-700">
                        City <span className="text-slate-400">(optional)</span>
                      </Label>
                      {isBooting ? (
                        <Skeleton className="h-12 rounded-xl bg-slate-200/70" />
                      ) : (
                        <Input
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="h-12 rounded-xl bg-white/70 border-white/60"
                          placeholder="City"
                          autoComplete="address-level2"
                        />
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="username"
                        className="text-slate-700 flex items-center gap-2"
                      >
                        Username <Lock className="size-4 text-slate-400" />
                      </Label>
                      <Input
                        id="username"
                        value={isBooting ? "—" : username}
                        readOnly
                        disabled
                        className="h-12 rounded-xl bg-white/50 border-white/60 text-slate-700 dark:bg-white/10 dark:border-white/10 dark:text-slate-200"
                      />
                      <div className="text-xs text-slate-500">Read-only</div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-slate-700 flex items-center gap-2"
                      >
                        Email <Lock className="size-4 text-slate-400" />
                      </Label>
                      <Input
                        id="email"
                        value={isBooting ? "—" : email}
                        readOnly
                        disabled
                        className="h-12 rounded-xl bg-white/50 border-white/60 text-slate-700 dark:bg-white/10 dark:border-white/10 dark:text-slate-200"
                      />
                      <div className="text-xs text-slate-500">Read-only</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                      Changes save to your account.
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveChanges}
                      disabled={
                        isBooting ||
                        isSavingProfile ||
                        !firstName.trim() ||
                        !lastName.trim()
                      }
                      className="
                        group relative overflow-hidden
                        inline-flex items-center justify-center
                        h-11 rounded-xl px-6 text-sm font-semibold
                        bg-slate-900 text-white
                        shadow-[0_16px_44px_-22px_rgba(15,23,42,0.45)]
                        transition-all duration-200 ease-out
                        hover:bg-slate-800 hover:-translate-y-[1px]
                        active:translate-y-0
                        disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60
                      "
                    >
                      <span className="relative z-10">
                        {isSavingProfile ? "Saving…" : "Save changes"}
                      </span>
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-indigo-500/0 via-white/25 to-rose-500/0 bg-[length:300%_100%] animate-[gradient-flow_1.3s_ease_infinite]" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "stats" && (
                <div className="space-y-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div
                      className={`
                        inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1
                        ${
                          isStatsBooting
                            ? "bg-slate-500/10 text-slate-700 ring-slate-500/20"
                            : "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20"
                        }
                      `}
                    >
                      <Gauge className="size-4" />
                      {isStatsBooting ? "Loading" : "Live"}
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => toast("Coming soon")}
                      className="h-11 rounded-xl border border-white/60 bg-white/60 backdrop-blur-2xl text-slate-900 hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15"
                    >
                      View simulations
                    </Button>
                  </div>

                  <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {statCards.map((stat) => (
                      <div
                        key={stat.label}
                        className="
                          rounded-[1.75rem] border border-white/60 bg-white/60 backdrop-blur-2xl
                          p-7 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)]
                          transition-all duration-200 ease-out
                          hover:-translate-y-[2px] hover:shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]
                        "
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex size-10 items-center justify-center rounded-full bg-slate-900">
                            <stat.icon className="size-5 text-indigo-300" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm text-slate-500 truncate">
                              {stat.label}
                            </div>
                            <div className="text-3xl font-bold text-slate-900 tracking-tight">
                              {isStatsBooting ? (
                                <Skeleton className="h-8 w-20 rounded-full bg-slate-200/80" />
                              ) : (
                                stat.value
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`mt-6 h-[3px] rounded-full bg-gradient-to-r ${stat.accent} bg-[length:300%_100%] animate-[gradient-flow_6s_ease_infinite] opacity-40`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[2rem] border border-white/60 bg-white/60 backdrop-blur-2xl p-7 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)]">
                    <div className="flex items-end justify-between gap-6 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                          Recent activity
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          Placeholder run events with live shimmer.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {activity.map((item, i) => {
                        const pill =
                          item.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20"
                            : item.status === "Failed"
                            ? "bg-rose-500/10 text-rose-700 ring-rose-500/20"
                            : "bg-slate-500/10 text-slate-700 ring-slate-500/20";

                        return (
                          <div
                            key={`${item.title}-${i}`}
                            className="
                              rounded-[1.75rem] border border-white/60 bg-white/60 backdrop-blur-2xl
                              px-5 py-4
                              transition-all duration-200 ease-out
                              hover:-translate-y-[1px] hover:shadow-[0_18px_50px_-35px_rgba(15,23,42,0.35)]
                            "
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4 min-w-0">
                                <div className="relative flex size-10 items-center justify-center rounded-full bg-slate-900">
                                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/15 via-violet-500/15 to-rose-500/15 opacity-60" />
                                  <Cpu className="relative size-5 text-indigo-300" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-slate-900 truncate">
                                    {isStatsBooting ? (
                                      <Skeleton className="h-5 w-52 rounded-full bg-slate-200/80" />
                                    ) : (
                                      item.title
                                    )}
                                  </div>
                                  <div className="mt-2 h-2 w-[240px] max-w-full rounded-full bg-gradient-to-r from-slate-200/70 via-white/90 to-slate-200/70 bg-[length:300%_100%] animate-[gradient-flow_4.5s_ease_infinite]" />
                                </div>
                              </div>

                              <div
                                className={`shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${pill}`}
                              >
                                {isStatsBooting ? (
                                  <Skeleton className="h-4 w-20 rounded-full bg-slate-200/80" />
                                ) : (
                                  item.status
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-8">
                  <div className="rounded-[2rem] border border-white/60 bg-white/60 backdrop-blur-2xl p-7 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)]">
                    {mustChangePassword && (
                      <div className="mb-6 rounded-[1.5rem] border border-amber-500/20 bg-amber-500/10 px-5 py-4">
                        <div className="text-sm font-semibold text-slate-900">
                          Please change your temporary password
                        </div>
                        <div className="mt-1 text-sm text-slate-600">
                          Other tabs are disabled until you update it.
                        </div>
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                          Change password
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          Use a strong password (8+ chars, lowercase + digit).
                        </p>
                      </div>
                      <div className="flex size-11 items-center justify-center rounded-full bg-slate-900">
                        <KeyRound className="size-5 text-indigo-200" />
                      </div>
                    </div>

                    <form
                      className="mt-6 space-y-5"
                      onSubmit={(e) => {
                        e.preventDefault();
                        void handleChangePassword();
                      }}
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="currentPassword"
                          className="text-slate-700"
                        >
                          Current password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="h-12 rounded-xl bg-white/70 border-white/60"
                          autoComplete="current-password"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="newPassword"
                            className="text-slate-700"
                          >
                            New password
                          </Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="h-12 rounded-xl bg-white/70 border-white/60"
                            autoComplete="new-password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="confirmNewPassword"
                            className="text-slate-700"
                          >
                            Confirm new password
                          </Label>
                          <Input
                            id="confirmNewPassword"
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) =>
                              setConfirmNewPassword(e.target.value)
                            }
                            className="h-12 rounded-xl bg-white/70 border-white/60"
                            autoComplete="new-password"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="text-xs text-slate-500">
                          Changes apply immediately.
                        </div>
                        <Button
                          disabled={isChangingPassword}
                          className="h-11 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
                        >
                          {isChangingPassword ? "Submitting…" : "Submit"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === "data" && (
                <div className="space-y-8">
                  <div className="rounded-[2rem] border border-white/60 bg-white/60 backdrop-blur-2xl p-7 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)]">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                          Delete simulation history
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          This will become destructive once synced storage is
                          enabled.
                        </p>
                      </div>
                      <div className="flex size-11 items-center justify-center rounded-full bg-rose-500/10 ring-1 ring-rose-500/20">
                        <Trash2 className="size-5 text-rose-700" />
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                      <div className="rounded-[1.5rem] border border-rose-500/20 bg-rose-500/5 px-5 py-4">
                        <div className="text-sm font-semibold text-slate-900">
                          Dangerous action
                        </div>
                        <div className="mt-1 text-sm text-slate-600">
                          Deletes your stored run history when the backend is
                          wired.
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setDeleteConfirmed(false);
                          setIsDeleteOpen(true);
                        }}
                        className="
                          inline-flex items-center justify-center gap-2
                          h-11 rounded-xl px-5 text-sm font-semibold
                          bg-rose-600 text-white
                          transition-all duration-200 ease-out
                          hover:bg-rose-700 hover:-translate-y-[1px]
                          active:translate-y-0
                          disabled:opacity-60 disabled:cursor-not-allowed
                        "
                      >
                        <Trash2 className="size-4" />
                        Delete history
                      </button>
                    </div>
                  </div>

                  {isDeleteOpen && (
                    <div className="fixed inset-0 z-50">
                      <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-md"
                        onClick={() => setIsDeleteOpen(false)}
                      />
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="w-full max-w-lg rounded-[1.75rem] border border-white/40 bg-white/85 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]">
                          <div className="p-6 sm:p-7">
                            <div className="text-lg font-semibold text-slate-900">
                              Delete simulation history?
                            </div>
                            <div className="mt-2 text-sm text-slate-600">
                              This action will be destructive once connected to
                              the backend.
                            </div>

                            <div className="mt-5 flex items-start gap-3 rounded-[1.25rem] border border-white/50 bg-white/60 backdrop-blur-2xl px-4 py-4">
                              <Checkbox
                                checked={deleteConfirmed}
                                onCheckedChange={(v) =>
                                  setDeleteConfirmed(v === true)
                                }
                                className="mt-0.5"
                              />
                              <div className="flex flex-col">
                                <div className="text-sm font-semibold text-slate-900">
                                  I understand this can’t be undone
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                  Required to enable confirmation.
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                              <Button
                                variant="outline"
                                onClick={() => setIsDeleteOpen(false)}
                                className="rounded-xl bg-white/70 border-white/50 hover:bg-white/80 dark:bg-white/10 dark:border-white/10 dark:hover:bg-white/15 dark:text-slate-100"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => void handleDeleteHistory()}
                                disabled={!deleteConfirmed || isDeletingHistory}
                                className="rounded-xl bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-60"
                              >
                                {isDeletingHistory
                                  ? "Deleting…"
                                  : "Confirm delete"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {role !== "ADMIN" && (
                    <div className="rounded-[3rem] border border-rose-500/20 bg-white/60 backdrop-blur-2xl p-8 shadow-[0_28px_80px_-55px_rgba(244,63,94,0.22)]">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                            Danger Zone
                          </h3>
                          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                            Deleting your account permanently removes your
                            profile and simulation history.
                          </p>
                        </div>
                        <div className="flex size-12 items-center justify-center rounded-full bg-rose-500/10 ring-1 ring-rose-500/20 shadow-[0_18px_40px_-28px_rgba(244,63,94,0.35)]">
                          <Trash2 className="size-5 text-rose-700" />
                        </div>
                      </div>

                      <div className="mt-7 rounded-[2rem] border border-rose-500/20 bg-rose-500/5 px-6 py-5">
                        <div className="text-sm font-semibold text-slate-900">
                          This action cannot be undone
                        </div>
                        <div className="mt-1 text-sm text-slate-600">
                          You’ll be signed out after confirmation.
                        </div>
                      </div>

                      <div className="mt-7">
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteAccountPhrase("");
                            setDeleteAccountConfirmed(false);
                            setIsDeleteAccountOpen(true);
                          }}
                          className="
                            inline-flex items-center justify-center gap-2
                            h-12 rounded-full px-7 text-sm font-semibold
                            bg-rose-600 text-white
                            shadow-[0_20px_55px_-30px_rgba(244,63,94,0.55)]
                            transition-all duration-200 ease-out
                            hover:bg-rose-700 hover:-translate-y-[1px]
                            hover:shadow-[0_26px_70px_-34px_rgba(244,63,94,0.62)]
                            active:translate-y-0
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/60
                          "
                        >
                          <Trash2 className="size-4" />
                          Delete account
                        </button>
                      </div>
                    </div>
                  )}

                  {isDeleteAccountOpen && role !== "ADMIN" && (
                    <div className="fixed inset-0 z-50">
                      <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-md"
                        onClick={() => setIsDeleteAccountOpen(false)}
                      />
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="w-full max-w-lg rounded-[1.75rem] border border-white/40 bg-white/85 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]">
                          <div className="p-6 sm:p-7">
                            <div className="text-lg font-semibold text-slate-900">
                              Delete account
                            </div>
                            <div className="mt-2 text-sm text-slate-600">
                              This action cannot be undone.
                            </div>

                            <div className="mt-6 space-y-2">
                              <Label
                                htmlFor="deleteAccountPassword"
                                className="text-slate-700"
                              >
                                Password
                              </Label>
                              <Input
                                id="deleteAccountPassword"
                                value={deleteAccountPassword}
                                onChange={(e) =>
                                  setDeleteAccountPassword(e.target.value)
                                }
                                className="h-12 rounded-xl bg-white/70 border-white/60"
                                placeholder="Your password"
                                autoComplete="current-password"
                                type="password"
                              />
                            </div>

                            <div className="mt-6 space-y-2">
                              <Label
                                htmlFor="deleteAccountPhrase"
                                className="text-slate-700"
                              >
                                Type DELETE to confirm
                              </Label>
                              <Input
                                id="deleteAccountPhrase"
                                value={deleteAccountPhrase}
                                onChange={(e) =>
                                  setDeleteAccountPhrase(e.target.value)
                                }
                                className="h-12 rounded-xl bg-white/70 border-white/60"
                                placeholder="DELETE"
                                autoComplete="off"
                                inputMode="text"
                              />
                            </div>

                            <div className="mt-5 flex items-start gap-3 rounded-[1.25rem] border border-white/50 bg-white/60 backdrop-blur-2xl px-4 py-4">
                              <Checkbox
                                checked={deleteAccountConfirmed}
                                onCheckedChange={(v) =>
                                  setDeleteAccountConfirmed(v === true)
                                }
                                className="mt-0.5"
                              />
                              <div className="flex flex-col">
                                <div className="text-sm font-semibold text-slate-900">
                                  I understand this is permanent
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                  Required to enable confirmation.
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                              <Button
                                variant="outline"
                                onClick={() => setIsDeleteAccountOpen(false)}
                                className="rounded-xl bg-white/70 border-white/50 hover:bg-white/80 dark:bg-white/10 dark:border-white/10 dark:hover:bg-white/15 dark:text-slate-100"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleDeleteAccount}
                                disabled={
                                  !deleteAccountConfirmed ||
                                  !deleteAccountPassword.trim() ||
                                  deleteAccountPhrase.trim().toUpperCase() !==
                                    "DELETE"
                                }
                                className="rounded-xl bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-60"
                              >
                                Confirm delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
