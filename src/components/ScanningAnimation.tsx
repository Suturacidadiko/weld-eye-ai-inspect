
import React from 'react';

interface ScanningAnimationProps {
  isScanning: boolean;
}

export const ScanningAnimation: React.FC<ScanningAnimationProps> = ({ isScanning }) => {
  if (!isScanning) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Horizontal scanning line */}
      <div className="w-full h-1.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 opacity-80 animate-scanning"></div>
      
      {/* Vertical scanning line */}
      <div className="h-full w-1.5 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-400 opacity-80 absolute left-0 top-0 animate-scanning-vertical"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Central text */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="bg-black bg-opacity-50 px-4 py-2 rounded-lg">
          <div className="text-blue-400 font-mono text-sm animate-pulse-slow flex items-center">
            <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Сканирование...
          </div>
        </div>
      </div>
      
      {/* Corner indicators */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500"></div>
    </div>
  );
};

export default ScanningAnimation;
