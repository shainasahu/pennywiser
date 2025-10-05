"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/** @typedef {{name:string,budget:number,spent:number}} Category */

const MonthlyGoals = () => {
  /** @type {Category[]} */
  const [categories, setCategories] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [viewMode, setViewMode] = useState("goals"); // 'goals' | 'progress'
  const [animatedWidths, setAnimatedWidths] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setAnimatedWidths(data.map(() => 0)); // Initialize animation widths to 0
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Animate bars when switching to 'goals' view
  useEffect(() => {
    if (viewMode === "goals" && categories.length > 0) {
      // reset animated widths first
      setAnimatedWidths(categories.map(() => 0));
  
      const timeouts = categories.map((cat, idx) => {
        const finalWidth = Math.min((cat.spent / cat.budget) * 100, 100);
        return setTimeout(() => {
          setAnimatedWidths((prev) => {
            const newWidths = [...prev];
            newWidths[idx] = finalWidth;
            return newWidths;
          });
        }, idx * 100); // stagger animation by 100ms per bar
      });
      return () => timeouts.forEach((t) => clearTimeout(t));
    }
  }, [viewMode, categories]);
  
  const closeVideo = () => {
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } catch {}
    }
    setShowVideo(false);
  };

  // Hardcoded credit score trend data
  const creditScoreData = [
    { month: "May", score: 500 },
    { month: "Jun", score: 540 },
    { month: "Jul", score: 540 },
    { month: "Aug", score: 550 },
    { month: "Sep", score: 580 },
    { month: "Oct", score: 580 },
  ];

  return (
    <div className="p-1 bg-white rounded-2xl shadow-md w-full max-w-2xl relative">
      <div>
        <button
          onClick={() => setShowVideo(true)}
          className="px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-md hover:bg-green-200 transition"
        >
          🔔 Your Monthly Recap is Ready!
        </button>
      </div>
      <br />

      {/* Header with Toggle Buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("progress")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              viewMode === "progress"
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Credit Progress
          </button>

          <button
            onClick={() => setViewMode("goals")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              viewMode === "goals"
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Monthly Goals
          </button>
        </div>
      </div>

      {/* Conditional Rendering */}
      {viewMode === "progress" ? (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={creditScoreData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[580, 700]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#15803d"
                strokeWidth={2}
                dot={{ r: 4, fill: "#15803d" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((cat, idx) => {
            const isOver = cat.spent > cat.budget;
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
                  <div
                    className="absolute top-0 left-0 h-full bg-green-700 transition-all duration-700 ease-out"
                    style={{ width: `${animatedWidths[idx]}%` }}
                  ></div>
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
      )}

      {/* Video Modal */}
      {showVideo && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={closeVideo}
        >
          <div
            className="relative w-11/12 max-w-[340px] bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute top-2 right-2 z-10 px-3 py-1 bg-black/60 text-white rounded"
            >
              Close
            </button>

            <video
              ref={videoRef}
              src="/videos/demo.mp4"
              controls
              autoPlay
              className="w-full h-auto bg-black"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyGoals;
