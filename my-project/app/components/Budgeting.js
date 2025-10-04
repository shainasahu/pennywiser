"use client";

import { useState } from "react";

export default function Budgeting({ onClose }) {
  const categories = ["Food", "Travel", "Utilities", "Entertainment", "Shopping"];
  const [budgets, setBudgets] = useState({
    Food: 0,
    Travel: 0,
    Utilities: 0,
    Entertainment: 0,
    Shopping: 0,
  });

  const [saved, setSaved] = useState(false); // track if user has saved budgets

  const handleChange = (category, value) => {
    setBudgets({ ...budgets, [category]: Number(value) });
  };

  const handleSubmit = () => {
    setSaved(true);
  };

  return (
    <div className="flex flex-col h-full w-full p-4 overflow-y-auto bg-white">
      {/* Top Bar with Close Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Set Your Budgets 💰</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 font-bold text-xl"
        >
          ✕
        </button>
      </div>

      {!saved ? (
        <>
          <p className="text-gray-600 mb-6">
            Set monthly spending limits for different categories to stay on track!
          </p>

          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat} className="flex flex-col">
                <label className="font-medium text-gray-700 mb-1">{cat}</label>
                <input
                  type="number"
                  min={0}
                  value={budgets[cat]}
                  onChange={(e) => handleChange(cat, e.target.value)}
                  className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder={`Enter budget for ${cat}`}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-3 bg-green-800 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
          >
            Save Budgets
          </button>
        </>
      ) : (
        // Recap view
        <div className="flex flex-col gap-4">
          <p className="text-gray-700 font-medium text-lg">🎉 Your Budget Recap:</p>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div
                key={cat}
                className="flex justify-between p-3 border rounded-lg bg-gray-50 shadow-sm"
              >
                <span className="font-medium text-gray-800">{cat}</span>
                <span className="font-semibold text-green-700">${budgets[cat].toFixed(2)}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-6 px-6 py-3 bg-green-800 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
