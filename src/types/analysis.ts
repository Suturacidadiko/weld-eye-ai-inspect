
export interface Defect {
  id: string;
  x: number;
  y: number;
  type: 'crack' | 'pore' | 'incomplete';
  size: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export const defectTypeMap = {
  'pore': 'Пора',
  'crack': 'Трещина',
  'incomplete': 'Непровар'
};

export const getSeverityColor = (severity: string): string => {
  switch(severity) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};
