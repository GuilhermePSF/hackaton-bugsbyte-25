
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  date: string;
  value: number;
};

type PerformanceChartProps = {
  title: string;
  data: DataPoint[];
  timeRanges?: string[];
  color?: string;
};

export function PerformanceChart({ 
  title, 
  data, 
  timeRanges = ["1W", "1M", "3M", "1Y", "All"], 
  color = "#3182CE" 
}: PerformanceChartProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex space-x-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              className={`px-2 py-1 text-xs rounded ${
                range === "1M"
                  ? "bg-uphold-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-80 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={["auto", "auto"]}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, "Value"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
