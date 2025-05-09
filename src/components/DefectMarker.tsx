
import React from 'react';
import { Defect } from '../types/analysis';

interface DefectMarkerProps {
  x: number;
  y: number;
  type: Defect['type'];
  size: number;
  onClick?: () => void;
}

export const DefectMarker: React.FC<DefectMarkerProps> = ({ 
  x, 
  y, 
  type, 
  size,
  onClick 
}) => {
  const getDefectColor = () => {
    switch (type) {
      case 'crack':
        return 'bg-red-500';
      case 'pore':
        return 'bg-yellow-500';
      case 'incomplete':
        return 'bg-orange-500';
      default:
        return 'bg-red-500';
    }
  };

  const getDefectLabel = () => {
    switch (type) {
      case 'crack':
        return 'Трещина';
      case 'pore':
        return 'Пора';
      case 'incomplete':
        return 'Непровар';
      default:
        return 'Дефект';
    }
  };
  
  return (
    <div 
      className="absolute group cursor-pointer"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`, 
        transform: 'translate(-50%, -50%)' 
      }}
      onClick={onClick}
    >
      <div className={`${getDefectColor()} rounded-full animate-pulse-slow`} style={{ 
        width: `${size * 20}px`, 
        height: `${size * 20}px`,
        opacity: 0.6
      }}>
        <span className="absolute animate-spark bg-white rounded-full" style={{ 
          width: `${size * 8}px`, 
          height: `${size * 8}px`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}></span>
      </div>
      <div className="hidden group-hover:flex bg-black bg-opacity-75 text-white text-xs p-1 rounded absolute top-full left-1/2 transform -translate-x-1/2 z-10 whitespace-nowrap">
        {getDefectLabel()} ({size.toFixed(1)} мм)
      </div>
    </div>
  );
};

export default DefectMarker;
