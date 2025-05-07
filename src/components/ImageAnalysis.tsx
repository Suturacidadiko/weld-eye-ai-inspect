
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ScanningAnimation from './ScanningAnimation';
import DefectMarker from './DefectMarker';

interface Defect {
  id: string;
  x: number;
  y: number;
  type: 'crack' | 'pore' | 'incomplete';
  size: number;
  description: string;
}

interface ImageAnalysisProps {
  imageUrl: string;
  onAnalysisComplete?: (defects: Defect[]) => void;
}

export const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ 
  imageUrl,
  onAnalysisComplete
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [defects, setDefects] = useState<Defect[]>([]);
  const [selectedDefect, setSelectedDefect] = useState<Defect | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toast } = useToast();

  // Simulated analysis process
  const startAnalysis = () => {
    setIsScanning(true);
    setDefects([]);
    setSelectedDefect(null);
    
    // Play scanning sound
    const audio = new Audio('/scan-sound.mp3');
    audio.play().catch(() => {
      console.log('Audio play failed. User interaction needed first.');
    });

    // Simulate delayed analysis with staged results
    setTimeout(() => {
      const simulatedDefects: Defect[] = [
        {
          id: '1',
          x: 30,
          y: 45,
          type: 'crack',
          size: 1.8,
          description: 'Продольная трещина сварного шва'
        },
        {
          id: '2',
          x: 65,
          y: 30,
          type: 'pore',
          size: 0.9,
          description: 'Газовая пора'
        },
        {
          id: '3',
          x: 80,
          y: 60,
          type: 'incomplete',
          size: 2.1,
          description: 'Непровар кромки соединения'
        }
      ];
      
      setDefects(simulatedDefects);
      setIsScanning(false);
      
      // Play alert sound if critical defects found
      if (simulatedDefects.some(d => d.type === 'crack')) {
        const alertAudio = new Audio('/alert-sound.mp3');
        alertAudio.play().catch(() => {
          console.log('Alert audio play failed.');
        });
      }
      
      // Notify about defects found
      toast({
        title: "Анализ завершен",
        description: `Обнаружено дефектов: ${simulatedDefects.length}`,
        variant: simulatedDefects.length > 0 ? "destructive" : "default",
      });
      
      if (onAnalysisComplete) {
        onAnalysisComplete(simulatedDefects);
      }
    }, 3000);
  };

  const handleDefectClick = (defect: Defect) => {
    setSelectedDefect(defect);
  };

  useEffect(() => {
    if (imageUrl && imageLoaded) {
      startAnalysis();
    }
  }, [imageUrl, imageLoaded]);

  return (
    <div className="w-full h-full relative">
      <Card className="w-full h-full overflow-hidden">
        <CardContent className="p-0 relative">
          {imageUrl ? (
            <div className="relative w-full h-[60vh]">
              <img
                src={imageUrl}
                alt="Рентгеновский снимок сварного шва"
                className="w-full h-full object-contain"
                onLoad={() => setImageLoaded(true)}
              />
              
              <ScanningAnimation isScanning={isScanning} />
              
              {defects.map((defect) => (
                <DefectMarker
                  key={defect.id}
                  x={defect.x}
                  y={defect.y}
                  type={defect.type}
                  size={defect.size}
                  onClick={() => handleDefectClick(defect)}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-[60vh] flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Загрузите изображение для анализа</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {selectedDefect && (
        <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">{selectedDefect.type === 'crack' ? 'Трещина' : selectedDefect.type === 'pore' ? 'Пора' : 'Непровар'}</h3>
          <div className="flex justify-between items-center">
            <p>{selectedDefect.description}</p>
            <div className="bg-red-500 px-2 py-1 rounded-full text-xs">
              {selectedDefect.size.toFixed(1)} мм
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 bg-transparent border-white text-white hover:bg-white hover:text-black"
            onClick={() => setSelectedDefect(null)}
          >
            Закрыть
          </Button>
        </div>
      )}
      
      {imageUrl && !isScanning && !defects.length && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white" 
            onClick={startAnalysis}
          >
            Начать анализ
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysis;
