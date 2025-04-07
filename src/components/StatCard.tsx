
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'app-green' | 'app-yellow' | 'app-blue' | 'app-red';
}

const StatCard = ({ title, value, icon: Icon, color = 'app-green' }: StatCardProps) => {
  // Map color prop to actual Tailwind classes
  const getColorClasses = (colorName: string) => {
    const colorMap: Record<string, { text: string, bg: string }> = {
      'app-green': { text: 'text-green-500', bg: 'bg-green-500/10' },
      'app-yellow': { text: 'text-yellow-500', bg: 'bg-yellow-500/10' },
      'app-blue': { text: 'text-blue-500', bg: 'bg-blue-500/10' },
      'app-red': { text: 'text-red-500', bg: 'bg-red-500/10' }
    };
    
    return colorMap[colorName] || colorMap['app-green'];
  };
  
  const colorClasses = getColorClasses(color);
  
  return (
    <Card className="border-app-dark bg-app-dark shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6 flex justify-between items-center">
        <div className="space-y-2">
          <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
          <p className={`text-3xl font-bold ${colorClasses.text}`}>{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorClasses.bg} flex items-center justify-center`}>
          <Icon className={`h-6 w-6 ${colorClasses.text}`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
