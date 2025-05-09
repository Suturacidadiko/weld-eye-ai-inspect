
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckboxDemo } from "./checkboxDemo";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Search, Database as DatabaseIcon, Download, Filter } from "lucide-react";

const mockData = [
  {
    id: "REP-2023-001",
    date: "12.05.2023",
    operator: "Иванов А.П.",
    location: "КС-19, Секция B",
    defects: 3,
    status: "critical"
  },
  {
    id: "REP-2023-002",
    date: "14.05.2023",
    operator: "Петров С.В.",
    location: "КС-19, Секция C",
    defects: 0,
    status: "success"
  },
  {
    id: "REP-2023-003",
    date: "15.05.2023",
    operator: "Сидоров К.А.",
    location: "КС-19, Секция D",
    defects: 1,
    status: "warning"
  },
  {
    id: "REP-2023-004",
    date: "17.05.2023",
    operator: "Иванов А.П.",
    location: "КС-21, Секция A",
    defects: 5,
    status: "critical"
  },
  {
    id: "REP-2023-005",
    date: "19.05.2023",
    operator: "Смирнов Л.В.",
    location: "КС-21, Секция B",
    defects: 2,
    status: "warning"
  },
  {
    id: "REP-2023-006",
    date: "22.05.2023",
    operator: "Петров С.В.",
    location: "КС-21, Секция C",
    defects: 0,
    status: "success"
  },
  {
    id: "REP-2023-007",
    date: "24.05.2023",
    operator: "Сидоров К.А.",
    location: "КС-22, Секция A",
    defects: 1,
    status: "warning"
  },
];

const Database = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">База данных результатов</h1>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Экспорт данных
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Поиск по ID или локации"
                className="pl-10"
              />
            </div>
            
            <div>
              <Input
                type="date"
                className="w-full"
              />
            </div>
            
            <div>
              <select className="w-full p-2 border rounded-md">
                <option value="">Статус дефектов</option>
                <option value="critical">Критические</option>
                <option value="warning">Незначительные</option>
                <option value="success">Отсутствуют</option>
              </select>
            </div>
            
            <div>
              <Button className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Применить фильтры
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <DatabaseIcon className="h-5 w-5 mr-2" />
            Записи базы данных
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Оператор</TableHead>
                <TableHead>Локация</TableHead>
                <TableHead className="text-center">Дефекты</TableHead>
                <TableHead className="text-center">Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.operator}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell className="text-center">{row.defects}</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <div className={`px-2 py-1 rounded-full text-xs text-white ${
                        row.status === 'critical' ? 'bg-red-500' :
                        row.status === 'warning' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}>
                        {row.status === 'critical' ? 'Критические' :
                         row.status === 'warning' ? 'Незначительные' :
                         'Норма'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Просмотр
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Показано 7 из 124 записей
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Назад
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-50">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Вперед
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Database;
