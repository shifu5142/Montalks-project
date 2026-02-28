"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wallet, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { useState, useEffect } from "react";
import AuthSidebar from "./Auto-sidebar";
const API_BASE = "http://localhost:3001";
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

  // Fetch movements from backend on mount (token from localStorage)
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
        const res = await fetch(`${API_BASE}/api/movements`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data.success && Array.isArray(data.movements)) {
          setMovements(numbersToMovements(data.movements));
        }
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
      await fetch(`${API_BASE}/api/movements`, {
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
      <main className="h-screen bg-primary flex items-center justify-center">
        <p className="text-white font-medium">Loading movements...</p>
      </main>
    );
  }

  return (
    <>
      <AuthSidebar
        onGoToDashboard={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onGoToSummary={() => {}}
      />
      {/* Content area: padding reserves space for sidebar (14rem); content centered so nothing is hidden */}
      <main className="min-h-screen bg-primary flex flex-col items-center pt-32 px-4 pb-6 md:pl-56 md:pr-4 md:box-border w-full">
        <div className="w-full flex flex-col items-center gap-6 max-w-4xl mx-auto">
      <div className="flex flex-col w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 shrink-0">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-gray-500">
            <Wallet className="h-4 w-4" />
            <span className="text-sm font-medium uppercase tracking-widest">
              Total Balance
            </span>
          </div>
          <p
            className={`text-5xl font-bold ${totalBalance < 0 ? "text-red-500" : "text-gray-800"}`}
          >
            ${totalBalance}
            <span className="text-2xl text-gray-500">.00</span>
          </p>
          <p className="text-sm text-gray-600">
            Welcome back, <span className="font-medium">{userName}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-gray-50 p-5 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                <ArrowDownToLine className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Deposit</p>
                <p className="text-xs text-gray-500">
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
                className="flex-1 bg-white border border-gray-300 placeholder-gray-400"
              />
              <Button
                onClick={handleDeposit}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 shrink-0"
              >
                Deposit
              </Button>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-5 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
                <ArrowUpFromLine className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Withdraw</p>
                <p className="text-xs text-gray-500">
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
                className="flex-1 bg-white border border-gray-300 placeholder-gray-400"
              />
              <Button
                onClick={handleWithdraw}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 shrink-0"
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl bg-white shadow-2xl p-2 md:p-3 w-full max-w-4xl shrink-0">
        <div className="flex items-center justify-between px-3 pt-2 pb-2 shrink-0">
          <h6 className="text-base md:text-lg font-bold uppercase tracking-widest text-gray-900">
            Recent Movements
          </h6>
          <span className="text-sm font-medium text-gray-600">
            {movements.length} transactions
          </span>
        </div>

        <ScrollArea className="h-28 max-h-28 w-full overflow-auto px-3 pb-2">
          <div className="flex flex-col gap-1">
            {movements.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">
                No transactions yet. Deposit or withdraw to get started.
              </p>
            ) : (
              movements.map((movement, index) => (
                <div
                  key={`${movement.date}-${index}-${movement.amount}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <span
                    className={
                      movement.type === "deposit"
                        ? "text-emerald-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {movement.type === "deposit" ? "+" : "-"}${movement.amount}
                  </span>
                  <span className="text-sm text-gray-500">{movement.date}</span>
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
