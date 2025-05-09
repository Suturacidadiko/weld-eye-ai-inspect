
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Save, Play, Edit, Layers, Eye, EyeOff, 
  ZoomIn, ZoomOut, RotateCcw, CircleCheck, 
  CircleX, Plus, Minus 
} from "lucide-react";
import ImageAnalysis from "../components/ImageAnalysis";
import ScanningAnimation from "../components/ScanningAnimation";

interface Defect {
  id: string;
  x: number;
  y: number;
  type: 'crack' | 'pore' | 'incomplete';
  size: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

const defectTypeMap = {
  'pore': 'Одиночная пора',
  'crack': 'Трещина',
  'incomplete': 'Непровар'
};

const Analysis = () => {
  const [currentImage, setCurrentImage] = useState<string | null>('/sample-weld-1.jpg');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [defects, setDefects] = useState<Defect[]>([]);
  const [selectedDefect, setSelectedDefect] = useState<Defect | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState("view");
  const { toast } = useToast();

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setDefects([]);
    
    // Simulate analysis process
    setTimeout(() => {
      const simulatedDefects: Defect[] = [
        {
          id: '1',
          x: 30,
          y: 45,
          type: 'crack',
          size: 1.8,
          description: 'Продольная трещина сварного шва',
          severity: 'high'
        },
        {
          id: '2',
          x: 65,
          y: 30,
          type: 'pore',
          size: 0.9,
          description: 'Газовая пора',
          severity: 'medium'
        },
        {
          id: '3',
          x: 80,
          y: 60,
          type: 'incomplete',
          size: 2.1,
          description: 'Непровар кромки соединения',
          severity: 'high'
        }
      ];
      
      setDefects(simulatedDefects);
      setIsAnalyzing(false);
      
      toast({
        title: "Анализ завершен",
        description: `Обнаружено дефектов: ${simulatedDefects.length}`,
      });
    }, 3000);
  };

  const handleSaveResults = () => {
    toast({
      title: "Результаты сохранены",
      description: "Отчет создан и сохранен в базе данных",
    });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleDefectSelect = (defect: Defect) => {
    setSelectedDefect(defect);
  };

  const handleAddDefect = () => {
    const newDefect: Defect = {
      id: `new-${Date.now()}`,
      x: 50,
      y: 50,
      type: 'pore',
      size: 1.0,
      description: 'Новый дефект',
      severity: 'medium'
    };
    
    setDefects(prev => [...prev, newDefect]);
    setSelectedDefect(newDefect);
    setActiveTab("edit");
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Анализ рентгенограмм</h1>
        <div className="flex gap-2">
          <Button onClick={handleSaveResults} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Сохранить результаты
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-center">
                <CardTitle>Рентгенограмма</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">{Math.round(zoomLevel * 100)}%</span>
                  <Button variant="outline" size="icon" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setZoomLevel(1)}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setShowLabels(!showLabels)}>
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
                        onClick={() => handleDefectSelect(defect)}
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
                    onClick={handleStartAnalysis}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Запустить анализ
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="view">Результаты</TabsTrigger>
              <TabsTrigger value="edit">Редактирование</TabsTrigger>
            </TabsList>
            
            <TabsContent value="view" className="h-[calc(100%-56px)]">
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
                        onClick={() => handleDefectSelect(defect)}
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
            </TabsContent>
            
            <TabsContent value="edit" className="h-[calc(100%-56px)]">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Правка разметки</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleAddDefect}>
                      <Plus className="h-4 w-4 mr-1" />
                      Добавить
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedDefect ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Тип дефекта</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={selectedDefect.type}
                          onChange={(e) => setSelectedDefect({...selectedDefect, type: e.target.value as any})}
                        >
                          <option value="pore">Одиночная пора</option>
                          <option value="crack">Трещина</option>
                          <option value="incomplete">Непровар</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Размер (мм)</label>
                        <input 
                          type="number" 
                          className="w-full p-2 border rounded-md"
                          value={selectedDefect.size}
                          onChange={(e) => setSelectedDefect({...selectedDefect, size: parseFloat(e.target.value)})}
                          step="0.1"
                          min="0.1"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Критичность</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={selectedDefect.severity}
                          onChange={(e) => setSelectedDefect({...selectedDefect, severity: e.target.value as any})}
                        >
                          <option value="low">Низкая</option>
                          <option value="medium">Средняя</option>
                          <option value="high">Высокая</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Описание</label>
                        <textarea 
                          className="w-full p-2 border rounded-md"
                          value={selectedDefect.description}
                          onChange={(e) => setSelectedDefect({...selectedDefect, description: e.target.value})}
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex justify-between pt-4">
                        <Button 
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setDefects(defects.filter(d => d.id !== selectedDefect.id));
                            setSelectedDefect(null);
                          }}
                        >
                          <Minus className="h-4 w-4 mr-1" />
                          Удалить
                        </Button>
                        
                        <Button 
                          variant="default"
                          size="sm"
                          onClick={() => {
                            setDefects(defects.map(d => d.id === selectedDefect.id ? selectedDefect : d));
                            toast({
                              title: "Изменения сохранены",
                              description: "Данные о дефекте обновлены"
                            });
                          }}
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Применить
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[calc(60vh-150px)] text-center">
                      <Edit className="h-12 w-12 text-gray-300 mb-2" />
                      <p className="text-gray-500">Выберите дефект для редактирования или добавьте новый</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
