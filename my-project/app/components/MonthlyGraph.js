'use client';
import React, { useEffect, useState, useRef } from 'react';

/** @typedef {{name:string,budget:number,spent:number}} Category */

const MonthlyGoals = () => {
  /** @type {Category[]} */
  const [categories, setCategories] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/categories') // Flask endpoint
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeVideo();
    };
    if (showVideo) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showVideo]);

  const closeVideo = () => {
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } catch (e) {}
    }
    setShowVideo(false);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Monthly Goals</h2>

        {/* Video button */}
        <button
          onClick={() => setShowVideo(true)}
          className="ml-4 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          aria-haspopup="dialog"
          aria-expanded={showVideo}
        >
          Watch Demo
        </button>
      </div>

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
                {/* Spent portion */}
                <div
                  className="absolute top-0 left-0 h-full bg-green-700"
                  style={{ width: `${spentPercent}%` }}
                ></div>

                {/* Overbudget portion */}
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

      {/* Video modal — changed to absolute so it stays inside the iPhone frame */}
      {showVideo && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={closeVideo}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-11/12 max-w-[340px] bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute top-2 right-2 z-10 px-3 py-1 bg-black/60 text-white rounded"
              aria-label="Close video"
            >
              Close
            </button>

            {/* Use public/videos/demo.mp4 or update src as needed */}
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
