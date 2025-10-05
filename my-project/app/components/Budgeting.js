'use client';

import { useState, useEffect } from "react";

export default function Budgeting({ onClose }) {
  // This month's preset categories
  const thisMonthsBudgets = [
    { name: "Groceries", budget: 300 },
    { name: "Food & Takeout", budget: 150 },
    { name: "Shopping", budget: 200 },
    { name: "Entertainment", budget: 100 },
    { name: "Rent", budget: 800 },
  ];

  const initialCategories = thisMonthsBudgets.map(c => c.name);

  const [categories, setCategories] = useState(initialCategories);
  const [budgets, setBudgets] = useState(
    Object.fromEntries(thisMonthsBudgets.map(c => [c.name, c.budget.toString()]))
  );

  const [saved, setSaved] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleBudgetChange = (category, value) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setBudgets({ ...budgets, [category]: value });
    }
  };

  const handleCategoryChange = (idx, newName) => {
    const oldName = categories[idx];
    const newCategories = [...categories];
    newCategories[idx] = newName || oldName;
    setCategories(newCategories);

    // Update budget mapping
    const newBudgets = { ...budgets };
    if (oldName !== newName) {
      newBudgets[newName] = newBudgets[oldName];
      delete newBudgets[oldName];
    }
    setBudgets(newBudgets);
  };

  const handleSubmit = () => setSaved(true);

  const addCategory = () => {
    const newCategory = `Category ${categories.length + 1}`;
    setCategories([...categories, newCategory]);
    setBudgets({ ...budgets, [newCategory]: "" });
    setEditingCategory(categories.length);
  };

  return (
    <div className="flex flex-col h-full w-full p-4 overflow-y-auto bg-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Your Budgets This Month:</h2>
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
            Set/Edit monthly spending limits for different categories! Tap a category to rename.
          </p>

          <div className="space-y-4">
            {categories.map((cat, idx) => (
              <div key={cat} className="flex flex-col">
                {editingCategory === idx ? (
                  <input
                    type="text"
                    value={categories[idx]}
                    autoFocus
                    onBlur={() => setEditingCategory(null)}
                    onChange={(e) => handleCategoryChange(idx, e.target.value)}
                    className="border border-gray-300 rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400 text-gray-800 font-medium transition"
                  />
                ) : (
                  <label
                    className="font-medium text-gray-700 mb-1 cursor-text"
                    onClick={() => setEditingCategory(idx)}
                  >
                    {cat}
                  </label>
                )}

                <input
                  type="text"
                  value={budgets[cat]}
                  onChange={(e) => handleBudgetChange(cat, e.target.value)}
                  placeholder="$0.00"
                  className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400 text-gray-800 font-medium transition"
                />
              </div>
            ))}
          </div>

          {/* Add Category Button */}
          <button
            onClick={addCategory}
            className="mt-4 px-4 py-2 bg-green-100 text-green-800 font-medium rounded-xl hover:bg-green-200 transition"
          >
            + Add Category
          </button>

          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-3 bg-green-800 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
          >
            Save Budgets
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-gray-700 font-medium text-lg">Your Budget Recap:</p>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div
                key={cat}
                className="flex justify-between p-3 border rounded-xl bg-gray-50 shadow-sm"
              >
                <span className="font-medium text-gray-800">{cat}</span>
                <span className="font-semibold text-green-700">
                  ${parseFloat(budgets[cat] || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-6 px-6 py-3 bg-green-800 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
