"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  KeyRound,
  ShieldCheck,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

import type { ViewType } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getDisplayNameFromToken,
  getRoleFromToken,
  getToken,
} from "@/lib/authApi";

type AdminProfilePageProps = {
  setCurrentView: (view: ViewType) => void;
};

type AdminTabKey = "info" | "security" | "admins" | "danger";

type AdminRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: "ADMIN";
  lastSeenAt: Date;
  status: "Online" | "Offline";
};

function splitName(fullName: string) {
  const cleaned = fullName.trim();
  if (!cleaned || cleaned === "—") return { firstName: "", lastName: "" };
  const parts = cleaned.split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] ?? "",
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
}

function initialsFromName(firstName: string, lastName: string) {
  const a = (firstName.trim()[0] ?? "").toUpperCase();
  const b = (lastName.trim()[0] ?? "").toUpperCase();
  const combined = `${a}${b}`.trim();
  return combined || "A";
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function AdminProfilePage({ setCurrentView }: AdminProfilePageProps) {
  const [isAllowed, setIsAllowed] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTabKey>("info");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [lockedUsername, setLockedUsername] = useState("—");
  const [lockedEmail, setLockedEmail] = useState("—");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [admins, setAdmins] = useState<AdminRow[]>(() => {
    const now = Date.now();
    return [
      {
        id: createId(),
        firstName: "Alex",
        lastName: "Thompson",
        email: "alex.thompson@cpugrid.dev",
        username: "athompson",
        role: "ADMIN",
        lastSeenAt: new Date(now - 1000 * 18),
        status: "Online",
      },
      {
        id: createId(),
        firstName: "Sarah",
        lastName: "Kim",
        email: "sarah.kim@cpugrid.dev",
        username: "skim",
        role: "ADMIN",
        lastSeenAt: new Date(now - 1000 * 60 * 42),
        status: "Offline",
      },
      {
        id: createId(),
        firstName: "Marcus",
        lastName: "Chen",
        email: "marcus.chen@cpugrid.dev",
        username: "mchen",
        role: "ADMIN",
        lastSeenAt: new Date(now - 1000 * 60 * 6),
        status: "Online",
      },
    ];
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editMode, setEditMode] = useState<"add" | "edit">("add");
  const [editId, setEditId] = useState<string | null>(null);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editTempPassword, setEditTempPassword] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [isDangerOpen, setIsDangerOpen] = useState(false);
  const [dangerPhrase, setDangerPhrase] = useState("");

  useEffect(() => {
    const token = getToken();
    const tokenRole = token ? getRoleFromToken(token) : null;
    if (!token || tokenRole !== "ADMIN") {
      toast("Admin access required");
      setCurrentView("home");
      return;
    }

    const name = getDisplayNameFromToken(token) ?? "—";
    const { firstName, lastName } = splitName(name);
    setFirstName(firstName);
    setLastName(lastName);
    setLockedUsername("admin");
    setLockedEmail("admin@cpugrid.dev");
    setIsAllowed(true);
  }, [setCurrentView]);

  const tabMeta = useMemo(() => {
    const title =
      activeTab === "info"
        ? "Admin info"
        : activeTab === "security"
        ? "Security"
        : activeTab === "admins"
        ? "Manage admins"
        : "Danger zone";

    const subtitle =
      activeTab === "info"
        ? "Update admin identity details (UI-only for now)."
        : activeTab === "security"
        ? "Rotate credentials and validate access controls."
        : activeTab === "admins"
        ? "Maintain the admin roster for the control center."
        : "High-impact actions. Proceed carefully.";

    return { title, subtitle };
  }, [activeTab]);

  const identity = useMemo(() => {
    const full = `${firstName} ${lastName}`.trim();
    return {
      fullName: full || "—",
      initials: initialsFromName(firstName, lastName),
    };
  }, [firstName, lastName]);

  const handleSaveInfo = () => {
    toast("Saved locally (backend coming soon)");
  };

  const handleSecurityUpdate = () => {
    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !confirmNewPassword.trim()
    ) {
      toast("Please complete all fields");
      return;
    }
    if (newPassword.length < 8) {
      toast("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast("Passwords do not match");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    toast("Password update placeholder");
  };

  const openAddAdmin = () => {
    setEditMode("add");
    setEditId(null);
    setEditFirstName("");
    setEditLastName("");
    setEditEmail("");
    setEditUsername("");
    setEditTempPassword("");
    setIsEditOpen(true);
  };

  const openEditAdmin = (row: AdminRow) => {
    setEditMode("edit");
    setEditId(row.id);
    setEditFirstName(row.firstName);
    setEditLastName(row.lastName);
    setEditEmail(row.email);
    setEditUsername(row.username);
    setEditTempPassword("");
    setIsEditOpen(true);
  };

  const saveAdmin = () => {
    const cleanedFirst = editFirstName.trim();
    const cleanedLast = editLastName.trim();
    const cleanedEmail = editEmail.trim();
    const cleanedUsername = editUsername.trim();

    if (!cleanedFirst || !cleanedLast || !cleanedEmail || !cleanedUsername) {
      toast("Please fill in all fields");
      return;
    }

    if (editMode === "add" && !editTempPassword.trim()) {
      toast("Temporary password is required");
      return;
    }

    setAdmins((prev) => {
      const now = new Date();
      if (editMode === "add") {
        const next: AdminRow = {
          id: createId(),
          firstName: cleanedFirst,
          lastName: cleanedLast,
          email: cleanedEmail,
          username: cleanedUsername,
          role: "ADMIN",
          lastSeenAt: now,
          status: "Offline",
        };
        return [next, ...prev];
      }
      if (!editId) return prev;
      return prev.map((row) =>
        row.id === editId
          ? {
              ...row,
              firstName: cleanedFirst,
              lastName: cleanedLast,
              email: cleanedEmail,
              username: cleanedUsername,
              lastSeenAt: now,
            }
          : row
      );
    });

    setIsEditOpen(false);
    toast(editMode === "add" ? "Admin added (local)" : "Admin updated (local)");
  };

  const requestDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    setAdmins((prev) => prev.filter((row) => row.id !== deleteId));
    setIsDeleteOpen(false);
    setDeleteId(null);
    toast("Admin removed (local)");
  };

  const confirmDanger = () => {
    setDangerPhrase("");
    setIsDangerOpen(false);
    toast("Account deletion placeholder");
  };

  if (!isAllowed) return null;

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <button
          onClick={() => setCurrentView("home")}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start">
          <aside className="rounded-[3rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_24px_70px_-40px_rgba(15,23,42,0.35)] overflow-hidden">
            <div className="p-8">
              <div className="relative rounded-[2.25rem] border border-white/50 bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-900 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.65)] p-6">
                <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.45),transparent_55%),radial-gradient(circle_at_bottom,rgba(244,63,94,0.35),transparent_60%)]" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 via-violet-400 to-rose-400 blur-[10px] opacity-70" />
                      <div className="relative size-14 rounded-full bg-slate-950 ring-2 ring-white/40 flex items-center justify-center">
                        <span className="text-slate-100 font-semibold tracking-tight">
                          {identity.initials}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="inline-flex items-center gap-2">
                        <span className="text-slate-100 font-semibold tracking-tight">
                          {identity.fullName}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-slate-100 ring-1 ring-white/15">
                          <BadgeCheck className="size-3.5 text-indigo-200" />
                          Admin
                        </span>
                      </div>
                      <span className="text-xs text-slate-300 mt-1">
                        Signed in as {identity.fullName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("info")}
                  className={`group flex items-center gap-3 rounded-[1.6rem] px-5 py-4 text-left transition-all duration-200 ${
                    activeTab === "info"
                      ? "bg-slate-900 text-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.6)]"
                      : "bg-slate-900/5 text-slate-700 hover:bg-slate-900/10"
                  }`}
                >
                  <span
                    className={`flex size-10 items-center justify-center rounded-full transition-colors ${
                      activeTab === "info"
                        ? "bg-white/10 text-white"
                        : "bg-indigo-500/10 text-indigo-700"
                    }`}
                  >
                    <User className="size-4" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">Admin info</span>
                    <span
                      className={`text-xs ${
                        activeTab === "info"
                          ? "text-slate-200"
                          : "text-slate-500"
                      }`}
                    >
                      Identity and contact
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("security")}
                  className={`group flex items-center gap-3 rounded-[1.6rem] px-5 py-4 text-left transition-all duration-200 ${
                    activeTab === "security"
                      ? "bg-slate-900 text-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.6)]"
                      : "bg-slate-900/5 text-slate-700 hover:bg-slate-900/10"
                  }`}
                >
                  <span
                    className={`flex size-10 items-center justify-center rounded-full transition-colors ${
                      activeTab === "security"
                        ? "bg-white/10 text-white"
                        : "bg-violet-500/10 text-violet-700"
                    }`}
                  >
                    <ShieldCheck className="size-4" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">Security</span>
                    <span
                      className={`text-xs ${
                        activeTab === "security"
                          ? "text-slate-200"
                          : "text-slate-500"
                      }`}
                    >
                      Password rotation
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("admins")}
                  className={`group flex items-center gap-3 rounded-[1.6rem] px-5 py-4 text-left transition-all duration-200 ${
                    activeTab === "admins"
                      ? "bg-slate-900 text-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.6)]"
                      : "bg-slate-900/5 text-slate-700 hover:bg-slate-900/10"
                  }`}
                >
                  <span
                    className={`flex size-10 items-center justify-center rounded-full transition-colors ${
                      activeTab === "admins"
                        ? "bg-white/10 text-white"
                        : "bg-rose-500/10 text-rose-700"
                    }`}
                  >
                    <Users className="size-4" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">Manage admins</span>
                    <span
                      className={`text-xs ${
                        activeTab === "admins"
                          ? "text-slate-200"
                          : "text-slate-500"
                      }`}
                    >
                      Roles and access
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("danger")}
                  className={`group flex items-center gap-3 rounded-[1.6rem] px-5 py-4 text-left transition-all duration-200 ${
                    activeTab === "danger"
                      ? "bg-rose-600 text-white shadow-[0_18px_44px_-28px_rgba(244,63,94,0.55)]"
                      : "bg-rose-500/10 text-rose-700 hover:bg-rose-500/15"
                  }`}
                >
                  <span
                    className={`flex size-10 items-center justify-center rounded-full transition-colors ${
                      activeTab === "danger"
                        ? "bg-white/10 text-white"
                        : "bg-rose-500/15 text-rose-700"
                    }`}
                  >
                    <Trash2 className="size-4" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">Danger zone</span>
                    <span
                      className={`text-xs ${
                        activeTab === "danger"
                          ? "text-rose-100"
                          : "text-rose-600/80"
                      }`}
                    >
                      Destructive actions
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </aside>

          <section className="rounded-[2.5rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_24px_70px_-40px_rgba(15,23,42,0.35)] overflow-hidden">
            <div className="px-8 py-7 border-b border-white/60 bg-gradient-to-br from-white/80 via-white/60 to-white/70">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {tabMeta.title}
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    {tabMeta.subtitle}
                  </p>
                </div>
                {activeTab === "admins" && (
                  <Button
                    type="button"
                    onClick={openAddAdmin}
                    className="h-11 rounded-full px-5"
                  >
                    Add admin
                  </Button>
                )}
              </div>
            </div>

            <div className="p-8">
              {activeTab === "info" && (
                <div className="grid gap-7">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="adminFirstName">First name</Label>
                      <Input
                        id="adminFirstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="h-12 rounded-2xl bg-white/80 border-white/60"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="adminLastName">Last name</Label>
                      <Input
                        id="adminLastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="h-12 rounded-2xl bg-white/80 border-white/60"
                      />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                      <Label htmlFor="adminCity">City</Label>
                      <Input
                        id="adminCity"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="h-12 rounded-2xl bg-white/80 border-white/60"
                        placeholder="e.g. Paris"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="adminUsername">Username</Label>
                      <Input
                        id="adminUsername"
                        value={lockedUsername}
                        disabled
                        className="h-12 rounded-2xl bg-slate-100/60 border-white/60"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="adminEmail">Email</Label>
                      <Input
                        id="adminEmail"
                        value={lockedEmail}
                        disabled
                        className="h-12 rounded-2xl bg-slate-100/60 border-white/60"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <Button
                      type="button"
                      onClick={handleSaveInfo}
                      className="h-12 rounded-full px-7"
                    >
                      Save changes
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="max-w-xl grid gap-6">
                  <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.3)]">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-700">
                        <KeyRound className="size-4" />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">
                          Change password
                        </span>
                        <span className="text-xs text-slate-500">
                          UI-only validation for now.
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="adminCurrentPassword">
                          Current password
                        </Label>
                        <Input
                          id="adminCurrentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="h-12 rounded-2xl bg-white/80 border-white/60"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="adminNewPassword">New password</Label>
                        <Input
                          id="adminNewPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="h-12 rounded-2xl bg-white/80 border-white/60"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="adminConfirmNewPassword">
                          Confirm new password
                        </Label>
                        <Input
                          id="adminConfirmNewPassword"
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          className="h-12 rounded-2xl bg-white/80 border-white/60"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={handleSecurityUpdate}
                          className="h-11 rounded-full px-6"
                        >
                          Update password
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "admins" && (
                <div className="grid gap-5">
                  <div className="rounded-[2.25rem] border border-white/60 bg-white/80 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.3)] overflow-hidden">
                    <Table className="w-full">
                      <TableHeader className="bg-white/70">
                        <TableRow>
                          <TableHead className="px-6">Admin</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Username</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Last seen</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right pr-6">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {admins.map((row) => {
                          const initials = initialsFromName(
                            row.firstName,
                            row.lastName
                          );
                          const statusTone =
                            row.status === "Online"
                              ? "bg-emerald-500/15 text-emerald-700 ring-emerald-500/20"
                              : "bg-slate-500/10 text-slate-600 ring-slate-500/15";
                          return (
                            <TableRow
                              key={row.id}
                              className="hover:bg-slate-900/[0.03]"
                            >
                              <TableCell className="px-6">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/40 via-violet-500/35 to-rose-500/35 blur-[10px] opacity-60" />
                                    <div className="relative size-10 rounded-full bg-slate-950 text-slate-100 flex items-center justify-center text-xs font-semibold ring-1 ring-white/20">
                                      {initials}
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-slate-900">
                                      {row.firstName} {row.lastName}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                      Admin operator
                                    </span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-slate-700">
                                {row.email}
                              </TableCell>
                              <TableCell className="text-slate-700">
                                {row.username}
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-700 ring-1 ring-indigo-500/15">
                                  ADMIN
                                </span>
                              </TableCell>
                              <TableCell className="text-slate-600">
                                {format(row.lastSeenAt, "PPpp")}
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${statusTone}`}
                                >
                                  {row.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right pr-6">
                                <div className="inline-flex items-center gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => openEditAdmin(row)}
                                    className="h-9 rounded-full px-4 bg-white/70"
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => requestDelete(row.id)}
                                    className="h-9 rounded-full px-4 bg-white/70 text-rose-700 hover:text-rose-800"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {activeTab === "danger" && (
                <div className="max-w-xl">
                  <div className="rounded-[2.25rem] border border-rose-500/20 bg-rose-500/5 p-6 shadow-[0_22px_60px_-44px_rgba(244,63,94,0.25)]">
                    <div className="flex items-start gap-4">
                      <span className="flex size-11 items-center justify-center rounded-full bg-rose-500/15 text-rose-700">
                        <Trash2 className="size-5" />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">
                          Delete my admin account
                        </span>
                        <span className="text-sm text-slate-600 mt-1">
                          This is a UI-only placeholder. Type DELETE to enable
                          confirm.
                        </span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setDangerPhrase("");
                          setIsDangerOpen(true);
                        }}
                        className="h-11 rounded-full px-6 bg-white/70 border-rose-500/30 text-rose-700 hover:text-rose-800"
                      >
                        Delete my admin account
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-xl rounded-[1.75rem]">
          <DialogHeader>
            <DialogTitle>
              {editMode === "add" ? "Add admin" : "Edit admin"}
            </DialogTitle>
            <DialogDescription>
              {editMode === "add"
                ? "Create a new admin account (UI-only)."
                : "Update admin details (UI-only)."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="editAdminFirst">First name</Label>
                <Input
                  id="editAdminFirst"
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                  className="h-11 rounded-2xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editAdminLast">Last name</Label>
                <Input
                  id="editAdminLast"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                  className="h-11 rounded-2xl"
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="editAdminEmail">Email</Label>
                <Input
                  id="editAdminEmail"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="h-11 rounded-2xl"
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="editAdminUsername">Username</Label>
                <Input
                  id="editAdminUsername"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="h-11 rounded-2xl"
                />
              </div>
              {editMode === "add" && (
                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor="editAdminTempPassword">
                    Temporary password
                  </Label>
                  <Input
                    id="editAdminTempPassword"
                    type="password"
                    value={editTempPassword}
                    onChange={(e) => setEditTempPassword(e.target.value)}
                    className="h-11 rounded-2xl"
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={saveAdmin}>
              {editMode === "add" ? "Add admin" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="rounded-[1.75rem]">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove admin?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the admin from the roster in the UI only.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-rose-600 hover:bg-rose-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isDangerOpen} onOpenChange={setIsDangerOpen}>
        <DialogContent className="sm:max-w-lg rounded-[1.75rem]">
          <DialogHeader>
            <DialogTitle>Confirm account deletion</DialogTitle>
            <DialogDescription>
              Type DELETE to enable the confirm button.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="dangerPhrase">Confirmation</Label>
            <Input
              id="dangerPhrase"
              value={dangerPhrase}
              onChange={(e) => setDangerPhrase(e.target.value)}
              placeholder="DELETE"
              className="h-11 rounded-2xl"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDangerOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={confirmDanger}
              disabled={dangerPhrase.trim() !== "DELETE"}
              className="bg-rose-600 hover:bg-rose-700"
            >
              Confirm delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
