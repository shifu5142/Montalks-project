"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";

const COLS = 3; // cards per row (arrows only between cards on same row)

function WebPattern() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: "Add Movements",
      description:
        "Quickly add your income and expenses to track where your money goes.",
      icon: "💸",
    },
    {
      title: "See Graphs",
      description:
        "Automatic charts show your spending habits and monthly trends.",
      icon: "📊",
    },
    {
      title: "Improve Finances",
      description:
        "Use insights to reduce spending and save more every month.",
      icon: "📈",
    },
    {
      title: "Account Summary",
      description:
        "View your current balance, total deposits, and withdrawals at a glance.",
      icon: "📋",
    },
    {
      title: "AI Money Plans",
      description:
        "Get personalized saving plans and financial goals powered by AI.",
      icon: "✨",
    },
    {
      title: "Secure & Private",
      description:
        "Log in safely and manage your data with confidence.",
      icon: "🔒",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 py-20 md:px-6"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Label + Title */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            How It Works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            What you can do with MonTalks
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-muted-foreground">
            Manage your money with clarity and confidence
          </p>
        </div>

        {/* Steps in rows – arrow only between cards on the same row */}
        <div className="flex flex-col items-center gap-8">
          {Array.from({ length: Math.ceil(steps.length / COLS) }, (_, rowIndex) => {
            const rowSteps = steps.slice(rowIndex * COLS, rowIndex * COLS + COLS);
            return (
              <div
                key={rowIndex}
                className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
              >
                {rowSteps.map((step, i) => (
                  <div key={rowIndex * COLS + i} className="flex items-center">
                    <div className="w-full max-w-xs rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md md:max-w-[14rem]">
                      <div className="mb-4 text-4xl" aria-hidden>
                        {step.icon}
                      </div>
                      <h3 className="font-semibold text-lg text-orange-600">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    {i < rowSteps.length - 1 && (
                      <ArrowRight
                        className="ml-4 h-6 w-6 shrink-0 text-orange-500 md:ml-6"
                        aria-hidden
                      />
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Back to top – fixed bottom right, visible only when this section is in view */}
      <a
        href="#top"
        className={`fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-orange-600 shadow-md transition-all duration-300 hover:bg-orange-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
          isInView ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        aria-label="Back to top"
        aria-hidden={!isInView}
      >
        <ArrowUp className="h-5 w-5" />
      </a>
    </section>
  );
}
export default WebPattern;