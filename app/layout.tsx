import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MenuBar } from "@/components/menu-bar";
import { AppProvider } from "./context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MonTalks - Smart Financial Planning",
  description:
    "Take control of your finances with smart planning tools and expert insights designed to help you build lasting wealth.",
  icons: {
    icon: "/montalks-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1f1c1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <AppProvider>
          <MenuBar />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
