
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Настройки сохранены",
      description: "Ваши настройки были успешно сохранены"
    });
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Настройки</h1>
        </div>
        <LanguageSwitcher />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">Общие</TabsTrigger>
            <TabsTrigger value="analysis">Анализ</TabsTrigger>
            <TabsTrigger value="integrations">Интеграции</TabsTrigger>
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Профиль пользователя</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">ФИО</Label>
                    <Input id="fullName" defaultValue="Иванов Иван Иванович" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Должность</Label>
                    <Input id="position" defaultValue="Инженер-дефектоскопист" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="ivanov@gazprom.ru" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" defaultValue="+7 (900) 123-45-67" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h2 className="text-lg font-medium">Настройки интерфейса</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="darkMode" className="mb-1 block">Темная тема</Label>
                      <p className="text-sm text-gray-500">Включить темный режим интерфейса</p>
                    </div>
                    <Switch id="darkMode" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sounds" className="mb-1 block">Звуковые уведомления</Label>
                      <p className="text-sm text-gray-500">Звуки при обнаружении дефектов</p>
                    </div>
                    <Switch id="sounds" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="animations" className="mb-1 block">Анимации</Label>
                      <p className="text-sm text-gray-500">Включить анимации интерфейса</p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-6">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить настройки
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Параметры анализа снимков</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoAnalysis" className="mb-1 block">Автоматический анализ</Label>
                      <p className="text-sm text-gray-500">Запускать анализ сразу после загрузки снимка</p>
                    </div>
                    <Switch id="autoAnalysis" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sensitivity">Чувствительность обнаружения дефектов</Label>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-3">Низкая</span>
                      <input type="range" id="sensitivity" className="flex-1" min="1" max="10" defaultValue="7" />
                      <span className="text-sm text-gray-500 ml-3">Высокая</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="minDefectSize">Минимальный размер дефекта (мм)</Label>
                    <Input id="minDefectSize" type="number" defaultValue="0.5" min="0.1" step="0.1" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h2 className="text-lg font-medium">Параметры газопроводов</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pipelineType">Тип газопровода</Label>
                    <select id="pipelineType" className="w-full border rounded-md p-2 bg-white">
                      <option>Магистральный</option>
                      <option>Распределительный</option>
                      <option>Промысловый</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pipelineStandard">Стандарт контроля</Label>
                    <select id="pipelineStandard" className="w-full border rounded-md p-2 bg-white">
                      <option>ГОСТ 16037-80</option>
                      <option>ГОСТ 32569-2013</option>
                      <option>ISO 13847</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-6">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить параметры
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">API-интеграции</h2>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">ERP-система предприятия</h3>
                        <p className="text-sm text-gray-500">Статус: Подключено</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="apiUrl">URL API</Label>
                      <Input id="apiUrl" defaultValue="https://erp.example.com/api/v1" />
                    </div>
                    <div className="mt-2 space-y-2">
                      <Label htmlFor="apiKey">API-ключ</Label>
                      <Input id="apiKey" type="password" defaultValue="sk_123456789abcdef" />
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Облачное хранилище</h3>
                        <p className="text-sm text-gray-500">Статус: Не подключено</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm">Настроить подключение</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h2 className="text-lg font-medium">Экспорт данных</h2>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoExport">Автоматический экспорт отчетов</Label>
                    <Switch id="autoExport" />
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline">Экспорт в Excel</Button>
                    <Button variant="outline">Экспорт в PDF</Button>
                    <Button variant="outline">Экспорт в CSV</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-6">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить настройки
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Настройка уведомлений</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="mb-1 block">Email-уведомления</Label>
                      <p className="text-sm text-gray-500">Получать уведомления о критических дефектах</p>
                    </div>
                    <Switch id="emailNotifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications" className="mb-1 block">SMS-уведомления</Label>
                      <p className="text-sm text-gray-500">Получать SMS о завершении анализа</p>
                    </div>
                    <Switch id="smsNotifications" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reportNotifications" className="mb-1 block">Отчеты по расписанию</Label>
                      <p className="text-sm text-gray-500">Еженедельная сводка результатов</p>
                    </div>
                    <Switch id="reportNotifications" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h2 className="text-lg font-medium">Приоритеты уведомлений</h2>
                
                <div className="space-y-2">
                  <Label>Уровни оповещения</Label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="critical" className="mr-2" defaultChecked />
                      <Label htmlFor="critical" className="text-red-600">Критические дефекты</Label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="warning" className="mr-2" defaultChecked />
                      <Label htmlFor="warning" className="text-yellow-600">Предупреждения</Label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="info" className="mr-2" />
                      <Label htmlFor="info" className="text-blue-600">Информационные</Label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="success" className="mr-2" />
                      <Label htmlFor="success" className="text-green-600">Успешные проверки</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-6">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить настройки
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
