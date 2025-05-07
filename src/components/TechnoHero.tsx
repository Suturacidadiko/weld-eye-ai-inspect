
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TechnoHeroProps {
  isDancing?: boolean;
}

export const TechnoHero: React.FC<TechnoHeroProps> = ({ isDancing = false }) => {
  return (
    <div className={`relative w-48 h-48 ${isDancing ? 'animate-dance' : 'animate-float'}`}>
      {/* Robot Body */}
      <div className="absolute w-32 h-40 bg-slate-800 rounded-lg top-8 left-8 flex flex-col items-center justify-center border-2 border-blue-500">
        {/* Robot Eye/Scanner */}
        <div className="w-24 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-2 animate-pulse-slow">
          <div className="w-20 h-4 bg-white rounded-full relative overflow-hidden">
            <div className="absolute left-0 top-0 w-full h-full bg-blue-400 opacity-50 animate-scanning"></div>
          </div>
        </div>
        
        {/* Robot Face */}
        <div className="w-16 h-8 bg-slate-700 rounded-lg flex justify-around items-center">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        
        {/* Robot Chest Panel */}
        <div className="w-20 h-12 bg-slate-700 rounded-md mt-4 flex flex-col items-center justify-center">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </div>
          <div className="w-12 h-1 bg-blue-400 mt-2 rounded-full"></div>
          <div className="w-10 h-1 bg-blue-400 mt-1 rounded-full"></div>
        </div>
      </div>
      
      {/* Robot Arms */}
      <div className="absolute w-6 h-20 bg-slate-600 rounded-full left-3 top-16 flex items-center justify-center">
        <div className="w-4 h-4 bg-slate-800 rounded-full"></div>
      </div>
      <div className="absolute w-6 h-20 bg-slate-600 rounded-full right-3 top-16 flex items-center justify-center">
        <div className="w-4 h-4 bg-slate-800 rounded-full"></div>
      </div>
      
      {/* Scanner Device in hand */}
      <div className="absolute w-10 h-16 bg-slate-700 rounded-md left-1 top-8 border border-blue-400 flex items-center justify-center">
        <div className="w-6 h-8 bg-red-500 rounded-md animate-pulse-slow"></div>
      </div>
      
      {/* Robot Legs */}
      <div className="absolute w-8 h-12 bg-slate-600 rounded-md left-16 bottom-0"></div>
      <div className="absolute w-8 h-12 bg-slate-600 rounded-md right-16 bottom-0"></div>
    </div>
  );
};

export default TechnoHero;
