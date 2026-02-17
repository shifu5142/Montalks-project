"use client";
import { HeroSection } from "@/components/hero-section";
import { MoneyIdeas } from "@/components/money-ideas";
import { Footer } from "@/components/footer";
import { MenuBar } from "@/components/menu-bar";
import { useRef, useState } from "react";
export default function Page() {
  const moneySection = useRef<HTMLDivElement | null>(null);

  const scrollSection = () => {
    moneySection.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <MenuBar /> {/* default light orange */}
      <HeroSection scrollSection={scrollSection} />
      <MoneyIdeas moneySection={moneySection} />
      <Footer />
    </>
  );
}
