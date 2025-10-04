"use client"
import { useState } from "react";
import BarChart from "./components/BarChart";
import MonthlyGraph from "./components/MonthlyGraph";
import Streak from "./components/Streak";
import History from "./components/History";
import IphoneFrame from "./components/IphoneFrame";
import Budgeting from "./components/Budgeting";
import Chatbot from './components/Chatbot';

export default function Home() {
  const streakCount = 4; 
  const [showHistory, setShowHistory] = useState(false);
  const [showBudgeting, setShowBudgeting] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);


  return (
    <>
      {!showHistory && !showBudgeting && !showChatbot ? (
        // Main app view inside iPhone frame
          <div className="flex flex-col h-full w-full bg-white">
            {/* Top Bar */}
            <header className="w-full p-4 bg-gradient-to-r from-green-800 to-green-800 text-white text-center font-bold text-2xl shadow-md">
              PennyWiser
            </header>

            <Streak streakCount={streakCount} />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center gap-6">

              <div className="w-full max-w-sm">
                <MonthlyGraph />
              </div>
              {/* See History Button */}
              <button
                className="mt-4 px-6 py-2 bg-green-800 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
                onClick={() => setShowHistory(true)}
              >
                See Transaction History
              </button>

              {/* Budgeting Button */}
              <button
                className="mt-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-500 transition"
                onClick={() => setShowBudgeting(true)}
              >
                Set Budgets
              </button>

              <button
                className="mt-2 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-400 transition"
                onClick={() => setShowChatbot(true)}
              >
                Open Chatbot
              </button>

            </main>
          </div>
      ) : showHistory ? (
        // Full-page transaction history inside iPhone frame
        <History onClose={() => setShowHistory(false)} />
      ) : showBudgeting ? (
        // Full-page budgeting component inside iPhone frame
        <Budgeting onClose={() => setShowBudgeting(false)}/>
      ) : (
        <Chatbot onClose={() => setShowChatbot(false)} />
      )}
    </>
  );
}