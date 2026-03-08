"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppContext } from "@/app/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { KeyRound, Lock } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export default function ResetPasswordConfirmPage() {
  const { logout } = useAppContext();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => {
      logout();
    }, 2000);
    return () => clearTimeout(timer);
  }, [success, logout]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/reset-password/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
          confirmPassword,
          email: typeof window !== "undefined" ? localStorage.getItem("reset-email") || "" : "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        if (typeof window !== "undefined") {
          localStorage.removeItem("reset-email");
        }
      } else {
        setErrorMessage(data.message ?? "Something went wrong");
      }
    } catch {
      setErrorMessage("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-6 pt-16">
      <Card className="w-full max-w-md rounded-2xl border-border shadow-2xl">
        <CardHeader className="pb-2 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary">
            <KeyRound className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-primary">
            Set new password
          </CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">
            Enter your new password and confirm it below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="newPassword" className="font-medium text-foreground">
                New password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setErrorMessage("");
                  }}
                  className="h-12 rounded-xl border-input pl-10 focus-visible:ring-primary"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword" className="font-medium text-foreground">
                Confirm password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorMessage("");
                  }}
                  className="h-12 rounded-xl border-input pl-10 focus-visible:ring-primary"
                  required
                  minLength={6}
                />
              </div>
            </div>
            {errorMessage && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                {errorMessage}
              </div>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 disabled:opacity-70"
            >
              {loading ? "Resetting..." : "Reset password"}
            </Button>
            {success && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-800">
                Your password has changed successfully.
              </div>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 text-center text-sm text-muted-foreground">
          <p>
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          </p>
          <p>
            Back to{" "}
            <Link
              href="/"
              className="font-semibold text-primary hover:underline"
            >
              Home
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
