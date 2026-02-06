import Link from "next/link";
import { User } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-foreground text-background py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-background hover:text-primary transition-colors"
        >
          <User className="h-6 w-6" />
          MonTalks
        </Link>

        <div className="flex items-center gap-6 text-sm text-background/60">
          <Link
            href="/login"
            className="hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="hover:text-primary transition-colors"
          >
            Register
          </Link>
        </div>

        <p className="text-sm text-background/40">
          {"MonTalks. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
