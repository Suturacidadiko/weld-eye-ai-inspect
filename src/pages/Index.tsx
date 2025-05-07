
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Upload } from "lucide-react";
import TechnoHero from '@/components/TechnoHero';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import NavigationMenu from '@/components/NavigationMenu';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [activeDemonstration, setActiveDemonstration] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [isDancing, setIsDancing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const startDemonstration = () => {
    setActiveDemonstration(true);
    setDemoStep(1);
    
    // Simulating the scan process
    setTimeout(() => {
      setDemoStep(2);
      
      // Simulating defects found
      setTimeout(() => {
        setDemoStep(3);
        setIsDancing(true);
        
        toast({
          title: "Анализ завершен!",
          description: "Обнаружено 2 дефекта сварного шва",
          variant: "destructive",
        });
      }, 3000);
    }, 2000);
  };
  
  const goToGallery = () => {
    navigate('/gallery');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-sidebar p-4 text-white flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">WELD-EYE AI</h1>
        </div>
        <div className="flex items-center">
          <NavigationMenu />
          <LanguageSwitcher />
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row">
        {/* Left column - Hero Text */}
        <div className="w-full md:w-1/2 bg-sidebar text-white p-8 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ты готов к безупречной сварке?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Автоматизированный контроль сварных швов газопроводов с использованием искусственного интеллекта.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-medium">В 20 раз быстрее</h3>
                <p className="text-sm text-gray-300">Анализ сварных швов за секунды, а не часы</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🔍</span>
              </div>
              <div>
                <h3 className="text-xl font-medium">Точность 98.7%</h3>
                <p className="text-sm text-gray-300">Выявление даже мельчайших дефектов</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="text-xl font-medium">Детальные отчеты</h3>
                <p className="text-sm text-gray-300">Автоматическая классификация дефектов</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 space-x-4">
            <Button 
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={goToGallery}
            >
              Начать работу
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-sidebar"
              onClick={() => window.open('https://youtu.be/example', '_blank')}
            >
              Смотреть видео
            </Button>
          </div>
          
          <p className="text-sm text-gray-400 mt-6">
            «Дефекты не скроются — даже в самом прочном шве!»
          </p>
        </div>
        
        {/* Right column - Interactive Demo */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Интерактивная демонстрация
          </h2>
          
          <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col items-center">
            {!activeDemonstration ? (
              <>
                <TechnoHero />
                <p className="text-center mb-4 mt-4">
                  Загрузите тестовый снимок и получите анализ за 3 клика
                </p>
                <Button 
                  size="lg"
                  className="mt-2"
                  onClick={startDemonstration}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Запустить демо
                </Button>
              </>
            ) : (
              <div className="w-full">
                <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-4">
                  {/* Demo content changes based on step */}
                  {demoStep === 1 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-full h-1 bg-blue-500 absolute top-0 left-0 animate-scanning"></div>
                      <p className="text-blue-600 animate-pulse-slow">Сканирование снимка...</p>
                    </div>
                  )}
                  
                  {demoStep >= 2 && (
                    <div className="absolute inset-0">
                      <img 
                        src="/sample-weld-1.jpg" 
                        alt="Тестовый снимок" 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Defect Markers */}
                      {demoStep === 3 && (
                        <>
                          <div className="absolute w-6 h-6 bg-red-500 bg-opacity-70 rounded-full animate-pulse-slow" style={{top: '40%', left: '35%'}}>
                            <span className="absolute animate-spark bg-white rounded-full w-3 h-3 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                          </div>
                          <div className="absolute w-4 h-4 bg-yellow-500 bg-opacity-70 rounded-full animate-pulse-slow" style={{top: '60%', left: '70%'}}>
                            <span className="absolute animate-spark bg-white rounded-full w-2 h-2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${demoStep >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div className={`w-3 h-3 rounded-full ${demoStep >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div className={`w-3 h-3 rounded-full ${demoStep >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                  </div>
                  
                  <div>
                    {demoStep === 3 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setActiveDemonstration(false);
                          setDemoStep(0);
                          setIsDancing(false);
                        }}
                      >
                        Повторить
                      </Button>
                    )}
                  </div>
                </div>
                
                {demoStep === 3 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm">
                    <div className="font-medium text-red-700 mb-1">Обнаружены дефекты!</div>
                    <ul className="list-disc pl-4 text-red-800 space-y-1">
                      <li>Трещина (1.8 мм) - критический дефект</li>
                      <li>Пора (0.9 мм) - некритический дефект</li>
                    </ul>
                  </div>
                )}
                
                <div className="mt-4 flex justify-center">
                  <TechnoHero isDancing={isDancing} />
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center">
            <p className="mb-2">Готовы к полному анализу?</p>
            <Button onClick={goToGallery}>
              Перейти к загрузке снимков
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
