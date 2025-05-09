
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";
import { Defect } from "../types/analysis";
import DefectList from "../components/analysis/DefectList";
import DefectEditor from "../components/analysis/DefectEditor";
import ImageViewer from "../components/analysis/ImageViewer";

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
    
    // Имитация процесса анализа
    setTimeout(() => {
      const simulatedDefects: Defect[] = [
        {
          id: '1',
          x: 30,
          y: 45,
          type: 'crack',
          size: 1.8,
          description: 'Трещина сварного шва',
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
          description: 'Непровар соединения',
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
      description: "Отчет создан и сохранен",
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

  const handleDefectChange = (updatedDefect: Defect) => {
    setSelectedDefect(updatedDefect);
  };

  const handleDefectSave = (defect: Defect) => {
    setDefects(defects.map(d => d.id === defect.id ? defect : d));
    toast({
      title: "Изменения сохранены",
      description: "Данные о дефекте обновлены"
    });
  };

  const handleDefectDelete = (id: string) => {
    setDefects(defects.filter(d => d.id !== id));
    setSelectedDefect(null);
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
          <ImageViewer 
            currentImage={currentImage}
            isAnalyzing={isAnalyzing}
            defects={defects}
            selectedDefect={selectedDefect}
            onDefectSelect={handleDefectSelect}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={() => setZoomLevel(1)}
            onToggleLabels={() => setShowLabels(!showLabels)}
            onStartAnalysis={handleStartAnalysis}
            zoomLevel={zoomLevel}
            showLabels={showLabels}
          />
        </div>
        
        <div className="lg:col-span-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="view">Результаты</TabsTrigger>
              <TabsTrigger value="edit">Редактирование</TabsTrigger>
            </TabsList>
            
            <TabsContent value="view" className="h-[calc(100%-56px)]">
              <DefectList
                defects={defects}
                selectedDefect={selectedDefect}
                onDefectSelect={handleDefectSelect}
                isAnalyzing={isAnalyzing}
              />
            </TabsContent>
            
            <TabsContent value="edit" className="h-[calc(100%-56px)]">
              <DefectEditor
                selectedDefect={selectedDefect}
                onDefectChange={handleDefectChange}
                onDefectDelete={handleDefectDelete}
                onDefectAdd={handleAddDefect}
                onDefectSave={handleDefectSave}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
