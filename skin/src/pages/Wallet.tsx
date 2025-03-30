import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getUserETFs } from "@/data/mockEtfs";
import { ETFCard } from "@/components/etf/ETFCard";
import { Wallet as WalletIcon, PlusCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ETF } from "@/types/etf";
import { getETFs} from "@/lib/api";


  const totalBalance =  1000/* userEtfs.reduce((sum, etf) => sum + etf.price, 0); */
  const positiveChange = 2/* userEtfs.filter(etf => etf.change.isPositive).length; */

export function Wallet() {
  const [etfs, setEtfs] = useState<ETF[]>([]);

  useEffect(() => {
    const fetchUserETFs = async () => {
      try {
        const eTf = await getUserETFs();
        setEtfs(eTf);
      } catch (error) {
        console.error("Error fetching user ETFs:", error);
      } 
    };

    fetchUserETFs();
  }, []);

  const totalBalance =  1000 /* userEtfs.reduce((sum, etf) => sum + etf.price, 0); */
  const positiveChange = 2 /* userEtfs.filter(etf => etf.change.isPositive).length; */
  const negativeChange = 1 /* userEtfs.length - positiveChange; */

  /* let etfs: ETF[] = [];
  getETFs().then((data) => {
    etfs = data;
  }) */;
   // ETFS temporarios ate haver informação da API
  const etfS: ETF [] = [
    {
      id: "1",
      name: "Global Tech ETF",
      short_name: "GTE",
      growth: 12.5,
    },
    {
      id: "2",
      name: "Sustainable Energy ETF",
      short_name: "SEE",
      growth: 8.3,
    },
    {
      id: "3",
      name: "Healthcare Leaders ETF",
      short_name: "HLE",
      growth: 15.2,
    },
    {
      id: "4",
      name: "Real Estate ETF",
      short_name: "REE",
      growth: 6.8,
    },
    {
      id: "5",
      name: "Emerging Markets ETF",
      short_name: "EME",
      growth: 10.1,
    },
  ];

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
                {etfs.length} ETFs in portfolio
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
          {etfS.map((etf) => (
            <ETFCard key={etf.id} etf={etf} showDetails={true} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}