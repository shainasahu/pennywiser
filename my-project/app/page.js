import BarChart from "./components/BarChart";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Top Bar */}
      <header className="w-full p-4 bg-gradient-to-r from-green-800 to-green-800 text-white text-center font-bold text-2xl shadow-md">
        PennyWiser
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
        {/* Placeholder text or intro */}
        <p className="text-gray-600 mb-4 text-center">
          Welcome back! Here’s your spending snapshot 📊
        </p>

        {/* Bar Chart Component */}
        <div className="w-full max-w-sm">
          <BarChart />
        </div>
      </main>
    </div>
  );
}