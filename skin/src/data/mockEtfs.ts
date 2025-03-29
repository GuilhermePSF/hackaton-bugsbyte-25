import type { ETF, Holding } from '../types/etf';
import etfsData from './etfs.json';

// Type assertion to ensure the JSON data matches our ETF type
const mockETFs: ETF[] = etfsData as ETF[];

export const getUserETFs = async () => {
  // In a real app, this would fetch from an API based on the user's holdings
  // For now, just return the first 3 ETFs as owned by the user
  try {
    return mockETFs.slice(0, 3);
  } catch (error) {
    console.error("Error loading user ETFs:", error);
    return [];
  }
};

export const getETFById = async (id: string) => {
  try {
    return mockETFs.find(etf => etf.id === id);
  } catch (error) {
    console.error(`Error finding ETF with id ${id}:`, error);
    return null;
  }
};

export const getAllETFs = async () => {
  try {
    return mockETFs;
  } catch (error) {
    console.error("Error loading all ETFs:", error);
    return [];
  }
};

export const getCryptoById = async (cryptoId: string, etfId?: string) => {
  try {
    // If an ETF ID is provided, search for the crypto in that specific ETF
    if (etfId) {
      const etf = await getETFById(etfId);
      if (etf) {
        return etf.holdings.find(holding => holding.id === cryptoId) || null;
      }
      return null;
    }
    
    // If no ETF ID is provided, search for the crypto across all ETFs
    // Return the first instance found (in a real app, you would merge data from all instances)
    for (const etf of mockETFs) {
      const crypto = etf.holdings.find(holding => holding.id === cryptoId);
      if (crypto) {
        return crypto;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error finding crypto with id ${cryptoId}:`, error);
    return null;
  }
};
