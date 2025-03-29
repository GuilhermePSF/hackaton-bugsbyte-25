
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getUserETFs } from "@/data/mockEtfs";
import { ETFCard } from "@/components/etf/ETFCard";
import { Wallet as WalletIcon, PlusCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Wallet() {
  const userEtfs = getUserETFs();
  const totalBalance = userEtfs.reduce((sum, etf) => sum + etf.price, 0);
  const positiveChange = userEtfs.filter(etf => etf.change.isPositive).length;
  const negativeChange = userEtfs.length - positiveChange;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Wallet</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Investment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {userEtfs.length} ETFs in portfolio
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <div className="text-green-600 font-medium text-sm">Gaining</div>
                  <div className="text-2xl font-bold">{positiveChange}</div>
                </div>
                <div className="border-r border-gray-200 h-12" />
                <div className="flex flex-col">
                  <div className="text-red-600 font-medium text-sm">Losing</div>
                  <div className="text-2xl font-bold">{negativeChange}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <WalletIcon className="mr-2 h-4 w-4" />
                  Deposit Funds
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Link Bank Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-semibold mt-8">My ETF Investments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userEtfs.map((etf) => (
            <ETFCard key={etf.id} etf={etf} showDetails={true} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
