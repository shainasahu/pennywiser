'use client';
import React, { useEffect, useState } from 'react';

/** @typedef {{name:string,budget:number,spent:number}} Category */

const MonthlyGoals = () => {
  /** @type {Category[]} */
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories') // Flask endpoint
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Monthly Goals</h2>
      <div className="space-y-4">
        {categories.map((cat, idx) => {
          const isOver = cat.spent > cat.budget;
          const spentPercent = Math.min((cat.spent / cat.budget) * 100, 100);
          const overPercent = isOver
            ? ((cat.spent - cat.budget) / cat.budget) * 100
            : 0;

          return (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{cat.name}</span>
                <span className="text-sm text-gray-600">
                  ${cat.spent} / ${cat.budget}
                </span>
              </div>

              <div className="relative w-full h-5 bg-gray-200 rounded-lg overflow-hidden">
                {/* Red (spent portion within budget) */}
                <div
                  className="absolute top-0 left-0 h-full bg-red-500"
                  style={{ width: `${spentPercent}%` }}
                ></div>

                {/* Black (overbudget portion) */}
                {isOver && (
                  <div
                    className="absolute top-0 left-full h-full bg-black"
                    style={{ width: `${overPercent}%` }}
                  ></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyGoals;
