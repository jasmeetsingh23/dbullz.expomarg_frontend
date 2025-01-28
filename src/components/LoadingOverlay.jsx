import React from "react";

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin" />
        <p className="text-lg font-semibold text-gray-700">Uploading...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
