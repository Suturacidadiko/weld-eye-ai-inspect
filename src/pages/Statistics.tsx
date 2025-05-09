
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart2, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Statistics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Статистика дефектоскопии</h1>
      
      <Tabs defaultValue="overall">
        <TabsList className="mb-4">
          <TabsTrigger value="overall">Общая статистика</TabsTrigger>
          <TabsTrigger value="defects">Типы дефектов</TabsTrigger>
          <TabsTrigger value="trends">Тренды</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overall">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Всего проанализировано</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,284</div>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +24% с прошлого месяца
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Обнаружено дефектов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">267</div>
                <p className="text-sm text-amber-600 mt-1 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -7% с прошлого месяца
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Критические дефекты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">52</div>
                <p className="text-sm text-red-600 mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  4.1% от всех анализов
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Средняя точность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">98.7%</div>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +1.2% с прошлого месяца
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="h-5 w-5 mr-2" />
                Динамика анализов по месяцам
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end justify-around">
                {[65, 59, 80, 81, 56, 55, 72, 78, 92, 87, 94, 105].map((value, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {value} анализов
                    </div>
                    <div 
                      style={{ height: `${value * 2}px` }}
                      className="w-12 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md hover:bg-blue-500 transition-colors"
                    ></div>
                    <div className="text-xs mt-1 text-center">{['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'][i]}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="defects">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Распределение по типам дефектов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Трещины</span>
                      <span className="text-sm font-medium text-gray-500">18%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "18%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Поры</span>
                      <span className="text-sm font-medium text-gray-500">42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Непровары</span>
                      <span className="text-sm font-medium text-gray-500">26%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "26%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Шлаковые включения</span>
                      <span className="text-sm font-medium text-gray-500">9%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "9%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Прочие дефекты</span>
                      <span className="text-sm font-medium text-gray-500">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Критичность дефектов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-8">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <svg className="w-36 h-36">
                        <circle 
                          className="text-gray-100" 
                          strokeWidth="10" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="60" 
                          cx="72" 
                          cy="72" 
                        />
                        <circle 
                          className="text-red-500" 
                          strokeWidth="10" 
                          strokeDasharray={2 * Math.PI * 60} 
                          strokeDashoffset={2 * Math.PI * 60 * (1 - 0.19)} 
                          strokeLinecap="round" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="60" 
                          cx="72" 
                          cy="72" 
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <p className="text-3xl font-bold">19%</p>
                        <p className="text-xs">Критичные</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Требуют немедленного ремонта</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <svg className="w-36 h-36">
                        <circle 
                          className="text-gray-100" 
                          strokeWidth="10" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="60" 
                          cx="72" 
                          cy="72" 
                        />
                        <circle 
                          className="text-yellow-500" 
                          strokeWidth="10" 
                          strokeDasharray={2 * Math.PI * 60} 
                          strokeDashoffset={2 * Math.PI * 60 * (1 - 0.37)} 
                          strokeLinecap="round" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="60" 
                          cx="72" 
                          cy="72" 
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <p className="text-3xl font-bold">37%</p>
                        <p className="text-xs">Средние</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Требуют наблюдения</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Тенденции обнаружения дефектов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">График тенденций будет доступен в следующей версии</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
