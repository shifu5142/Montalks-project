"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Calendar, Target, Loader2, Bot } from "lucide-react";

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
    <div className="min-h-screen bg-secondary flex flex-col lg:flex-row gap-6 lg:gap-8 pt-24 px-4 pb-10 max-w-6xl mx-auto w-full">
      {/* Left: Form card */}
      <Card className="w-full max-w-md lg:max-w-sm shrink-0 rounded-2xl shadow-2xl border-border h-fit">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4">
            <Sparkles className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-primary">
            Plan with AI
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Choose your plan length and financial goal
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label className="text-foreground font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Plan type
              </Label>
              <Select value={planType} onValueChange={setPlanType} required>
                <SelectTrigger className="h-12 rounded-xl border-input focus:ring-primary">
                  <SelectValue placeholder="Long plan or short plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long">Long plan</SelectItem>
                  <SelectItem value="short">Short plan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-foreground font-medium flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                How do you want to proceed?
              </Label>
              <Select value={goal} onValueChange={setGoal} required>
                <SelectTrigger className="h-12 rounded-xl border-input focus:ring-primary">
                  <SelectValue placeholder="Invest, save, or savings bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invest">Invest money</SelectItem>
                  <SelectItem value="save">Save money</SelectItem>
                  <SelectItem value="savings-bank">Savings bank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 text-base mt-2 disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating...
                </span>
              ) : (
                "Generate my plan"
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 text-red-700 text-sm font-medium py-3 px-4 border border-red-200">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right: AI comment / response */}
      <div className="flex-1 min-w-0 flex flex-col">
        {plan ? (
          <div className="rounded-2xl bg-white shadow-2xl border border-border overflow-hidden flex-1 flex flex-col min-h-[320px]">
            <div className="flex items-start gap-4 p-6 md:p-8">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                  AI Assistant
                </p>
                <div className="text-foreground text-base leading-relaxed whitespace-pre-wrap">
                  {plan}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 rounded-2xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center min-h-[320px]">
            <p className="text-muted-foreground text-sm text-center px-4">
              Your plan will appear here after you click &quot;Generate my plan&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}