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
import { UserPlus, User, Mail, Lock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert(
        "Passwords do not match. Please make sure both fields are the same.",
      );
      return;
    }

    setLoading(true); // start loading

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const response = await res.json();

      if (response.success) {
        router.push("/login");
      } else {
        alert("Some of the fields are incorrect");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false); // stop loading
    }
  }

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center px-6 pt-20 pb-10">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border-border">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4">
            <UserPlus className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-primary">
            Create Account
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Please fill in the form to register
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName" className="text-foreground font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-input focus-visible:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-input focus-visible:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
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

            {/* Register Button */}
            <Button
              type="submit"
              disabled={loading} // disable when loading
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 text-base mt-2"
            >
              {loading ? "Registering..." : "Register"} {/* show loading */}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
