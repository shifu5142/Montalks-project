import { ideas } from "@/lib/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { TrendingUp, PiggyBank, Wallet, BarChart3 } from "lucide-react";

const icons = [TrendingUp, PiggyBank, Wallet, BarChart3];

export function MoneyIdeas() {
  return (
    <section className="w-full bg-background py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Financial Wisdom
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground text-balance">
            Smart Money Planning Ideas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Simple strategies that can transform your relationship with money
            and set you on the path to financial freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ideas.map((idea, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Card
                key={index}
                className="rounded-2xl border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
              >
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-bold text-primary">
                    {idea.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {idea.text}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
