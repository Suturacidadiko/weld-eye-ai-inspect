
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Create a new Analysis page route
const Analysis = React.lazy(() => import("./pages/Analysis"));
const Statistics = React.lazy(() => import("./pages/Statistics"));
const Database = React.lazy(() => import("./pages/Database"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<AppLayout><Gallery /></AppLayout>} />
          <Route path="/reports" element={<AppLayout><Reports /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          <Route path="/analysis" element={<AppLayout><Analysis /></AppLayout>} />
          <Route path="/statistics" element={<AppLayout><React.Suspense fallback={<div>Загрузка...</div>}><Statistics /></React.Suspense></AppLayout>} />
          <Route path="/database" element={<AppLayout><React.Suspense fallback={<div>Загрузка...</div>}><Database /></React.Suspense></AppLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
