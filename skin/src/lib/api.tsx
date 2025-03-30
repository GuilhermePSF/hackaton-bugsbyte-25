import axios, { AxiosInstance } from 'axios';

const API_URL = "http://10.14.0.112:4000";


export const API : AxiosInstance = axios.create ({
    baseURL: API_URL,
    responseType: 'json', 
    headers: {
        "Content-Type": "application/json",
    }
})


export async function getCoins() {
    const response = await API.get('/api/coins');

    return response.data;
  }

export async function getCoin(id: string) {
    const response = await API.get(`/api/coins/${id}`);
    
    return response.data;
}

export async function getETFs() {
    const response = await API.get('/api/etfs');

    return response.data;
  }

export async function getETF(id: string) {
    const response = await API.get(`/api/etfs/${id}`);

    return response.data;
}



export async function getAssociations() {
    const response = await API.get(`/api/basket-association/`);

    return response.data;
}