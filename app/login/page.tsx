"use client";

import React, { useEffect, useRef } from "react";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/services/auth/firebaseConfig";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { User, Mail, Lock, Loader2, Github } from "lucide-react";
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
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";
  // GitHub login via Firebase
  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const userData = {
        fullName: firebaseUser.displayName ?? "GitHub User",
        email: firebaseUser.email ?? "github@user",
      };
      console.log(userData);
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          GithubUser: userData,
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
      // Put user into the same AppContext as normal login
    } catch (error) {
      console.error(error);
      alert("GitHub login failed. Please try again.");
    }
  };
  useEffect(() => {
    // If this navigation comes right after a successful login,
    // let the explicit setTimeout redirect handle it.
    if (justLoggedInRef.current || hasRedirectedRef.current) return;

    const isLoggedIn =
      user ||
      (typeof window !== "undefined" && localStorage.getItem(TOKEN_KEY));

    if (isLoggedIn) {
      hasRedirectedRef.current = true;
      alert("You are already logged in.");
      router.replace("/");
    }
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        // Handle login logic
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
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center px-6 pt-16">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border-border">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4">
            <User className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-primary">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Please login to your account
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

            {success && (
              <div className="rounded-xl bg-green-500 text-white font-semibold text-center py-4 px-4 shadow-lg">
                Login successful
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 text-base mt-2 disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>

            <Button
            onClick={handleGithubLogin}
              type="button"
              variant="outline"
              className="w-full h-12 rounded-xl border-input bg-background text-foreground font-semibold shadow-sm hover:bg-accent hover:text-accent-foreground text-base flex items-center justify-center gap-2"
            >
              <Github className="h-5 w-5" />
              Continue with GitHub
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 text-center text-sm text-muted-foreground">
          <p>
            {"Don't remember the password? "}
            <Link
              href="/reset-password"
              className="text-primary font-semibold hover:underline"
            >
              Reset password
            </Link>
          </p>
          <p>
            {"Don't have an account? "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
