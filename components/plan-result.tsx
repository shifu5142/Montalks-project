"use client";

import React from "react";
import { Bot, Sparkles, Loader2 } from "lucide-react";

interface PlanResultProps {
  plan: string | null;
  loading: boolean;
}

export function PlanResult({ plan, loading }: PlanResultProps) {
  if (loading) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Generating your plan...
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Our AI is crafting your personalized strategy.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (plan) {
    return (
      <div className="flex h-full min-h-[400px] max-h-[70vh] flex-col rounded-2xl border border-border bg-card shadow-sm">
        {/* Header bar */}
        <div className="flex shrink-0 items-center gap-3 border-b border-border px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              AI Assistant
            </p>
            <p className="text-xs text-muted-foreground">
              Your personalized plan
            </p>
          </div>
        </div>

        {/* Plan body — scrolls when content is taller than the div */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {plan}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50">
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
          <Sparkles className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Your plan will appear here
          </p>
          <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
            Configure your preferences on the left and click
            &quot;Generate my plan&quot; to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
