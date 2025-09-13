import React from 'react';
import { Cloud } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="glass-card rounded-2xl p-8 max-w-md animate-fade-in">
      <div className="text-center relative">
        <Cloud className="w-16 h-16 text-white/60 mx-auto animate-pulse" />
        <div className="absolute inset-0 animate-pulse-glow rounded-full"></div>
        <p className="text-white font-medium mt-4">Fetching weather data...</p>
        <p className="text-white/60 text-sm mt-1">Please wait a moment</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
