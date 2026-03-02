import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";

type props = {
  scrollSection: (refSection?: React.RefObject<HTMLDivElement>) => void;
};

export function HeroSection({ scrollSection }: props) {
  return (
    <header className="relative w-full bg-primary text-primary-foreground overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-1.5 text-xs font-medium text-primary-foreground/70 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Smart Financial Planning
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-balance mb-6">
            Save Your Money,
            <br />
            Grow Your Wealth.
          </h1>

          <p className="text-base md:text-lg text-primary-foreground/60 max-w-lg mx-auto mb-10 leading-relaxed text-pretty">
            Take control of your finances with smart planning tools and expert
            insights designed to help you build lasting wealth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => scrollSection()}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 h-12 text-sm font-semibold rounded-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              asChild
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5 px-8 h-12 text-sm rounded-lg"
            >
              <Link href="/login">Login to Account</Link>
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 max-w-2xl mx-auto w-full">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 mb-1">
              <TrendingUp className="h-4 w-4 text-primary-foreground/60" />
            </div>
            <p className="text-2xl font-bold text-primary-foreground">AI Plans</p>
            <p className="text-xs text-primary-foreground/50">Personalized strategies</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 mb-1">
              <Shield className="h-4 w-4 text-primary-foreground/60" />
            </div>
            <p className="text-2xl font-bold text-primary-foreground">Secure</p>
            <p className="text-xs text-primary-foreground/50">Bank-level security</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 mb-1">
              <Zap className="h-4 w-4 text-primary-foreground/60" />
            </div>
            <p className="text-2xl font-bold text-primary-foreground">Instant</p>
            <p className="text-xs text-primary-foreground/50">Real-time tracking</p>
          </div>
        </div>
      </div>
    </header>
  );
}
