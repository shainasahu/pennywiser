export default function Streak({ streakCount = 5 }) {
    // You can adjust this max value for a week, month, etc.
    const goal = 7;
    const progress = Math.min((streakCount / goal) * 100, 100);
  
    return (
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Streak Tracker
          </h2>
          <span className="text-sm text-gray-500">
            {streakCount} / {goal} montths
          </span>
        </div>
  
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
          <div
            className="bg-gradient-to-r from-green-600 to-blue-700 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
  
        {/* Message */}
        <p className="text-gray-600 text-sm">
          {streakCount === 0
            ? "Let's start your first streak today!"
            : streakCount < goal
            ? `Nice! You’ve kept your streak for ${streakCount} months. Keep it up! `
            : "Amazing! You've hit your 7-day streak goal!"}
        </p>
      </div>
    );
  }  