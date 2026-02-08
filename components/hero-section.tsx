import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
type props = {
  scrollSection: (refSection?: React.RefObject<HTMLDivElement>) => void;
};
export function HeroSection({ scrollSection }: props) {
  return (
    <header className="relative min-h-screen w-full bg-primary text-primary-foreground flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-foreground/5" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-foreground/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-foreground/3" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-4">
          Smart Financial Planning
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-balance mb-6">
          Save Your Money
          <br />
          Grow Your Wealth
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto mb-10 leading-relaxed">
          Take control of your finances with smart planning tools and expert
          insights designed to help you build lasting wealth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => scrollSection()}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-xl px-8 py-6 text-base font-semibold rounded-xl"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-base rounded-xl bg-transparent"
          >
            <Link href="/login">Login to Account</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
