
export interface ETF {
  id: string;
  name: string;
  symbol: string;
  description: string;
  price: number;
  change: {
    value: number;
    percentage: number;
    isPositive: boolean;
  };
  marketCap: number;
  volume24h: number;
  holdings: Holding[];
  historicalData: HistoricalData[];
  imageUrl: string;
}

export interface Holding {
  id: string;
  name: string;
  symbol: string;
  imageUrl: string;
  allocation: number;
  price: number;
  change: {
    percentage: number;
    isPositive: boolean;
  };
}

export interface HistoricalData {
  date: string;
  value: number;
}
