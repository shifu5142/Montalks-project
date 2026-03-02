"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, PieChart, Settings, LogOut, Users, Trash2, Sparkles, ChevronUp } from "lucide-react";
import { useAppContext } from "@/app/context/AppContext";

const TOKEN_KEY = "montalks_token";
const USER_KEY = "montalks_user";

type AuthSidebarProps = {
  onGoToSummary: () => void;
};

function AuthSidebar({ onGoToSummary }: AuthSidebarProps) {
  const { setUser } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!settingsOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [settingsOpen]);

  const handleLogout = () => {
    setSettingsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    setUser(null);
    router.push("/login");
  };

  const handleSwitchUser = () => {
    setSettingsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    setUser(null);
    router.push("/login");
  };

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/account-summary", label: "Account Summary", icon: PieChart, onClick: onGoToSummary },
    { href: "/plan-Ai", label: "Plan with AI", icon: Sparkles },
  ];

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-56 flex-col border-r border-border bg-card z-40">
      <div className="px-5 pt-6 pb-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          MonTalks
        </p>
        <h2 className="mt-1 text-base font-bold text-foreground tracking-tight">Money Hub</h2>
      </div>

      <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={item.onClick}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div ref={settingsRef} className="relative shrink-0 px-3 py-3 border-t border-border">
        <button
          type="button"
          onClick={() => setSettingsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <span className="flex items-center gap-2.5">
            <Settings className="h-4 w-4" />
            Settings
          </span>
          <ChevronUp className={`h-3.5 w-3.5 transition-transform ${settingsOpen ? "" : "rotate-180"}`} />
        </button>

        {settingsOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-1 py-1 rounded-lg bg-card border border-border shadow-lg z-50">
            <button
              type="button"
              onClick={handleSwitchUser}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Switch user</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
            <Link
              href="/deleteUser"
              onClick={() => setSettingsOpen(false)}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete account</span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}

export default AuthSidebar;
