
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getETFById } from "@/data/mockEtfs";
import { HoldingsList } from "@/components/etf/HoldingsList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, ExternalLink, Share2, BookmarkPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { getETF } from "@/lib/api";
import { useEffect, useState } from "react";
import { Coin, ETF } from "@/types/etf";
import { getCoins } from "@/lib/api";
import { getAssociations } from "@/lib/api";
import { BasketAssociation } from "@/types/etf";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";


export function ETFDetail() {
  const { id } = useParams<{ id: string }>();
  const [etf, setEtf] = useState<ETF | null>(null);
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [associations, setAssociations] = useState<BasketAssociation[]>([]);

  useEffect(() => {
    // This would be replaced with an API call in a real application
    const fetchETF = async () => {
      setLoading(true);
      try {
        console.log(id);
        const [data] = await getETF(id || "");
        setEtf(data || null);
      } catch (error) {
        console.error("Error fetching ETF data:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchCoin = async () => {
      setLoading(true);
      try {
        const [data] = await getCoins();
        setCoins(data || null);
      } catch (error) {
        console.error("Error fetching ETF data:", error);
      } finally {
        setLoading(false);
      }
    }
    const fetchCoinsAndAssociations = async () => {
      try {
        const coinsData = await getCoins();
        setCoins(coinsData.data || []);

        const associationsData = await getAssociations();
        if (associationsData && etf)
          setAssociations(associationsData.data.filter(association => association.etf_id === etf.data.id))
        console.log(associations)
      } catch (error) {
        console.error("Error fetching coins or associations:", error);
      }
    };

    if (id) {
      fetchCoin()
      fetchETF();
      fetchCoinsAndAssociations();
    }
  }, [id]);





  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-xl">Loading ETF data...</div>
        </div>
      </DashboardLayout>
    );
  }



  if (!etf) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-2xl font-bold">ETF not found</h1>
          <p className="text-muted-foreground">The ETF you are looking for does not exist.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">{etf["data"].name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-muted-foreground">{etf["data"].short_name}</span>
                <div className={cn(
                  "px-2 py-0.5 rounded text-sm font-medium",
                  etf["data"].growth > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                )}>
                  {etf["data"].growth > 0 ? <TrendingUp className="inline mr-1 h-3 w-3" /> : <TrendingDown className="inline mr-1 h-3 w-3" />}
                  {etf["data"].growth > 0 ? "+" : ""}{etf["data"].growth.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <BookmarkPlus className="mr-2 h-4 w-4" />
              Watchlist
            </Button>
            <Button size="sm">
              Buy ETF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold">Growth in the last year</CardTitle>
            </CardHeader>
            <CardContent className="text-5xl font-bold">
              <span className={cn(
                "text-3xl ml-2",
                etf["data"].growth > 0 ? "text-green-600" : "text-red-600"
              )}>
                {etf["data"].growth > 0 ? "+" : ""}{etf["data"].growth.toFixed(2)} ({etf["data"].growth > 0 ? "+" : ""}{etf["data"].growth.toFixed(2)}%)
              </span>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">About {etf["data"].short_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Key Features:
                Diversification: Instead of investing in a single cryptocurrency, the ETF holds multiple assets, reducing individual coin risk.

                Ease of Access: Investors can buy and sell ETF shares on traditional stock exchanges, eliminating the need to manage private keys or crypto wallets.

                Regulated Structure: Many crypto ETFs operate under financial regulations, offering a safer and more transparent investment vehicle compared to direct crypto holdings.

                Liquidity: Traded like stocks, these ETFs offer high liquidity, allowing investors to enter and exit positions with ease.</p>

              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View ETF Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
