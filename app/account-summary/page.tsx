"use client";

import React, { useEffect, useMemo, useState } from "react";

type AccountSummaryProps = {
  summaryRef?: React.RefObject<HTMLDivElement>;
};

type Movement = {
  type: "deposit" | "withdraw";
  amount: number;
  date: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const TOKEN_KEY = "montalks_token";

function numbersToMovements(arr: number[]): Movement[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((n) => ({
    type: n >= 0 ? "deposit" : "withdraw",
    amount: Math.abs(n),
    date: new Date().toLocaleDateString(),
  }));
}

function AccountSummary({ summaryRef }: AccountSummaryProps) {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/account-summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return;

        const data = await res.json();
        console.log(data);
        setMovements(numbersToMovements(data.movements ?? []));
      } catch (err) {
        console.error("Failed to load account summary", err);
      }
    })();
  }, []);

  const { balance, totalDeposits, totalWithdrawals } = useMemo(() => {
    return movements.reduce(
      (acc, m) => {
        if (m.type === "deposit") {
          acc.totalDeposits += m.amount;
          acc.balance += m.amount;
        } else {
          acc.totalWithdrawals += m.amount;
          acc.balance -= m.amount;
        }
        return acc;
      },
      { balance: 0, totalDeposits: 0, totalWithdrawals: 0 }
    );
  }, [movements]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-orange-50 flex flex-col items-center pt-32 px-4 pb-12 md:pl-56 md:pr-4 md:box-border w-full">
      <div className="w-full flex flex-col items-center gap-8 max-w-4xl mx-auto">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-orange-100/80 p-8 md:p-10 shrink-0">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2 text-primary">
              <span className="text-sm font-semibold uppercase tracking-widest">
                Account Summary
              </span>
            </div>
            <p className="text-3xl md:text-4xl font-extrabold text-neutral-800">
              Your money snapshot
            </p>
            <p className="text-sm text-neutral-600 max-w-md">
              Stay on top of your balance, deposits, and withdrawals at a glance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 pt-8 border-t border-orange-100">
            <div className="rounded-xl bg-neutral-50/80 border border-orange-100 p-5 flex flex-col gap-2 items-center text-center">
              <span className="text-xs font-medium uppercase tracking-widest text-gray-500">
                Current Balance
              </span>
              <p
                className={`text-3xl font-extrabold tabular-nums ${
                  balance < 0 ? "text-red-600" : "text-emerald-600"
                }`}
              >
                ${balance.toFixed(2)}
              </p>
              <span className="text-xs text-gray-500">
                Net after all movements
              </span>
            </div>

            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-5 flex flex-col gap-2 items-center text-center">
              <span className="text-xs font-medium uppercase tracking-widest text-emerald-700">
                Total Deposits
              </span>
              <p className="text-2xl font-extrabold text-emerald-700 tabular-nums">
                +${totalDeposits.toFixed(2)}
              </p>
              <span className="text-xs text-emerald-800/70">
                All added funds so far
              </span>
            </div>

            <div className="rounded-xl bg-red-50 border border-red-100 p-5 flex flex-col gap-2 items-center text-center">
              <span className="text-xs font-medium uppercase tracking-widest text-red-600">
                Total Withdrawals
              </span>
              <p className="text-2xl font-extrabold text-red-600 tabular-nums">
                -${totalWithdrawals.toFixed(2)}
              </p>
              <span className="text-xs text-red-700/70">
                All money moved out
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AccountSummary;
