"use client";
import { useState } from "react";

export default function History({ onClose }) {
  const [filter, setFilter] = useState("1m");

  const transactions = [
    { id: 1, date: "2025-09-20", category: "Food", amount: 12.5, description: "Starbucks" },
    { id: 2, date: "2025-09-18", category: "Transport", amount: 35, description: "Uber" },
    { id: 3, date: "2025-08-25", category: "Shopping", amount: 80, description: "Amazon" },
    { id: 4, date: "2025-07-30", category: "Bills", amount: 120, description: "Electricity" },
    { id: 5, date: "2025-06-15", category: "Entertainment", amount: 25, description: "Movie" },
    { id: 6, date: "2025-04-12", category: "Food", amount: 50, description: "Restaurant" },
  ];

  const now = new Date();
  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    if (filter === "1m") {
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(now.getMonth() - 1);
      return txDate >= oneMonthAgo;
    } else if (filter === "3m") {
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      return txDate >= threeMonthsAgo;
    } else if (filter === "6m") {
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      return txDate >= sixMonthsAgo;
    } else if (filter === "1y") {
      const oneYearAgo = new Date(now);
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      return txDate >= oneYearAgo;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-green-800 text-white shadow-md">
        <h2 className="text-xl font-bold">Transaction History</h2>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-white text-green-800 font-semibold rounded hover:bg-gray-100"
        >
          Close
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-around border-b border-gray-200 bg-gray-50">
        {[
          { label: "1 Month", value: "1m" },
          { label: "3 Months", value: "3m" },
          { label: "6 Months", value: "6m" },
          { label: "1 Year", value: "1y" },
        ].map((tab) => (
          <button
            key={tab.value}
            className={`flex-1 py-2 font-medium text-center transition ${
              filter === tab.value
                ? "border-b-2 border-green-800 text-green-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setFilter(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">No transactions for this period.</p>
        ) : (
          filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center p-3 border rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-medium text-gray-800">{tx.description}</p>
                <p className="text-sm text-gray-500">{tx.category}</p>
                <p className="text-xs text-gray-400">{tx.date}</p>
              </div>
              <p className="font-semibold text-gray-800">${tx.amount.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
