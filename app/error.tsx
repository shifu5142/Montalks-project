"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center bg-orange-50 px-6 py-20 text-foreground">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-orange-200 bg-white shadow-sm">
          <AlertCircle className="h-8 w-8 text-orange-600" />
        </div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
          Something went wrong
        </p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          An error occurred
        </h1>
        <p className="mb-8 text-muted-foreground">
          We couldn’t complete your request. Please try again or return to the
          main page.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            onClick={reset}
            variant="outline"
            className="h-12 rounded-lg border-border px-8 text-sm font-semibold hover:bg-white/70"
          >
            Try again
          </Button>
          <Button
            size="lg"
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-lg px-8 text-sm font-semibold"
          >
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return to main page
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
