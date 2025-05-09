
import React, { ReactNode } from 'react';
import ModernNavigation from './ModernNavigation';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <ModernNavigation />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
