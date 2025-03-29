
import { Link } from 'react-router-dom';
import { ETF } from '@/types/etf';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ETFCardProps {
  etf: ETF;
  showDetails?: boolean;
  listView?: boolean;
}

export function ETFCard({ etf, showDetails = false, listView = false }: ETFCardProps) {
  if (listView) {
    return (
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardContent className="p-4">
          <Link to={`/etfs/${etf.id}`} className="block">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-lg">{etf.symbol}</h3>
                <p className="text-muted-foreground">{etf.name}</p>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="text-xl font-bold">
                  ${etf.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={cn(
                  "flex items-center text-sm font-medium",
                  etf.change.isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {etf.change.isPositive ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                  {etf.change.isPositive ? "+" : ""}{etf.change.percentage.toFixed(2)}%
                </div>
              </div>
            </div>
          </Link>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Link 
            to={`/etfs/${etf.id}`} 
            className="text-sm font-medium text-primary flex items-center hover:underline"
          >
            View Details <ArrowUpRight className="ml-1 h-3 w-3" />
          </Link>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-4">
        <Link to={`/etfs/${etf.id}`} className="block">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{etf.symbol}</h3>
              <p className="text-muted-foreground">{etf.name}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                ${etf.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={cn(
                "flex items-center text-sm font-medium",
                etf.change.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {etf.change.isPositive ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                {etf.change.isPositive ? "+" : ""}{etf.change.percentage.toFixed(2)}%
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link 
          to={`/etfs/${etf.id}`} 
          className="text-sm font-medium text-primary flex items-center hover:underline"
        >
          View Details <ArrowUpRight className="ml-1 h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  );
}
