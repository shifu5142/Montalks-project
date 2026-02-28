"use client";

import AuthSidebar from "@/components/Auto-sidebar";

export default function PlanAiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthSidebar
        onGoToDashboard={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onGoToSummary={() => {}}
      />
      <div className="md:pl-56 w-full min-h-screen">{children}</div>
    </>
  );
}
