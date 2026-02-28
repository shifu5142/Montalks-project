"use client";

import React from "react";
import Link from "next/link";
import { Home, PieChart } from "lucide-react";

type AuthSidebarProps = {
  onGoToDashboard: () => void;
  onGoToSummary: () => void;
};

function AuthSidebar({ onGoToDashboard, onGoToSummary }: AuthSidebarProps) {
  return (
    <aside className="hidden md:flex fixed top-16 left-0 h-[calc(100vh-4rem)] w-56 flex-col border-r bg-white/95 backdrop-blur-sm z-40">
      <div className="px-5 pt-24 pb-4 border-b">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
          MonTalks
        </p>
        <h2 className="mt-1 text-lg font-bold text-gray-900">Money Hub</h2>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <button
          type="button"
          onClick={onGoToDashboard}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Dashboard</span>
        </button>

        <Link
          href="/account-summary"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
          onClick={onGoToSummary}
        >
          <PieChart className="h-4 w-4" />
          <span>Account summary</span>
        </Link>
      </nav>
    </aside>
  );
}

export default AuthSidebar;