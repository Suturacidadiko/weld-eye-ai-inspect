
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Edit, Minus, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Defect {
  id: string;
  x: number;
  y: number;
  type: 'crack' | 'pore' | 'incomplete';
  size: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

interface DefectEditorProps {
  selectedDefect: Defect | null;
  onDefectChange: (defect: Defect) => void;
  onDefectDelete: (id: string) => void;
  onDefectAdd: () => void;
  onDefectSave: (defect: Defect) => void;
}

export const DefectEditor: React.FC<DefectEditorProps> = ({
  selectedDefect,
  onDefectChange,
  onDefectDelete,
  onDefectAdd,
  onDefectSave
}) => {
  const { toast } = useToast();

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Правка разметки</CardTitle>
          <Button variant="outline" size="sm" onClick={onDefectAdd}>
            <Plus className="h-4 w-4 mr-1" />
            Добавить
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {selectedDefect ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Тип дефекта</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedDefect.type}
                onChange={(e) => onDefectChange({...selectedDefect, type: e.target.value as any})}
              >
                <option value="pore">Пора</option>
                <option value="crack">Трещина</option>
                <option value="incomplete">Непровар</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Размер (мм)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md"
                value={selectedDefect.size}
                onChange={(e) => onDefectChange({...selectedDefect, size: parseFloat(e.target.value)})}
                step="0.1"
                min="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Критичность</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedDefect.severity}
                onChange={(e) => onDefectChange({...selectedDefect, severity: e.target.value as any})}
              >
                <option value="low">Низкая</option>
                <option value="medium">Средняя</option>
                <option value="high">Высокая</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Описание</label>
              <textarea 
                className="w-full p-2 border rounded-md"
                value={selectedDefect.description}
                onChange={(e) => onDefectChange({...selectedDefect, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="flex justify-between pt-4">
              <Button 
                variant="destructive"
                size="sm"
                onClick={() => onDefectDelete(selectedDefect.id)}
              >
                <Minus className="h-4 w-4 mr-1" />
                Удалить
              </Button>
              
              <Button 
                variant="default"
                size="sm"
                onClick={() => onDefectSave(selectedDefect)}
              >
                <Save className="h-4 w-4 mr-1" />
                Применить
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(60vh-150px)] text-center">
            <Edit className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500">Выберите дефект для редактирования или добавьте новый</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DefectEditor;
