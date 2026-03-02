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
      <main className="h-screen bg-orange-50 flex items-center justify-center">
        <p className="text-foreground font-medium">Loading movements...</p>
      </main>
    );
  }

  return (
    <>
      <AuthSidebar onGoToSummary={() => {}} />
      <main className="min-h-screen bg-orange-50 flex flex-col items-center pt-32 px-4 pb-12 md:pl-56 md:pr-4 md:box-border w-full">
        <div className="w-full flex flex-col items-center gap-8 max-w-4xl mx-auto">
          {/* Balance card — high contrast on orange */}
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-orange-100/80 p-8 md:p-10 shrink-0">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex items-center gap-2 text-primary">
                <Wallet className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-widest">
                  Total Balance
                </span>
              </div>
              <p
                className={`text-4xl md:text-5xl font-extrabold tabular-nums ${totalBalance < 0 ? "text-red-600" : "text-neutral-800"}`}
              >
                ${totalBalance}
                <span className="text-xl md:text-2xl text-neutral-500 font-medium">.00</span>
              </p>
              <p className="text-sm text-neutral-600">
                Welcome back, <span className="font-semibold text-neutral-800">{userName}</span>
              </p>
            </div>

            {/* Deposit & Withdraw — clear white panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8 pt-8 border-t border-orange-100">
              <div className="rounded-xl bg-neutral-50/80 border border-orange-100 p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15">
                    <ArrowDownToLine className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-ln font-bold text-neutral-800">Deposit</p>
                    <p className="text-xs text-neutral-800">
                      Add funds to your account
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Input
                    value={depositAmount === null ? "" : depositAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDepositAmount(value === "" ? null : Number(value));
                    }}
                    type="number"
                    placeholder="0.00"
                    className="flex-1 h-11 bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-emerald-500/30"
                  />
                  <Button
                    onClick={handleDeposit}
                    className="h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 shrink-0 rounded-lg"
                  >
                    Deposit
                  </Button>
                </div>
              </div>

              <div className="rounded-xl bg-neutral-50/80 border border-orange-100 p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15">
                    <ArrowUpFromLine className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-ln font-bold text-neutral-800">Withdraw</p>
                    <p className="text-xs text-neutral-600">
                      Send funds from your account
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Input
                    value={withdrawAmount === null ? "" : withdrawAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      setWithdrawAmount(value === "" ? null : Number(value));
                    }}
                    type="number"
                    placeholder="0.00"
                    className="flex-1 h-11 bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-red-500/30"
                  />
                  <Button
                    onClick={handleWithdraw}
                    className="h-11 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 shrink-0 rounded-lg"
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Movements — white card, more space */}
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-orange-100/80 overflow-hidden shrink-0">
            <div className="flex items-center justify-between px-5 py-4 border-b border-orange-100 bg-neutral-50/50">
              <h2 className="text-base md:text-lg font-bold uppercase tracking-widest text-primary">
                Recent Movements
              </h2>
              <span className="text-sm font-semibold text-neutral-600 bg-white/80 px-3 py-1 rounded-full border border-orange-100">
                {movements.length} transaction{movements.length !== 1 ? "s" : ""}
              </span>
            </div>

            <ScrollArea className="h-36 max-h-36 w-full">
              <div className="flex flex-col divide-y divide-orange-100/60">
                {movements.length === 0 ? (
                  <p className="text-sm text-neutral-500 py-8 text-center px-4">
                    No transactions yet. Deposit or withdraw to get started.
                  </p>
                ) : (
                  movements.map((movement, index) => (
                    <div
                      key={`${movement.date}-${index}-${movement.amount}`}
                      className="flex items-center justify-between py-3 px-5 hover:bg-neutral-50/80 transition-colors"
                    >
                      <span
                        className={
                          movement.type === "deposit"
                            ? "text-emerald-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {movement.type === "deposit" ? "+" : "−"}${movement.amount}
                      </span>
                      <span className="text-sm font-medium text-neutral-600">{movement.date}</span>
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
