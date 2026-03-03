"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wallet, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { useState, useEffect } from "react";
import AuthSidebar from "./Auto-sidebar";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
console.log(API_BASE);
const TOKEN_KEY = "montalks_token";
const USER_KEY = "montalks_user";

type Movement = {
  type: "deposit" | "withdraw";
  amount: number;
  date: string;
};

/** Backend returns number[] (positive = deposit, negative = withdraw) → convert for display */
function numbersToMovements(arr: number[]): Movement[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((n) => ({
    type: n >= 0 ? "deposit" : "withdraw",
    amount: Math.abs(n),
    date: new Date().toLocaleDateString(),
  }));
}

/** Send to backend: deposit = +amount, withdraw = -amount */
function movementsToNumbers(movements: Movement[]): number[] {
  return movements.map((m) => (m.type === "deposit" ? m.amount : -m.amount));
}

function Movements() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("User");
  const[arrMovements, setArrMovements] = useState<number[]>([]);

  useEffect(() => {
    setMovements(numbersToMovements(arrMovements));
  }, [arrMovements]); 
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem(USER_KEY) : null;
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        setUserName(u.fullName ?? "User");
      } catch {
        // ignore
      }
    }
    if (!token) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        // load on first render
        const res = await fetch(`${API_BASE}/api/movements`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setArrMovements(data.movements);
        console.log(data);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalBalance =
    movements.length === 0
      ? 0
      : movements.reduce((acc, m) => {
          return m.type === "deposit" ? acc + m.amount : acc - m.amount;
        }, 0);

  const saveMovementsToBackend = async (newMovements: Movement[]) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!token) return;
    try {
    // save updated array
    const res = await fetch(`${API_BASE}/api/movements`, {
     method: "PUT",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
     },
     body: JSON.stringify({ movements: movementsToNumbers(newMovements) }),
});
  
    } catch (err) {
      console.error("Failed to save movements", err);
    }
  };

  const handleDeposit = () => {
    if (
      depositAmount === null ||
      depositAmount === 0 ||
      isNaN(depositAmount) ||
      depositAmount < 0
    ) {
      alert("Please enter a valid amount");
      return;
    }
    const next: Movement[] = [
      {
        type: "deposit",
        amount: depositAmount,
        date: new Date().toLocaleDateString(),
      },
      ...movements,
    ];
    setMovements(next);
    setDepositAmount(null);
    saveMovementsToBackend(next);
  };

  const handleWithdraw = () => {
    if (
      withdrawAmount === null ||
      withdrawAmount === 0 ||
      isNaN(withdrawAmount) ||
      withdrawAmount < 0
    ) {
      alert("Please enter a valid amount");
      return;
    }
    const next: Movement[] = [
      {
        type: "withdraw",
        amount: withdrawAmount,
        date: new Date().toLocaleDateString(),
      },
      ...movements,
    ];
    setMovements(next);
    setWithdrawAmount(null);
    saveMovementsToBackend(next);
    
  };

  if (loading) {
    return (
      <main className="h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm font-medium">Loading movements...</p>
      </main>
    );
  }

  return (
    <>
      <AuthSidebar onGoToSummary={() => {}} />
      <main className="min-h-screen bg-background flex flex-col items-center pt-24 px-4 pb-12 md:pl-60 md:pr-6 md:box-border w-full">
        <div className="w-full flex flex-col gap-6 max-w-3xl mx-auto">
          {/* Balance card */}
          <div className="w-full rounded-xl border border-border bg-card p-6 md:p-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Total Balance
              </p>
              <p
                className={`text-4xl md:text-5xl font-bold tabular-nums tracking-tight ${totalBalance < 0 ? "text-destructive" : "text-foreground"}`}
              >
                ${totalBalance}
                <span className="text-lg md:text-xl text-muted-foreground font-normal">.00</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Welcome back, <span className="font-medium text-foreground">{userName}</span>
              </p>
            </div>

            {/* Deposit & Withdraw */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-border">
              <div className="rounded-lg bg-secondary/50 border border-border p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                    <ArrowDownToLine className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Deposit</p>
                    <p className="text-xs text-muted-foreground">
                      Add funds
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={depositAmount === null ? "" : depositAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDepositAmount(value === "" ? null : Number(value));
                    }}
                    type="number"
                    placeholder="0.00"
                    className="flex-1 h-9 bg-card border-border text-sm"
                  />
                  <Button
                    onClick={handleDeposit}
                    className="h-9 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 shrink-0 rounded-lg"
                  >
                    Deposit
                  </Button>
                </div>
              </div>

              <div className="rounded-lg bg-secondary/50 border border-border p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
                    <ArrowUpFromLine className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Withdraw</p>
                    <p className="text-xs text-muted-foreground">
                      Send funds
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={withdrawAmount === null ? "" : withdrawAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      setWithdrawAmount(value === "" ? null : Number(value));
                    }}
                    type="number"
                    placeholder="0.00"
                    className="flex-1 h-9 bg-card border-border text-sm"
                  />
                  <Button
                    onClick={handleWithdraw}
                    className="h-9 bg-destructive hover:bg-destructive/90 text-destructive-foreground text-sm font-medium px-4 shrink-0 rounded-lg"
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Movements */}
          <div className="w-full rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Recent Movements
              </h2>
              <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
                {movements.length} transaction{movements.length !== 1 ? "s" : ""}
              </span>
            </div>

            <ScrollArea className="h-40 max-h-40 w-full">
              <div className="flex flex-col divide-y divide-border">
                {movements.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center px-4">
                    No transactions yet. Deposit or withdraw to get started.
                  </p>
                ) : (
                  movements.map((movement, index) => (
                    <div
                      key={`${movement.date}-${index}-${movement.amount}`}
                      className="flex items-center justify-between py-3 px-5 hover:bg-secondary/50 transition-colors"
                    >
                      <span
                        className={`text-sm font-semibold tabular-nums ${
                          movement.type === "deposit"
                            ? "text-emerald-600"
                            : "text-destructive"
                        }`}
                      >
                        {movement.type === "deposit" ? "+" : "-"}${movement.amount}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">{movement.date}</span>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </>
  );
}

export default Movements;
