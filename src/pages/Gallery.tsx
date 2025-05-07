
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/ImageUpload";
import ImageAnalysis from "@/components/ImageAnalysis";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (file: File, previewUrl: string) => {
    setCurrentImage(previewUrl);
    setUploadedFile(file);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/">
          <Button variant="ghost" size="icon" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Галерея снимков</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-medium mb-4">Загрузка снимка</h2>
            <ImageUpload onImageUpload={handleImageUpload} />
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Последние снимки</h3>
              <div className="grid grid-cols-2 gap-2">
                {/* Demo images */}
                <div 
                  className="aspect-square bg-gray-200 rounded cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setCurrentImage('/sample-weld-1.jpg')}
                >
                  <img 
                    src="/sample-weld-1.jpg" 
                    alt="Снимок 1"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div 
                  className="aspect-square bg-gray-200 rounded cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setCurrentImage('/sample-weld-2.jpg')}
                >
                  <img 
                    src="/sample-weld-2.jpg" 
                    alt="Снимок 2"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 h-full">
            <h2 className="text-lg font-medium mb-4">Анализ снимка</h2>
            <ImageAnalysis 
              imageUrl={currentImage || ''} 
              onAnalysisComplete={(defects) => {
                console.log("Analysis completed", defects);
                // If critical defects found
                if (defects.some(d => d.type === 'crack')) {
                  toast({
                    variant: "destructive",
                    title: "Обнаружены критические дефекты!",
                    description: "Необходима срочная проверка специалистом",
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
