"use client";

import React from "react";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import { useState } from "react";
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
import { User, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const { setUser } = useAppContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setuserName] = useState<string>("");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/login", {
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
        alert(response.message);
        setUser({
          fullName: response.user.fullName,
          email: response.user.email,
        });
        router.push("/");
        setuserName(response.user);
      } else {
        alert(`user doesnt found`);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
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

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 text-base mt-2"
            >
              Login
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
