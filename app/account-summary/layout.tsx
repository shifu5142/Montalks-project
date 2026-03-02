"use client";

import React from "react";
import AuthSidebar from "@/components/Auto-sidebar";

type AccountSummaryLayoutProps = {
  children: React.ReactNode;
};

export default function AccountSummaryLayout({
  children,
}: AccountSummaryLayoutProps) {
  return (
    <>
      <AuthSidebar onGoToSummary={() => {}} />
      {children}
    </>
  );
}

