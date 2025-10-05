"use client";
import { useState } from "react";

export default function History({ onClose }) {
  const transactions = [
    // SEPTEMBER 2025
    { id: 1, date: "2025-09-28", category: "Food", amount: 14.5, description: "Chipotle" },
    { id: 2, date: "2025-09-22", category: "Travel", amount: 38.0, description: "Uber" },
    { id: 3, date: "2025-09-20", category: "Utilities", amount: 120.0, description: "Electricity Bill" },
    { id: 4, date: "2025-09-18", category: "Shopping", amount: 85.99, description: "Amazon Order" },
    { id: 5, date: "2025-09-15", category: "Entertainment", amount: 19.99, description: "Netflix" },
    { id: 6, date: "2025-09-10", category: "Food", amount: 12.0, description: "Starbucks" },

    // AUGUST 2025
    { id: 7, date: "2025-08-27", category: "Food", amount: 28.75, description: "Sushi Place" },
    { id: 8, date: "2025-08-21", category: "Utilities", amount: 95.0, description: "Internet Bill" },
    { id: 9, date: "2025-08-18", category: "Shopping", amount: 149.99, description: "Target" },
    { id: 10, date: "2025-08-14", category: "Travel", amount: 25.0, description: "Gas Station" },
    { id: 11, date: "2025-08-09", category: "Entertainment", amount: 45.0, description: "Concert Tickets" },
    { id: 12, date: "2025-08-05", category: "Food", amount: 16.5, description: "Pizza Place" },

    // JULY 2025
    { id: 13, date: "2025-07-30", category: "Utilities", amount: 130.0, description: "Rent" },
    { id: 14, date: "2025-07-25", category: "Food", amount: 16.5, description: "Starbucks" },
    { id: 15, date: "2025-07-20", category: "Travel", amount: 230.0, description: "Flight Ticket" },
    { id: 16, date: "2025-07-17", category: "Shopping", amount: 79.99, description: "H&M" },
    { id: 17, date: "2025-07-10", category: "Travel", amount: 60.0, description: "Metro Pass" },
    { id: 18, date: "2025-07-05", category: "Entertainment", amount: 22.0, description: "Movie Theater" },

    // JUNE 2025
    { id: 19, date: "2025-06-28", category: "Utilities", amount: 110.0, description: "Water Bill" },
    { id: 20, date: "2025-06-24", category: "Entertainment", amount: 30.0, description: "Movie Theater" },
    { id: 21, date: "2025-06-18", category: "Food", amount: 42.0, description: "Dinner with Friends" },
    { id: 22, date: "2025-06-15", category: "Shopping", amount: 210.0, description: "IKEA Furniture" },
    { id: 23, date: "2025-06-05", category: "Travel", amount: 18.0, description: "Bus Pass" },
    { id: 24, date: "2025-06-02", category: "Food", amount: 15.0, description: "McDonald's" },

    // MAY 2025
    { id: 25, date: "2025-05-29", category: "Utilities", amount: 125.0, description: "Rent" },
    { id: 26, date: "2025-05-20", category: "Food", amount: 10.75, description: "Bakery" },
    { id: 27, date: "2025-05-16", category: "Travel", amount: 40.0, description: "Uber" },
    { id: 28, date: "2025-05-12", category: "Shopping", amount: 99.99, description: "Old Navy" },
    { id: 29, date: "2025-05-08", category: "Entertainment", amount: 25.0, description: "Bowling Alley" },
    { id: 30, date: "2025-05-02", category: "Food", amount: 13.0, description: "Subway" },

    // APRIL 2025
    { id: 31, date: "2025-04-30", category: "Utilities", amount: 105.0, description: "Phone Bill" },
    { id: 32, date: "2025-04-25", category: "Food", amount: 20.0, description: "McDonald's" },
    { id: 33, date: "2025-04-18", category: "Shopping", amount: 150.0, description: "Zara" },
    { id: 34, date: "2025-04-15", category: "Travel", amount: 22.0, description: "Uber" },
    { id: 35, date: "2025-04-10", category: "Entertainment", amount: 60.0, description: "Music Festival" },
    { id: 36, date: "2025-04-05", category: "Food", amount: 11.0, description: "Burger King" },
  ];

  const now = new Date();
  const monthTabs = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return {
      label: d.toLocaleString("default", { month: "short" }),
      value: `${year}-${month}`,
    };
  });

  const [selectedMonth, setSelectedMonth] = useState(monthTabs[0].value);

  const filteredTransactions = transactions.filter((tx) =>
    tx.date.startsWith(selectedMonth)
  );

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

      {/* Month Tabs */}
      <div className="flex justify-around border-b border-gray-200 bg-gray-50">
        {monthTabs.map((tab) => (
          <button
            key={tab.value}
            className={`flex-1 py-2 font-medium text-center transition ${
              selectedMonth === tab.value
                ? "border-b-2 border-green-800 text-green-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setSelectedMonth(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">
            No transactions for this month.
          </p>
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
              <p className="font-semibold text-gray-800">
                ${tx.amount.toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
