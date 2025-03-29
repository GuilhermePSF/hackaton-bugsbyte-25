
import { Holding } from '@/types/etf';
import { 
  Table, 
  TableBody, 
  TableCell,
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HoldingsListProps {
  holdings: Holding[];
}

export function HoldingsList({ holdings }: HoldingsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">ETF Holdings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead className="text-right">Allocation</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((holding, index) => (
                <TableRow key={holding.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img 
                        src={holding.imageUrl} 
                        alt={holding.name} 
                        className="w-6 h-6 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{holding.name}</div>
                        <div className="text-xs text-muted-foreground">{holding.symbol}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{holding.allocation}%</TableCell>
                  <TableCell className="text-right">${holding.price.toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: holding.price < 1 ? 4 : 2 
                  })}</TableCell>
                  <TableCell className={`text-right flex items-center justify-end ${
                    holding.change.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {holding.change.isPositive ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                    {holding.change.isPositive ? '+' : ''}{holding.change.percentage.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
