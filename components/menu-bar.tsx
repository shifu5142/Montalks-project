"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";

export function MenuBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isHome
          ? "bg-transparent text-primary-foreground"
          : "bg-card text-card-foreground shadow-md border-b border-border"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 text-2xl font-bold transition-colors duration-200",
            isHome
              ? "text-primary-foreground hover:text-primary-foreground/80"
              : "text-primary hover:text-primary/80"
          )}
        >
          <User className="h-7 w-7" />
          MonTalks
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant={isHome ? "ghost" : "outline"}
            asChild
            className={cn(
              isHome
                ? "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground border-primary-foreground/30"
                : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            )}
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className={cn(
            "md:hidden",
            isHome ? "text-primary-foreground" : "text-primary"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-3 shadow-lg">
          <Button variant="outline" asChild className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent" onClick={() => setMobileOpen(false)}>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setMobileOpen(false)}>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
