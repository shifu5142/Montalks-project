"use client";

import React, { useEffect, useRef } from "react";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

const TOKEN_KEY = "montalks_token";

export default function LoginPage() {
  const { user, setUser } = useAppContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const justLoggedInRef = useRef(false);
  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    if (hasRedirectedRef.current) return;
    const isLoggedIn =
      user ||
      (typeof window !== "undefined" && localStorage.getItem(TOKEN_KEY));
    if (isLoggedIn) {
      hasRedirectedRef.current = true;
      if (!justLoggedInRef.current) {
        alert("You are already logged in.");
      }
      router.replace("/");
    }
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const API_BASE = process.env.API_BASE || "http://localhost:3001";
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const response = await res.json();
      if (response.success) {
        justLoggedInRef.current = true;
        const userData = response.user ?? {
          fullName: "User",
          email: email.trim(),
        };
        setUser({ fullName: userData.fullName, email: userData.email });
        if (typeof window !== "undefined") {
          localStorage.setItem("montalks_token", response.token ?? "");
          localStorage.setItem("montalks_user", JSON.stringify(userData));
        }
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        alert(response.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Is the backend running on http://localhost:3001?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 pt-14">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary mb-5">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Sign in to your MonTalks account
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

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-medium text-foreground">
                  Password
                </Label>
                <Link
                  href="/reset-password"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-10 rounded-lg border-input text-sm"
                  required
                />
              </div>
            </div>

            {success && (
              <div className="rounded-lg bg-success text-success-foreground text-sm font-medium text-center py-3 px-4">
                Login successful
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 mt-1 disabled:opacity-60 disabled:pointer-events-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {"Don't have an account? "}
          <Link
            href="/register"
            className="text-foreground font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
