"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useAppContext } from "@/app/context/AppContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const TOKEN_KEY = "montalks_token";

export type Movement = {
  type: "deposit" | "withdraw";
  amount: number;
  date: string;
};

/** Convert backend number[] (positive = deposit, negative = withdraw) to Movement[] */
export function numbersToMovements(arr: number[]): Movement[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((n) => ({
    type: n >= 0 ? "deposit" : "withdraw",
    amount: Math.abs(n),
    date: new Date().toLocaleDateString(),
  }));
}

type UserGraphProps = {
  /** Movements (newest first). If not provided, fetches from API when mounted. */
  movements?: Movement[] | null;
};

/** Build chart data: oldest-first with running balance for area chart. Empty = flat line at 0. */
function buildChartData(movements: Movement[]) {
  if (movements.length === 0)
    return [
      { index: 0, balance: 0, label: "Start" },
      { index: 1, balance: 0, label: "—" },
    ];
  const oldestFirst = [...movements].reverse();
  const points: { index: number; balance: number; label: string }[] = [];
  let balance = 0;
  points.push({ index: 0, balance: 0, label: "Start" });
  oldestFirst.forEach((m, i) => {
    balance += m.type === "deposit" ? m.amount : -m.amount;
    points.push({
      index: i + 1,
      balance,
      label: `#${i + 1}`,
    });
  });
  return points;
}

const chartConfig = {
  balance: {
    label: "Balance",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

 function UserGraph({ movements: movementsProp }: UserGraphProps) {
  const { logout } = useAppContext();
  const [fetchedMovements, setFetchedMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(movementsProp === undefined);

  useEffect(() => {
    if (movementsProp !== undefined) return;
    const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!token) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/movements`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          logout();
          return;
        }
        if (cancelled || !res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.movements)) {
          setFetchedMovements(numbersToMovements(data.movements));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [movementsProp, logout]);

  const movements = movementsProp ?? fetchedMovements;
  const chartData = useMemo(() => buildChartData(movements), [movements]);

  if (movementsProp === undefined && loading) {
    return (
      <div className="w-full h-[80vh] rounded-xl border border-orange-300 bg-white p-4 flex flex-col">
        <p className="mb-3 text-sm font-semibold text-foreground">Balance over time</p>
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          Loading…
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[80vh] rounded-xl border border-orange-300 bg-white p-4 flex flex-col">
      <p className="mb-3 text-sm font-semibold text-foreground">
        Balance over time
      </p>
      <ChartContainer config={chartConfig} className="w-full flex-1 min-h-0">
        <AreaChart
          data={chartData}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            tickFormatter={(v) => `$${v}`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => [`$${Number(value).toFixed(2)}`, "Balance"]}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
export default UserGraph;