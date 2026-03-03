import Link from "next/link";
import { Wallet } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-orange-50 text-foreground py-12 px-6 border-t border-orange-100">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-bold text-foreground tracking-tight"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white shadow-sm">
              <Wallet className="h-3.5 w-3.5 text-orange-500" />
            </div>
            MonTalks
          </Link>

          <div className="flex items-center gap-6 text-sm text-foreground/60">
            <Link
              href="/login"
              className="hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="hover:text-foreground transition-colors"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-orange-100">
          <p className="text-xs text-foreground/50 text-center">
            {"MonTalks. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
