import React, { useState, useEffect } from 'react';

const LoadingOverlay = ({ isLoading }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowOverlay(true); // Show the overlay immediately
    } else {
      const timer = setTimeout(() => setShowOverlay(false), 300); // Delay hiding for the fade-out effect
      return () => clearTimeout(timer); // Cleanup timeout on unmount or isLoading change
    }
  }, [isLoading]);

  return (
    showOverlay && (
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] transition-opacity duration-300 ${
          isLoading ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex gap-2 text-white text-4xl">
          <span className="animate-bounce">.</span>
          <span className="animate-bounce [animation-delay:0.2s]">.</span>
          <span className="animate-bounce [animation-delay:0.4s]">.</span>
        </div>
      </div>
    )
  );
};

export default LoadingOverlay;