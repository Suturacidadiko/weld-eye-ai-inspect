
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Image, Settings } from "lucide-react";

type NavigationItem = {
  icon: React.ElementType;
  label: string;
  route: string;
};

const navigationItems: NavigationItem[] = [
  {
    icon: Image,
    label: 'Галерея',
    route: '/gallery',
  },
  {
    icon: FileText,
    label: 'Отчеты',
    route: '/reports',
  },
  {
    icon: Settings,
    label: 'Настройки',
    route: '/settings',
  },
];

export const NavigationMenu = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      {navigationItems.map((item) => (
        <Link key={item.route} to={item.route}>
          <Button
            variant="ghost"
            className="w-full flex justify-start gap-3 font-medium"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default NavigationMenu;
