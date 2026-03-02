"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet } from "lucide-react";
import { useAppContext } from "@/app/context/AppContext";

export function MenuBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAppContext();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-card/80 backdrop-blur-xl border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold text-foreground tracking-tight"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Wallet className="h-4 w-4 text-primary-foreground" />
          </div>
          MonTalks
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <span className="text-sm font-medium text-muted-foreground">
              Hello, <span className="text-foreground">{user.fullName}</span>
            </span>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-muted-foreground hover:text-foreground"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5"
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-3">
          {user ? (
            <div className="text-sm font-medium text-muted-foreground text-center py-2">
              Hello, <span className="text-foreground">{user.fullName}</span>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                asChild
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setMobileOpen(false)}
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
