'use client';
import { useState, useEffect } from 'react';

export default function CreditScoreCard({ goalMet = true , onScoreChange}) {
  const [score, setScore] = useState(290); //HARDCODED CHANGE LATER!

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (onScoreChange) onScoreChange(score);
  }, [score, onScoreChange]);

  useEffect(() => {
    async function fetchScore() {
      setLoading(true);
      try {
        // Call dummy backend endpoint
        const res = await fetch('http://localhost:8000/api/compute_credit_score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ goalMet })
        });
        const data = await res.json();
        setScore(data.score); // backend returns {score: number}
        if (onScoreChange) {
            onScoreChange(data.score);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    fetchScore();
  }, [goalMet, onScoreChange]);


  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <div>
            <h2 className="text-lg font-semibold text-gray-800">Your simulated credit score.</h2>
        </div>
        <div className="text-4xl font-bold text-green-700">
            {score}
        </div>
      </div>

      {/* Message */}
      <p className="text-gray-600 text-xs">
        {loading
          ? 'Calculating your score...'
          : score > 670
          ? 'Great! You’re on track. Piggy is proud of you!'
          : score > 580
          ? 'Good progress! Piggie likes it. Keep it up.'
          : 'Let’s click on Pigge to improve your habits to raise your score.'}
      </p>
    </div>
  );
}
