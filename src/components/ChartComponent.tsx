
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface ChartComponentProps {
  title: string;
  data: ChartData[];
  type: 'area' | 'bar' | 'line';
  color: string;
  height?: number;
}

const ChartComponent = ({ title, data, type, color, height = 300 }: ChartComponentProps) => {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`color-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1C23', border: '1px solid #333', borderRadius: '4px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="value" stroke={color} fillOpacity={1} fill={`url(#color-${color})`} />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1C23', border: '1px solid #333', borderRadius: '4px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1C23', border: '1px solid #333', borderRadius: '4px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} />
          </LineChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="border-app-dark bg-app-dark shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
