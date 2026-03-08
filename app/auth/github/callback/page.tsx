import { Suspense } from "react";
import GithubCallbackClient from "./GithubCallbackClient";

export const dynamic = "force-dynamic";

export default function GithubCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-secondary flex flex-col items-center justify-center px-6"><p className="text-foreground font-medium">Completing sign in...</p></div>}>
      <GithubCallbackClient />
    </Suspense>
  );
}
