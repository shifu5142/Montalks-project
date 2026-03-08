"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Home, PieChart, Settings, LogOut, Users, Trash2, Sparkles } from "lucide-react";
import { useAppContext } from "@/app/context/AppContext";

type AuthSidebarProps = {
  onGoToSummary: () => void;
};

function AuthSidebar({ onGoToSummary }: AuthSidebarProps) {
  const { logout } = useAppContext();
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
    logout();
  };

  const handleSwitchUser = () => {
    setSettingsOpen(false);
    logout();
  };

  return (
    <aside className="hidden md:flex fixed top-16 left-0 h-[calc(100vh-4rem)] w-56 flex-col border-r bg-white/95 backdrop-blur-sm z-40">
      <div className="px-5 pt-24 pb-4 border-b">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 hover:text-orange-700 cursor-pointer">
          MonTalks
        </p>
        <h2 className="mt-1 text-lg font-bold text-gray-900 hover:text-orange-700 hover:cursor-pointer" >Money Hub</h2>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <Link
          href="/"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/account-summary"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
          onClick={onGoToSummary}
        >
          <PieChart className="h-4 w-4" />
          <span>Account summary</span>
        </Link>

        <Link
          href="/plan-Ai"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          <span>Plan with AI</span>
        </Link>
      </nav>

      {/* Settings at bottom – click opens popup */}
      <div ref={settingsRef} className="relative shrink-0 px-3 py-4 border-t pt-2">
        <button
          type="button"
          onClick={() => setSettingsOpen((prev) => !prev)}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>

        {settingsOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-1 py-1 rounded-lg bg-white border border-gray-200 shadow-lg z-50">
            <button
              type="button"
              onClick={handleSwitchUser}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Switch user</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
            <Link
              href="/deleteUser"
              onClick={() => setSettingsOpen(false)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
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
