
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { AssetAllocation } from "@/components/dashboard/AssetAllocation";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Bitcoin, DollarSign, Euro } from "lucide-react";
import { ETFMiniList } from "@/components/dashboard/ETFMiniList";
import { getAllETFs } from "@/data/mockEtfs";

const mockPerformanceData = [
  { date: "Jan", value: 3400 },
  { date: "Feb", value: 3000 },
  { date: "Mar", value: 3800 },
  { date: "Apr", value: 4200 },
  { date: "May", value: 4000 },
  { date: "Jun", value: 4800 },
  { date: "Jul", value: 5200 },
  { date: "Aug", value: 5600 },
  { date: "Sep", value: 6000 },
  { date: "Oct", value: 5800 },
  { date: "Nov", value: 6400 },
  { date: "Dec", value: 7000 },
];

const mockAssetData = [
  { name: "USD", value: 5000, color: "#3182CE" },
  { name: "Bitcoin", value: 2500, color: "#F7931A" },
  { name: "Ethereum", value: 1500, color: "#627EEA" },
  { name: "Euro", value: 1000, color: "#0F8FF8" },
];

export function Dashboard() {
  const topETFs = getAllETFs().slice(0, 4);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BalanceCard
            title="Total Balance"
            balance="$10,045.00"
            change={{
              value: "$450.00",
              percentage: "4.5%",
              isPositive: true,
            }}
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <BalanceCard
            title="Bitcoin"
            balance="0.095 BTC ($4,275.00)"
            change={{
              value: "$275.00",
              percentage: "6.2%",
              isPositive: true,
            }}
            icon={<Bitcoin className="h-4 w-4 text-muted-foreground" />}
          />
          <BalanceCard
            title="Euro"
            balance="€940.00 ($1,020.00)"
            change={{
              value: "$20.00",
              percentage: "1.8%",
              isPositive: false,
            }}
            icon={<Euro className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart
              title="Portfolio Performance"
              data={mockPerformanceData}
            />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <AssetAllocation data={mockAssetData} />
          </div>
          <div className="lg:col-span-2">
            <ETFMiniList etfs={topETFs} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
