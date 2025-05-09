
import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Image, Settings, BarChart2, Database, Search, HelpCircle } from "lucide-react";

type NavigationItem = {
  icon: React.ElementType;
  label: string;
  route: string;
  description: string;
};

const navigationItems: NavigationItem[] = [
  {
    icon: Image,
    label: 'Галерея',
    route: '/gallery',
    description: 'Загрузка и просмотр снимков'
  },
  {
    icon: Search,
    label: 'Анализ',
    route: '/analysis',
    description: 'Обработка и разметка дефектов'
  },
  {
    icon: FileText,
    label: 'Отчеты',
    route: '/reports',
    description: 'Результаты и документация'
  },
  {
    icon: BarChart2,
    label: 'Статистика',
    route: '/statistics',
    description: 'Аналитика проверок'
  },
  {
    icon: Database,
    label: 'База данных',
    route: '/database',
    description: 'Хранилище результатов'
  },
  {
    icon: Settings,
    label: 'Настройки',
    route: '/settings',
    description: 'Конфигурация системы'
  },
];

export const ModernNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  return (
    <div className={`flex flex-col bg-gray-900 text-white transition-all ${isExpanded ? 'w-64' : 'w-16'} h-screen sticky top-0`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        <div className={`flex items-center ${isExpanded ? '' : 'justify-center w-full'}`}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
              <line x1="9.69" y1="8" x2="21.17" y2="8" />
              <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
              <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
              <line x1="14.31" y1="16" x2="2.83" y2="16" />
              <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
            </svg>
          </div>
          {isExpanded && <h1 className="text-xl font-bold ml-3">WELD-EYE AI</h1>}
        </div>
        <button
          className={`text-gray-400 hover:text-white ${isExpanded ? '' : 'hidden'}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      <div className={`flex flex-col gap-1 p-2 flex-1 ${isExpanded ? '' : 'items-center'}`}>
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.route;
          return (
            <Link key={item.route} to={item.route} className="block">
              <div
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8">
                  <item.icon className="w-5 h-5" />
                </div>
                {isExpanded && (
                  <div className="ml-3">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-400">{item.description}</div>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {!isExpanded && (
        <button
          className="mx-auto mb-4 text-gray-400 hover:text-white"
          onClick={() => setIsExpanded(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      <div className="mt-auto p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          className={`w-full flex justify-start items-center text-gray-300 hover:text-white hover:bg-gray-800 ${isExpanded ? '' : 'justify-center'}`}
          size="sm"
        >
          <HelpCircle className="w-5 h-5" />
          {isExpanded && <span className="ml-2">Справка</span>}
        </Button>
      </div>
    </div>
  );
};

export default ModernNavigation;
