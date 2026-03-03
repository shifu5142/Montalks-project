"use client";

import { HeroSection } from "@/components/hero-section";
import { MoneyIdeas } from "@/components/money-ideas";
import { Footer } from "@/components/footer";
import { useRef } from "react";
import Movements from "@/components/Movements";
import { useAppContext } from "@/app/context/AppContext";
import UserGraph from "@/components/user-graph";
 function Page() {
  const moneySection = useRef<HTMLDivElement | null>(null);
  const { user } = useAppContext();

  const scrollSection = () => {
    moneySection.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Same page layout always; only the first section swaps
  return (
    <>
      {user ? (
        <Movements />
      ) : (
        <HeroSection scrollSection={scrollSection} />
      )}
      {user ? (
        <div className="md:pl-56 w-full box-border">
          <section className="w-full py-12 px-4 md:px-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <UserGraph />
            </div>
          </section>
          <MoneyIdeas moneySection={moneySection} isLoggedIn />
        </div>
      ) : (
        <>
          <MoneyIdeas moneySection={moneySection} />
          <Footer />
        </>
      )}
    </>
  );
}
export default Page;