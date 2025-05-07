
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  onImageUpload: (file: File, previewUrl: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    processFile(files[0]);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };
  
  const processFile = (file: File) => {
    // Check if file is an image
    if (!file.type.includes('image/')) {
      toast({
        variant: "destructive",
        title: "Неподдерживаемый формат",
        description: "Пожалуйста, загрузите изображение в формате JPEG или PNG"
      });
      return;
    }
    
    // Create blob URL
    const previewUrl = URL.createObjectURL(file);
    
    // Pass to parent component
    onImageUpload(file, previewUrl);
    
    toast({
      title: "Изображение загружено",
      description: `${file.name} готово к анализу`
    });
  };
  
  return (
    <div
      className={`w-full p-6 border-2 border-dashed rounded-lg transition-colors ${
        isDragging ? 'bg-blue-100 border-blue-400' : 'bg-gray-50 border-gray-300'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <Upload className="h-10 w-10 text-blue-500" />
        <div className="text-center">
          <p className="text-sm font-medium">
            Перетащите изображение сюда или нажмите для выбора
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Поддерживаются форматы JPEG и PNG
          </p>
        </div>
        <div className="flex gap-2">
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
          <Label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
          >
            Выбрать файл
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
