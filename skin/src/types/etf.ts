
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

export interface BasketAssociasion {
  id: string;
  etf_id: string;
  moeda_id: string;
  percentage: number;
}

export interface Coin {
  id: string;
  name: string;
  short_name: string;
  price: number;
  growth: number; 
}

export interface HistoricalData {
  date: string;
  value: number;
}
