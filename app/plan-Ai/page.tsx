"use client";

import React, { useState } from "react";
import { PlanForm } from "@/components/plan-form";
import { PlanResult } from "@/components/plan-result";
import { Sparkles } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export default function PlanAiPage() {
  const [planType, setPlanType] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!planType || !goal) {
      alert("Please select both plan type and goal");
      return;
    }
    setLoading(true);
    setError(null);
    setPlan(null);
    try {
      const res = await fetch(`${API_BASE}/plan-Ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planType, goal }),
      });
      const data = await res.json();
      if (data.success && data.plan) {
        setPlan(data.plan);
      } else {
        setError(data.message || "Failed to generate plan");
      }
    } catch (err) {
      console.error(err);
      setError("Error generating plan. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header area */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Plan with AI
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero section */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            AI-Powered Financial Planning
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Build your personalized plan
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-muted-foreground">
            Choose your timeline and financial goal, and our AI assistant will
            craft a tailored strategy just for you.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Form — 2 cols */}
          <div className="lg:col-span-2">
            <PlanForm
              planType={planType}
              setPlanType={setPlanType}
              goal={goal}
              setGoal={setGoal}
              loading={loading}
              error={error}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Right: Result — 3 cols */}
          <div className="lg:col-span-3">
            <PlanResult plan={plan} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}
