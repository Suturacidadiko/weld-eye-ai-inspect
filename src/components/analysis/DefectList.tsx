
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Defect {
  id: string;
  x: number;
  y: number;
  type: 'crack' | 'pore' | 'incomplete';
  size: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

interface DefectListProps {
  defects: Defect[];
  selectedDefect: Defect | null;
  onDefectSelect: (defect: Defect) => void;
  isAnalyzing: boolean;
}

const defectTypeMap = {
  'pore': 'Пора',
  'crack': 'Трещина',
  'incomplete': 'Непровар'
};

export const DefectList: React.FC<DefectListProps> = ({ 
  defects, 
  selectedDefect, 
  onDefectSelect,
  isAnalyzing
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
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Обнаруженные дефекты</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-auto max-h-[calc(60vh-80px)]">
        {defects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {isAnalyzing ? 'Идет анализ...' : 'Дефектов не обнаружено'}
          </div>
        ) : (
          defects.map((defect) => (
            <div 
              key={defect.id}
              className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${
                selectedDefect?.id === defect.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => onDefectSelect(defect)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium flex items-center">
                  <div className={`w-3 h-3 rounded-full ${getSeverityColor(defect.severity)} mr-2`}></div>
                  {defectTypeMap[defect.type as keyof typeof defectTypeMap]}
                </div>
                <div className="text-sm bg-gray-100 px-2 py-0.5 rounded">
                  {defect.size.toFixed(1)} мм
                </div>
              </div>
              <p className="text-sm text-gray-600">{defect.description}</p>
              <div className="mt-1 text-xs text-gray-500">
                Координаты: X: {defect.x.toFixed(1)}%, Y: {defect.y.toFixed(1)}%
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default DefectList;
