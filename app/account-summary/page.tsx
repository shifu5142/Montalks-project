// "use client";

// import React, { useMemo } from "react";
// import { useAppContext } from "@/app/context/AppContext";
// import { useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
// type AccountSummaryProps = {
//   summaryRef?: React.RefObject<HTMLDivElement>;
// };

// function AccountSummary({ summaryRef }: AccountSummaryProps) {
    
//   const { movements } = useAppContext();
//   const { isAuthenticated } = useKindeBrowserClient();

//   const { balance, totalDeposits, totalWithdrawals } = useMemo(() => {
//     return movements.reduce(
//       (acc, m) => {
//         if (m.type === "deposit") {
//           acc.totalDeposits += m.amount;
//           acc.balance += m.amount;
//         } else {
//           acc.totalWithdrawals += m.amount;
//           acc.balance -= m.amount;
//         }
//         return acc;
//       },
//       { balance: 0, totalDeposits: 0, totalWithdrawals: 0 }
//     );
//   }, [movements]);

//     {if(isAuthenticated) {return (
//     <section
//       ref={summaryRef}
//       className="w-full flex-1 flex flex-col min-h-screen bg-primary px-4 md:px-8 py-10"
//     >
//       <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center">
//         <div className="w-full rounded-2xl bg-white shadow-2xl px-6 py-6 md:px-8 md:py-8 flex flex-col gap-6">
//         <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
//           <div>
//             <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
//               Overview
//             </p>
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900">
//               Your money snapshot
//             </h2>
//           </div>
//           <p className="text-sm text-gray-500">
//             Stay on top of your balance, deposits, and withdrawals at a glance.
//           </p>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="rounded-xl bg-gray-50 px-4 py-4 flex flex-col gap-2">
//             <span className="text-xs font-medium uppercase tracking-widest text-gray-500">
//               Current Balance
//             </span>
//             <p
//               className={`text-2xl font-bold tabular-nums ${
//                 balance < 0 ? "text-red-500" : "text-emerald-600"
//               }`}
//             >
//               ${balance.toFixed(2)}
//             </p>
//             <span className="text-xs text-gray-500">
//               Net after all movements
//             </span>
//           </div>

//           <div className="rounded-xl bg-emerald-50 px-4 py-4 flex flex-col gap-2">
//             <span className="text-xs font-medium uppercase tracking-widest text-emerald-700">
//               Total Deposits
//             </span>
//             <p className="text-2xl font-bold text-emerald-700 tabular-nums">
//               +${totalDeposits.toFixed(2)}
//             </p>
//             <span className="text-xs text-emerald-800/70">
//               All added funds so far
//             </span>
//           </div>

//           <div className="rounded-xl bg-red-50 px-4 py-4 flex flex-col gap-2">
//             <span className="text-xs font-medium uppercase tracking-widest text-red-600">
//               Total Withdrawals
//             </span>
//             <p className="text-2xl font-bold text-red-600 tabular-nums">
//               -${totalWithdrawals.toFixed(2)}
//             </p>
//             <span className="text-xs text-red-700/70">
//               All money moved out
//             </span>
//           </div>
//         </div>
//       </div>
//       </div>
//     </section>
//   );
//   } else {return null;}
// }
// }
// export default AccountSummary;
export default function AccountSummary() {
  return (
    <div>AccountSummary</div>
  )
}