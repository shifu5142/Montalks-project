"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Target, Loader2, ArrowRight } from "lucide-react";

interface PlanFormProps {
  planType: string;
  setPlanType: (v: string) => void;
  goal: string;
  setGoal: (v: string) => void;
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

export function PlanForm({
  planType,
  setPlanType,
  goal,
  setGoal,
  loading,
  error,
  onSubmit,
}: PlanFormProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">
          Configure your plan
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Select your preferences below to get started.
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {/* Plan type */}
        <div className="flex flex-col gap-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            Plan type
          </Label>
          <Select value={planType} onValueChange={setPlanType} required>
            <SelectTrigger className="h-11 rounded-xl border-input bg-background text-sm">
              <SelectValue placeholder="Long plan or short plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="long">Long plan</SelectItem>
              <SelectItem value="short">Short plan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Goal */}
        <div className="flex flex-col gap-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Target className="h-3.5 w-3.5 text-muted-foreground" />
            How do you want to proceed?
          </Label>
          <Select value={goal} onValueChange={setGoal} required>
            <SelectTrigger className="h-11 rounded-xl border-input bg-background text-sm">
              <SelectValue placeholder="Invest, save, or savings bank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="invest">Invest money</SelectItem>
              <SelectItem value="save">Save money</SelectItem>
              <SelectItem value="savings-bank">Savings bank</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="mt-1 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Generate my plan
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
          {error}
        </div>
      )}

      {/* Subtle info footer */}
      <div className="mt-6 flex items-start gap-2 rounded-xl bg-secondary px-4 py-3">
        <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Our AI analyzes your goals to create actionable financial strategies
          tailored to your timeline.
        </p>
      </div>
    </div>
  );
}
