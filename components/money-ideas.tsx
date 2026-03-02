import { ideas } from "@/lib/data";
import { TrendingUp, PiggyBank, Wallet, BarChart3 } from "lucide-react";

const icons = [TrendingUp, PiggyBank, Wallet, BarChart3];

type props = {
  moneySection: React.RefObject<HTMLDivElement>;
  isLoggedIn?: boolean;
};

export function MoneyIdeas({ moneySection, isLoggedIn }: props) {
  return (
    <section
      ref={moneySection}
      className={`w-full py-20 md:py-28 px-6 ${isLoggedIn ? "bg-secondary/50" : "bg-background"}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Financial Wisdom
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance tracking-tight">
            Smart Money Planning Ideas
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto leading-relaxed text-pretty">
            Simple strategies that can transform your relationship with money
            and set you on the path to financial freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ideas.map((idea, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-6 hover:border-foreground/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="h-4 w-4 text-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">
                      {idea.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {idea.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
