"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";
import { useEffect, useState } from "react";

const TOKEN_KEY = "montalks_token";
const USER_KEY = "montalks_user";

export default function GithubCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useAppContext();
  const [message, setMessage] = useState("Completing sign in...");

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      setMessage("GitHub login failed. Please try again.");
      return;
    }

    if (!token) {
      setMessage("Missing token. Please try logging in again.");
      return;
    }

    try {
      const userData = userParam
        ? JSON.parse(userParam)
        : { fullName: "GitHub User", email: "github@user" };

      const user = {
        fullName: userData.fullName ?? userData.name ?? "GitHub User",
        email: userData.email ?? "github@user",
      };

      setUser(user);

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      setMessage("Sign in successful! Redirecting...");

      setTimeout(() => {
        router.replace("/");
      }, 800);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  }, [searchParams, router, setUser]);

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center px-6">
      <p className="text-foreground font-medium">{message}</p>
    </div>
  );
}