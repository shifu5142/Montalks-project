"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Mail } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 pt-14">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary mb-5">
            <KeyRound className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Reset your password
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            {"Enter your email and we'll send you a reset link"}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10 rounded-lg border-input text-sm"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 mt-1"
            >
              Send Reset Link
            </Button>
          </form>
        </div>

        <div className="flex flex-col gap-2 text-center text-sm text-muted-foreground mt-6">
          <p>
            {"Remembered your password? "}
            <Link
              href="/login"
              className="text-foreground font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
          <p>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
