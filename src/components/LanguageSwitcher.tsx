
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Language = 'ru' | 'sr';

export const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState<Language>('ru');
  const { toast } = useToast();

  const handleLanguageSwitch = () => {
    const newLang = currentLang === 'ru' ? 'sr' : 'ru';
    setCurrentLang(newLang);
    
    toast({
      title: newLang === 'ru' ? "Язык изменен" : "Језик је промењен",
      description: newLang === 'ru' ? "Русский язык активирован" : "Српски језик је активиран",
      duration: 2000,
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative w-10 h-10 rounded-full"
      onClick={handleLanguageSwitch}
      aria-label={currentLang === 'ru' ? "Переключить на сербский" : "Промените на руски"}
    >
      <div className="flex">
        {/* Left hand (Serbian colors) */}
        <div className="w-5 h-5 relative">
          <div className="absolute top-0 h-1/3 w-full bg-blue-600"></div>
          <div className="absolute top-1/3 h-1/3 w-full bg-white"></div>
          <div className="absolute top-2/3 h-1/3 w-full bg-red-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs">✋</span>
          </div>
        </div>

        {/* Right hand (Russian colors) */}
        <div className="w-5 h-5 relative">
          <div className="absolute top-0 h-1/3 w-full bg-white"></div>
          <div className="absolute top-1/3 h-1/3 w-full bg-blue-600"></div>
          <div className="absolute top-2/3 h-1/3 w-full bg-red-600"></div>
          <div className="absolute inset-0 flex items-center justify-center transform scale-x-[-1]">
            <span className="text-xs">✋</span>
          </div>
        </div>
      </div>
    </Button>
  );
};

export default LanguageSwitcher;
