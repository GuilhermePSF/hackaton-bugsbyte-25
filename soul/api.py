from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import uvicorn
import os
import requests
import numpy as np

def get_crypto_news_from_newsapi(crypto="bitcoin"):
    api_key = "3bc6c3e52cd64f76acad6a40134bfc22"  # Sua chave da API
    url = f"https://newsapi.org/v2/everything?q={crypto}&apiKey={api_key}"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()["articles"]
    else:
        print(f"Erro ao buscar notícias: {response.status_code}")
        return []

def get_adjusted_mu(sentiment_score, base_mu=0.0005):
    # Ajusta o retorno diário (mu) com base no sentimento
    adjusted_mu = base_mu + (sentiment_score * 0.0002)
    return adjusted_mu

def monte_carlo_simulation(price, mu, sigma=0.02, days=7, simulations=1000):
    results = []
    
    for _ in range(simulations):
        daily_returns = np.random.normal(mu, sigma, days)  # Gerando retornos diários simulados
        price_simulation = price * np.exp(np.cumsum(daily_returns))  # Calculando o preço simulado
        results.append(price_simulation.tolist())  # Convertendo para lista para ser serializável
    
    return results


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens (pode restringir depois)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os headers
)

analyzer = SentimentIntensityAnalyzer()

class InputData(BaseModel):
    coin: str
    price : float

@app.post("/analyze")
async def analyze_sentiment(input_data: InputData):
    news = get_crypto_news_from_newsapi(input_data.coin) + get_crypto_news_from_newsapi("crypto")
    sentimentos=[]
    for newz in news:
        sentimentos.append(analyzer.polarity_scores(newz["title"])["compound"])
    v = sum(sentimentos)/len(sentimentos)
    return {"simulation": monte_carlo_simulation(input_data.price,get_adjusted_mu(v))}


if __name__ == "__main__":
    port = 8888
    uvicorn.run(app, host="0.0.0.0", port=port)


