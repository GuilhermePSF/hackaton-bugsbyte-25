import axios, { AxiosInstance } from "axios";

// URLs para os diferentes servidores
const API_URL_8888 = 'http://localhost:8888';
const API_URL_4000 = 'http://10.14.0.112:4000';

// Criar instâncias de axios para os dois servidores
export const API_8888: AxiosInstance = axios.create({
  baseURL: API_URL_8888,
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const API_4000: AxiosInstance = axios.create({
  baseURL: API_URL_4000,
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getCoins() {
  const response = await API_4000.get('/api/coins');
  return response.data;
}

export async function getCoin(id: string) {
  const response = await API_4000.get(`/api/coins/${id}`);
  return response.data;
}

export async function getETFs() {
  const response = await API_4000.get('/api/etfs');

  return response.data;
}

export async function getETF(id: string) {
  const response = await API_4000.get(`/api/etfs/${id}`);
  return response.data;
}

export async function getAssociations() {
  const response = await API_4000.get(`/api/basket-association/`);
  return response.data;
}

export async function getAnalyze(coin: string, price) {
  const response = await API_8888.post('/analyze', { 
    coin: coin,
    price: price 
  });

  return response.data;
}
