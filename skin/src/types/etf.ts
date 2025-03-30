
export interface ETF {
      id: string;
      name: string; 
      short_name: string; 
      growth: number; 
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
