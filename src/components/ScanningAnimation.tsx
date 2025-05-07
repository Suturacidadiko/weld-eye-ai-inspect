
import React from 'react';

interface ScanningAnimationProps {
  isScanning: boolean;
}

export const ScanningAnimation: React.FC<ScanningAnimationProps> = ({ isScanning }) => {
  if (!isScanning) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="w-full h-1 bg-blue-500 opacity-70 animate-scanning"></div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="text-blue-500 font-mono text-sm animate-pulse-slow">
          Сканирование...
        </div>
      </div>
    </div>
  );
};

export default ScanningAnimation;
