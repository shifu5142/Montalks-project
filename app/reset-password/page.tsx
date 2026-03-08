"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { KeyRound, Mail, User } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch(`${API_BASE}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      if (typeof window !== "undefined") {
        localStorage.setItem("reset-email", email.trim().toLowerCase());
      }
      setSuccess(true);
    } else {
      setErrorMessage(data.message ?? "Something went wrong");
    }
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      router.push("/reset-password/confirm");
    } else {
      alert(data.message ?? "Something went wrong");
    }
  }

  function handleCancel() {
    setSuccess(false);
    setUsername("");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-secondary px-6 pt-16">
      <Card className="w-full max-w-md rounded-2xl border-border shadow-2xl">
        <CardHeader className="pb-2 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary">
            <KeyRound className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-primary">
            Reset Password
          </CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">
            Enter your email and we&apos;ll send you a reset link
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="font-medium text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage("");
                  }}
                  className="h-12 rounded-xl border-input pl-10 focus-visible:ring-primary"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mt-2 h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90"
            >
              Send Reset Link
            </Button>
            {errorMessage && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                {errorMessage}
              </div>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 text-center text-sm text-muted-foreground">
          <p>
            Remembered your password?{" "}
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

      {/* Popup overlay: blur everything behind + centered popup */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            aria-hidden
            onClick={handleCancel}
          />
          <div
            className="relative z-10 w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-4 text-center text-sm font-medium text-foreground">
              Enter your username to confirm
            </p>
            <form onSubmit={handleConfirm} className="flex flex-col gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 rounded-xl border-input pl-10 focus-visible:ring-primary"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 flex-1 rounded-xl border-border font-semibold hover:bg-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-12 flex-1 rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg hover:bg-primary/90"
                >
                  Confirm
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
