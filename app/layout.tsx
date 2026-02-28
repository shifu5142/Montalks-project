import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MenuBar } from "@/components/menu-bar";
import { AppProvider } from "./context/AppContext";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MonTalks - Save Your Money, Grow Your Wealth",
  description:
    "Smart money planning ideas and tools to help you save, invest, and grow your wealth.",
    icons: {
      icon: "/montalks-icon.png",
    },
};

export const viewport: Viewport = {
  themeColor: "#f97316",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppProvider>
          <MenuBar />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
