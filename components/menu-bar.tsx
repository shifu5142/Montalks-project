"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Menu, X } from "lucide-react";
import { useAppContext } from "@/app/context/AppContext";

export function MenuBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAppContext();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-orange-400 text-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-white"
        >
          <User className="h-7 w-7" />
          MonTalks
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            // ✅ Logged in
            <span className="font-medium text-white">
              Hello, {user.fullName}
            </span>
          ) : (
            // ❌ Guest
            <>
              <Button
                variant="ghost"
                asChild
                className="text-white hover:bg-white/10 hover:text-white border-white/30"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-white text-orange-600 hover:bg-white/90"
              >
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-orange-400 px-6 py-4 flex flex-col gap-3 shadow-lg">
          {user ? (
            <div className="text-white font-medium text-center py-2">
              Hello, {user.fullName}
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                asChild
                className="w-full border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
                onClick={() => setMobileOpen(false)}
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="w-full bg-white text-orange-400 hover:bg-white/90"
                onClick={() => setMobileOpen(false)}
              >
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
