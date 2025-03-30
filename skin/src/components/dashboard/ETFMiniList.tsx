
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ETF } from "@/types/etf";


type ETFMiniListProps = {
  etfs: ETF[];
};

export function ETFMiniList({ etfs }: ETFMiniListProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">
            Top Performing ETFs
          </CardTitle>
        </div>
        <Link to="/etfs">
          <Button variant="ghost" size="sm" className="gap-1">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {etfs.map((etf) => (
            <Link key={etf.id} to={`/etfs/${etf.id}`}>
              <div className="flex items-center justify-between p-2 rounded-md hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                <div className="text-lg font-bold	">{etf.short_name}</div>
                  <div className="text-sm text-muted-foreground">{etf.name}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className={cn(
                      "flex font-medium items-center",
                      etf.growth > 0 ? "text-green-600" : "text-red-600"
                    )}>
                      {etf.growth > 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                      {etf.growth > 0 ? "+" : ""}{etf.growth.toFixed(2)}%
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
