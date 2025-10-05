'use client';
import { useState } from 'react';
import MonthlyGraph from './components/MonthlyGraph';
import Streak from './components/Streak';
import History from './components/History';
import IphoneFrame from './components/IphoneFrame';
import Budgeting from './components/Budgeting';
import Chatbot from './components/Chatbot';
import CreditScoreCard from './components/CreditScoreCard';
import Image from 'next/image';

export default function Home() {
  const streakCount = 4;
  const [showHistory, setShowHistory] = useState(false);
  const [showBudgeting, setShowBudgeting] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [creditScore, setCreditScore] = useState(null);

  const pigImage =
    creditScore !== null
      ? creditScore > 670
        ? '/happy_pig.jpeg'
        : '/normal_pig.jpeg'
      : '/normal_pig.jpeg'; // fallback before score loads

  return (
    <>
      {!showHistory && !showBudgeting && !showChatbot ? (
        // Main app view inside iPhone frame
        <div className="flex flex-col h-full w-full bg-white">
          {/* Top Bar */}
          <header className="w-full p-4 bg-gradient-to-r from-green-800 to-green-800 text-white text-center text-2xl shadow-md">
            PennyWiser
          </header>

          <CreditScoreCard goalMet={true} onScoreChange={setCreditScore}/>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center gap-6">

              <div className="w-full max-w-sm">
                <MonthlyGraph />
              </div>

              <div className="mt-6 w-full flex items-center justify-between max-w-md">
                {/* Left column: lowkey buttons */}
                <div className="flex flex-col gap-2">
                  <button
                      className="px-4 py-2 bg-green-100 text-green-800 text-left text-sm font-medium rounded-md hover:bg-green-200 transition"
                      onClick={() => setShowBudgeting(true)}
                    >
                    Set Budgets
                  </button>

                  <button
                    className="px-4 py-2 bg-green-100 text-green-800 text-left text-sm font-medium rounded-md hover:bg-green-200 transition"
                    onClick={() => setShowHistory(true)}
                  >
                    See Transaction History
                  </button>

                </div>
                {/* Right column: pig button */}
                <button
                  className="focus:outline-none hover:scale-105 transition-transform"
                  onClick={() => setShowChatbot(true)}
                >
                  <Image
                    src={pigImage}
                    alt="Chatbot Pig"
                    width={100}
                    height={100}
                    className=""
                  />
                </button>
              </div>
          </main>
        </div>
      ) : showHistory ? (
        // Full-page transaction history inside iPhone frame
        <History onClose={() => setShowHistory(false)} />
      ) : showBudgeting ? (
        // Full-page budgeting component inside iPhone frame
        <Budgeting onClose={() => setShowBudgeting(false)} />
      ) : (
        <Chatbot onClose={() => setShowChatbot(false)} />
      )}

    </>
  );
}
