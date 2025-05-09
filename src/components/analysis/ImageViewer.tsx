
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Play } from "lucide-react";
import ScanningAnimation from "../ScanningAnimation";

interface Defect {
  id: string;
  x: number;
  y: number;
  type: 'crack' | 'pore' | 'incomplete';
  size: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

interface ImageViewerProps {
  currentImage: string | null;
  isAnalyzing: boolean;
  defects: Defect[];
  selectedDefect: Defect | null;
  onDefectSelect: (defect: Defect) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onToggleLabels: () => void;
  onStartAnalysis: () => void;
  zoomLevel: number;
  showLabels: boolean;
}

const defectTypeMap = {
  'pore': 'Пора',
  'crack': 'Трещина',
  'incomplete': 'Непровар'
};

export const ImageViewer: React.FC<ImageViewerProps> = ({ 
  currentImage,
  isAnalyzing,
  defects,
  selectedDefect,
  onDefectSelect,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleLabels,
  onStartAnalysis,
  zoomLevel,
  showLabels
}) => {

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-center">
          <CardTitle>Рентгенограмма</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={onZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">{Math.round(zoomLevel * 100)}%</span>
            <Button variant="outline" size="icon" onClick={onZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onResetZoom}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onToggleLabels}>
              {showLabels ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative">
        <div className="relative w-full h-[60vh] overflow-hidden">
          {isAnalyzing && <ScanningAnimation isScanning={true} />}
          
          {currentImage && (
            <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }} className="transition-transform duration-200 h-full w-full">
              <img
                src={currentImage}
                alt="Рентгенограмма сварного шва"
                className="w-full h-full object-contain"
              />
              
              {!isAnalyzing && defects.map((defect) => (
                <div
                  key={defect.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    selectedDefect?.id === defect.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{ left: `${defect.x}%`, top: `${defect.y}%` }}
                  onClick={() => onDefectSelect(defect)}
                >
                  <div className={`${getSeverityColor(defect.severity)} rounded-full animate-pulse-slow`} style={{ 
                    width: `${defect.size * 15}px`, 
                    height: `${defect.size * 15}px`,
                    opacity: 0.6
                  }}>
                    <span className="absolute animate-spark bg-white rounded-full" style={{ 
                      width: `${defect.size * 6}px`, 
                      height: `${defect.size * 6}px`,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}></span>
                  </div>
                  
                  {showLabels && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {defectTypeMap[defect.type as keyof typeof defectTypeMap]} ({defect.size.toFixed(1)} мм)
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {!currentImage && (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Выберите изображение для анализа</p>
            </div>
          )}
        </div>
        
        {currentImage && !isAnalyzing && !defects.length && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              size="lg" 
              onClick={onStartAnalysis}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play className="mr-2 h-5 w-5" />
              Запустить анализ
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageViewer;
