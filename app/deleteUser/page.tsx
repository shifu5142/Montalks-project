"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import { Trash2, Mail, Lock, ShieldCheck } from "lucide-react";
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
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center px-6 pt-20 pb-10">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border-border">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-red-500 flex items-center justify-center mb-4">
            <Trash2 className="h-7 w-7 text-white" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-red-600">
            Delete Account
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Enter your credentials to permanently delete your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-input focus-visible:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-foreground font-medium">
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
                  className="pl-10 h-12 rounded-xl border-input focus-visible:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="confirmPassword"
                className="text-foreground font-medium"
              >
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
                  className="pl-10 h-12 rounded-xl border-input focus-visible:ring-primary"
                  required
                />
              </div>
            </div>

            {success && (
              <div className="rounded-xl bg-green-500 text-white font-semibold text-center py-4 px-4 shadow-lg">
                Account deleted successfully
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg text-base mt-2"
            >
              {loading ? "Deleting..." : "Delete account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
          <p>
            Changed your mind?{" "}
            <Link
              href="/"
              className="text-primary font-semibold hover:underline"
            >
              Go back
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
