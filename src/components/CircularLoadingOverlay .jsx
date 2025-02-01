import React from "react";

const CircularLoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-20 h-20">
        {/* Outer static circle */}
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>

        {/* Inner rotating circle */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full border-4 border-blue-600 rounded-full animate-spin"
            style={{
              borderTopColor: "transparent",
              borderLeftColor: "transparent",
            }}
          ></div>
        </div>

        {/* Loading text below the circle */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <span className="text-white font-medium">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default CircularLoadingOverlay;
