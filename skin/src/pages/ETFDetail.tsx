
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getETFById } from "@/data/mockEtfs";
import { ETFPerformanceChart } from "@/components/etf/ETFPerformanceChart";
import { HoldingsList } from "@/components/etf/HoldingsList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, ExternalLink, Share2, BookmarkPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export function ETFDetail() {
  const { id } = useParams<{ id: string }>();
  const etf = getETFById(id || "");

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
            <img 
              src={etf.imageUrl} 
              alt={etf.name} 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">{etf.name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-muted-foreground">{etf.symbol}</span>
                <div className={cn(
                  "px-2 py-0.5 rounded text-sm font-medium",
                  etf.change.isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                )}>
                  {etf.change.isPositive ? <TrendingUp className="inline mr-1 h-3 w-3" /> : <TrendingDown className="inline mr-1 h-3 w-3" />}
                  {etf.change.isPositive ? "+" : ""}{etf.change.percentage.toFixed(2)}%
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
              <CardTitle className="text-lg font-medium">Price</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              ${etf.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className={cn(
                "text-sm ml-2",
                etf.change.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {etf.change.isPositive ? "+" : ""}{etf.change.value.toFixed(2)} ({etf.change.isPositive ? "+" : ""}{etf.change.percentage.toFixed(2)}%)
              </span>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Market Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap:</span>
                  <span className="font-medium">${(etf.marketCap / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h Volume:</span>
                  <span className="font-medium">${(etf.volume24h / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assets:</span>
                  <span className="font-medium">{etf.holdings.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ETFPerformanceChart 
              title="ETF Performance" 
              data={etf.historicalData} 
              color={etf.change.isPositive ? "#10B981" : "#EF4444"}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">About {etf.symbol}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{etf.description}</p>
              
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View ETF Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <HoldingsList holdings={etf.holdings} />
        </div>
      </div>
    </DashboardLayout>
  );
}
