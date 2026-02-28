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
import { Sparkles, Calendar, Target } from "lucide-react";

function PlanAiPage() {
  const [planType, setPlanType] = useState<string>("");
  const [goal, setGoal] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: use planType and goal
    alert(`Plan: ${planType || "—"} | Goal: ${goal || "—"}`);
  }

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center pt-24 px-4 pb-10">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border-border">
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
            {/* Plan type selector */}
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

            {/* Goal selector */}
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
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 text-base mt-2"
            >
              Generate my plan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default PlanAiPage;