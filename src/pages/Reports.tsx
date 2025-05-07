
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, ArrowLeft, FileBarChart } from "lucide-react";
import { Link } from "react-router-dom";

const sampleReports = [
  {
    id: "rep-001",
    name: "Отчет по сварке №1382",
    date: "15.04.2023",
    status: "critical", // critical, warning, success
    defects: 3,
    pipelineSection: "КС-32, Секция B",
    analyst: "Иванов И.И."
  },
  {
    id: "rep-002",
    name: "Отчет по сварке №1383",
    date: "16.04.2023",
    status: "warning",
    defects: 1,
    pipelineSection: "КС-32, Секция C",
    analyst: "Петров П.П."
  },
  {
    id: "rep-003",
    name: "Отчет по сварке №1384",
    date: "17.04.2023",
    status: "success",
    defects: 0,
    pipelineSection: "КС-32, Секция D",
    analyst: "Сидоров С.С."
  }
];

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(sampleReports[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "success":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/">
          <Button variant="ghost" size="icon" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Отчеты контроля</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">История отчетов</h2>
            </div>
            <div className="divide-y">
              {sampleReports.map((report) => (
                <div 
                  key={report.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedReport.id === report.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-600" />
                      <div>
                        <h3 className="font-medium">{report.name}</h3>
                        <p className="text-sm text-gray-500">{report.date}</p>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(report.status)}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{selectedReport.name}</CardTitle>
                <CardDescription>{selectedReport.pipelineSection} • {selectedReport.date}</CardDescription>
              </div>
              <Button size="sm">
                <Download className="h-4 w-4 mr-1" />
                Скачать PDF
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Обзор</TabsTrigger>
                  <TabsTrigger value="defects">Дефекты</TabsTrigger>
                  <TabsTrigger value="images">Снимки</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Аналитик</p>
                      <p className="font-medium">{selectedReport.analyst}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Статус шва</p>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedReport.status)} mr-2`}></div>
                        <p className="font-medium">
                          {selectedReport.status === "critical" ? "Критические дефекты" : 
                           selectedReport.status === "warning" ? "Незначительные дефекты" : 
                           "Допустимо к эксплуатации"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 mb-6">
                    <h3 className="font-medium mb-2 flex items-center">
                      <FileBarChart className="h-4 w-4 mr-1" />
                      Сводка результатов
                    </h3>
                    <div className="text-sm">
                      {selectedReport.status === "critical" ? (
                        <p className="text-red-600">Обнаружены критические дефекты, требующие немедленного ремонта сварного шва. Не соответствует ГОСТ 16037-80.</p>
                      ) : selectedReport.status === "warning" ? (
                        <p className="text-yellow-600">Обнаружены незначительные дефекты, не превышающие допустимых значений по ГОСТ 16037-80. Рекомендуется мониторинг в процессе эксплуатации.</p>
                      ) : (
                        <p className="text-green-600">Дефектов не обнаружено. Сварной шов соответствует требованиям ГОСТ 16037-80 и пригоден к эксплуатации.</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-dashed">
                    <h3 className="font-medium mb-2">Рекомендации</h3>
                    {selectedReport.status === "critical" ? (
                      <p className="text-sm">Требуется полная замена сварного шва. Отключить участок трубопровода от эксплуатации до устранения дефектов.</p>
                    ) : selectedReport.status === "warning" ? (
                      <p className="text-sm">Повторный контроль через 3 месяца. Внести в график планового обслуживания.</p>
                    ) : (
                      <p className="text-sm">Плановый контроль согласно регламенту через 12 месяцев.</p>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="defects">
                  {selectedReport.defects > 0 ? (
                    <div className="space-y-4">
                      {selectedReport.status === "critical" && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h3 className="text-red-700 font-medium">Критический дефект: Трещина</h3>
                          <div className="mt-2 flex items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded mr-3">
                              <img src="/defect-sample.jpg" alt="Дефект" className="w-full h-full object-cover rounded" />
                            </div>
                            <div>
                              <p className="text-sm">Продольная трещина длиной 2.3 мм в корне шва</p>
                              <p className="text-xs text-gray-500 mt-1">Координаты: X: 45.2, Y: 78.1</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {(selectedReport.status === "critical" || selectedReport.status === "warning") && (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h3 className="text-yellow-700 font-medium">Дефект: Газовая пора</h3>
                          <div className="mt-2 flex items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded mr-3">
                              <img src="/pore-sample.jpg" alt="Пора" className="w-full h-full object-cover rounded" />
                            </div>
                            <div>
                              <p className="text-sm">Газовая пора диаметром 0.9 мм</p>
                              <p className="text-xs text-gray-500 mt-1">Координаты: X: 23.7, Y: 41.2</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedReport.status === "critical" && (
                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <h3 className="text-orange-700 font-medium">Дефект: Непровар</h3>
                          <div className="mt-2 flex items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded mr-3">
                              <img src="/incomplete-sample.jpg" alt="Непровар" className="w-full h-full object-cover rounded" />
                            </div>
                            <div>
                              <p className="text-sm">Непровар кромки соединения длиной 1.6 мм</p>
                              <p className="text-xs text-gray-500 mt-1">Координаты: X: 67.8, Y: 32.5</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium">Дефектов не обнаружено</h3>
                      <p className="text-sm text-gray-500 mt-1">Сварной шов соответствует необходимым требованиям</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="images">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <img 
                        src="/weld-report-sample.jpg"
                        alt="Рентгеновский снимок"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <p className="text-sm text-center mt-2">Исходный снимок</p>
                    </div>
                    <div>
                      <img 
                        src="/weld-analysis-sample.jpg"
                        alt="Анализ снимка"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <p className="text-sm text-center mt-2">Результаты анализа</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
