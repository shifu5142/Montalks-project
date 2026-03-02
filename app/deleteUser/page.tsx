"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Mail, Lock, ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";
const TOKEN_KEY = "montalks_token";
const USER_KEY = "montalks_user";

export default function DeleteUserPage() {
  const { setUser } = useAppContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please make sure both fields are the same.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/deleteUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      let response;
      try {
        response = await res.json();
      } catch {
        throw new Error(res.status === 404 ? "Route not found. Check backend uses app.delete('/delete-account', ...)" : "Invalid response from server");
      }

      if (response.success) {
          if (typeof window !== "undefined") {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
          }
          setUser(null);
          setSuccess(true);
          setTimeout(() => {
            router.push("/register");
          }, 1500);
      } else {
        alert(response.message || "Failed to delete account");
      }
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to delete account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 pt-14 pb-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-destructive mb-5">
            <Trash2 className="h-5 w-5 text-destructive-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Delete account
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            This action is permanent and cannot be undone
          </p>
        </div>

        <div className="rounded-xl border border-destructive/20 bg-card p-6">
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
              <Label htmlFor="password" className="text-xs font-medium text-foreground">
                Password
              </Label>
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

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirmPassword" className="text-xs font-medium text-foreground">
                Confirm Password
              </Label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 h-10 rounded-lg border-input text-sm"
                  required
                />
              </div>
            </div>

            {success && (
              <div className="rounded-lg bg-success text-success-foreground text-sm font-medium text-center py-3 px-4">
                Account deleted successfully
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 mt-1 disabled:opacity-60 disabled:pointer-events-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Delete account permanently"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Changed your mind?{" "}
          <Link
            href="/"
            className="text-foreground font-medium hover:underline"
          >
            Go back
          </Link>
        </p>
      </div>
    </div>
  );
}
