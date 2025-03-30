
import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getCryptoById, getETFById } from "@/data/mockEtfs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingDown, TrendingUp, ChevronLeft, ArrowUpRight } from "lucide-react";
import { ETFPerformanceChart } from "@/components/etf/ETFPerformanceChart";
import { cn } from "@/lib/utils";
import { Holding } from "@/types/etf";

export function CryptoDetail() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const etfId = searchParams.get("etf");
  
  const [crypto, setCrypto] = useState<Holding | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error("Cryptocurrency ID is required");
        }
        
        const cryptoData = await getCryptoById(id, etfId || undefined);
        if (!cryptoData) {
          throw new Error("Cryptocurrency not found");
        }
        
        setCrypto(cryptoData);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
        setError(error instanceof Error ? error.message : "Failed to load cryptocurrency data");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [id, etfId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-xl">Loading cryptocurrency data...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !crypto) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-2xl font-bold">Cryptocurrency not found</h1>
          <p className="text-muted-foreground">{error || "The cryptocurrency you are looking for does not exist."}</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to={etfId ? `/etfs/${etfId}` : "/etfs"}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to {etfId ? "ETF" : "ETFs"}
            </Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Generate some mock historical data for the cryptocurrency
  const mockHistoricalData = [
    { date: "Jan", value: crypto.price * 0.7 },
    { date: "Feb", value: crypto.price * 0.75 },
    { date: "Mar", value: crypto.price * 0.8 },
    { date: "Apr", value: crypto.price * 0.85 },
    { date: "May", value: crypto.price * 0.9 },
    { date: "Jun", value: crypto.price * 0.95 },
    { date: "Jul", value: crypto.price * 0.97 },
    { date: "Aug", value: crypto.price * 0.99 },
    { date: "Sep", value: crypto.price * 1.01 },
    { date: "Oct", value: crypto.price * 1.03 },
    { date: "Nov", value: crypto.price * 1.05 },
    { date: "Dec", value: crypto.price }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back button */}
        <div>
          <Button variant="ghost" className="pl-0" asChild>
            <Link to={etfId ? `/etfs/${etfId}` : "/etfs"}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to {etfId ? "ETF" : "ETFs"}
            </Link>
          </Button>
        </div>
        
        {/* Crypto header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={crypto.imageUrl} 
              alt={crypto.name} 
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{crypto.name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-muted-foreground">{crypto.symbol}</span>
                <div className={cn(
                  "px-2 py-0.5 rounded text-sm font-medium",
                  crypto.change.isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                )}>
                  {crypto.change.isPositive ? <TrendingUp className="inline mr-1 h-3 w-3" /> : <TrendingDown className="inline mr-1 h-3 w-3" />}
                  {crypto.change.isPositive ? "+" : ""}{crypto.change.percentage.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button>
              Buy {crypto.symbol}
            </Button>
          </div>
        </div>
        
        {/* Price and Market Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Price</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              ${crypto.price.toLocaleString(undefined, { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: crypto.price < 1 ? 4 : 2 
              })}
              <span className={cn(
                "text-sm ml-2",
                crypto.change.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {crypto.change.isPositive ? "+" : ""}{crypto.change.percentage.toFixed(2)}%
              </span>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Allocation in ETF</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Allocation:</span>
                  <span className="font-medium text-lg">{crypto.allocation}%</span>
                </div>
                {etfId && (
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to={`/etfs/${etfId}`}>
                        View in ETF <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Price Chart */}
        <div>
          <ETFPerformanceChart 
            title={`${crypto.name} Price History`} 
            data={mockHistoricalData} 
            color={crypto.change.isPositive ? "#10B981" : "#EF4444"}
          />
        </div>
        
        {/* About Crypto */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">About {crypto.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {crypto.name} ({crypto.symbol}) is a cryptocurrency that is included in various ETFs, 
              with an allocation of {crypto.allocation}% in the selected ETF. 
              Over the past 24 hours, it has {crypto.change.isPositive ? "increased" : "decreased"} by {crypto.change.percentage.toFixed(2)}%.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
