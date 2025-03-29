
import { useEffect, useState } from 'react';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HistoricalData } from '@/types/etf';

interface ETFPerformanceChartProps {
  title?: string;
  data: HistoricalData[];
  color?: string;
}

const periods = ["1D", "1W", "1M", "3M", "1Y", "All"];

export function ETFPerformanceChart({ title = "Performance", data, color = "#3B82F6" }: ETFPerformanceChartProps) {
  const [activePeriod, setActivePeriod] = useState("1Y");
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    // In a real app, you would filter the data based on the selected period
    // For this mock, we'll just use all the data
    setChartData(data);
  }, [data, activePeriod]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex gap-1">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setActivePeriod(period)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                  activePeriod === period
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] w-full px-2">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: 'white' }}
                  fill="url(#colorValue)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-lg border rounded-md text-sm">
        <p className="font-medium">{label}</p>
        <p className="text-primary font-semibold">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }

  return null;
};
