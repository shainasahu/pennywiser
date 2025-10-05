"use client";
import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
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
  // Carousel slides (match files in public/)
  const slides = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg", "/slide4.jpg"];
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Ensure carousel always starts at the first slide when opened
  useEffect(() => {
    if (showVideo) setCurrentSlide(0);
  }, [showVideo]);

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
      {showVideo && typeof document !== 'undefined' && (() => {
        const modalRoot = document.getElementById('iphone-modal-root');
        if (!modalRoot) return null;

        return createPortal(
          <div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto"
            onClick={closeVideo}
          >
            <div
              className="relative w-11/12 max-w-3xl bg-white rounded-lg overflow-hidden shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideo}
                className="absolute top-3 right-3 z-20 px-3 py-1 bg-black/60 text-white rounded"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Slide Display (overlay panel centered) */}
              <div className="flex items-center justify-center w-full p-4 relative">
                <img
                  src={slides[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-full max-h-[78vh] object-cover transform scale-105"
                />
                {/* If we're on the 4th slide (index 3), show a Set Budget button in the empty area */}
                {currentSlide === 3 && (
                  <div className="absolute left-0 right-0 bottom-6 flex justify-center pointer-events-none">
                    <button
                      onClick={() => {
                          // close modal then lead to the actual Set Budgets button on the page
                          setShowVideo(false);
                          if (typeof window !== 'undefined') {
                            // small delay to ensure modal has closed and button is visible
                            setTimeout(() => {
                              const btn = document.getElementById('set-budgets-btn');
                              if (btn) {
                                try {
                                  btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  btn.focus({ preventScroll: true });
                                  // trigger click on the real button to open budgeting
                                  btn.click();
                                  return;
                                } catch (e) {
                                  // fallthrough to hash fallback
                                }
                              }
                              // fallback: set hash to trigger the page listener
                              window.location.hash = '#set-budgets';
                            }, 120);
                          }
                        }}
                      className="pointer-events-auto px-4 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-600 transition"
                    >
                      Set Budget
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation Controls: Prev disabled on first slide; Next disabled on last slide */}
              <div className="absolute inset-0 flex justify-between items-center px-6 pointer-events-none">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? 0 : prev - 1))}
                  aria-label="Previous slide"
                  className={`pointer-events-auto bg-black/50 text-white p-2 rounded-full hover:bg-black transform transition-transform duration-150 hover:scale-110 hover:-translate-x-1 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm ${
                    currentSlide === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-100'
                  }`}
                  aria-disabled={currentSlide === 0}
                >
                  ◀
                </button>

                <button
                  onClick={() => {
                    if (currentSlide === slides.length - 1) {
                      // last slide: disabled
                      return;
                    }
                    setCurrentSlide((prev) => prev + 1);
                  }}
                  aria-label="Next slide"
                  className={`pointer-events-auto bg-black/50 text-white p-2 rounded-full hover:bg-black transform transition-transform duration-150 hover:scale-110 hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm ${
                    currentSlide === slides.length - 1 ? 'opacity-40 cursor-not-allowed' : 'opacity-100'
                  }`}
                  aria-disabled={currentSlide === slides.length - 1}
                >
                  ▶
                </button>
              </div>
            </div>
          </div>,
          modalRoot
        );
      })()}

    </div>
  );
};

export default MonthlyGoals;
