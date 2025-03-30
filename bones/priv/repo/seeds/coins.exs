defmodule Bones.Repo.Seeds.Coins do
  alias Bones.Repo
  alias Bones.Resources.Coin
  require Logger

  @coins [
    {"Bitcoin", "BTC"},
    {"Ethereum", "ETH"},
    {"Cosmos", "ATOM"},
    {"BNB", "BNB"},
    {"USD Coin", "USDC"},
    {"XRP", "XRP"},
    {"Cardano", "ADA"},
    {"Dogecoin", "DOGE"},
    {"Solana", "SOL"},
    {"Polygon", "MATIC"},
    {"Polkadot", "DOT"},
    {"Litecoin", "LTC"},
    {"Shiba Inu", "SHIB"},
    {"TRON", "TRX"},
    {"Avalanche", "AVAX"},
    {"Filecoin", "FIL"},
    {"Wrapped Bitcoin", "WBTC"},
    {"Uniswap", "UNI"},
    {"Chainlink", "LINK"},
    {"SushiSwap", "SUSHI"}
  ]

  def get_kline_field(field, url, index \\ 0) do
    {:ok, body} = HTTPoison.get!(url).body |> Jason.decode()
    # Get the kline data based on the index
    kline = Enum.at(body, index)
    IO.inspect(kline)
    IO.puts(index)
    # Extract the fields from the selected kline
    if kline do
      [open_time, open_price, high_price, low_price, close_price, _volume | _] = kline

      case field do
        :open_time -> open_time
        :open_price -> open_price
        :high_price -> high_price
        :low_price -> low_price
        :close_price -> close_price
        _ -> {:error, "Invalid field"}
      end
    end
  end

  def seed do
    for coin <- @coins do
      short_name = elem(coin, 1)

      url =
        "https://api.binance.com/api/v3/klines?symbol=" <>
          short_name <> "USDT&interval=1M&limit=12"

      price = String.to_float(get_kline_field(:open_price, url, 11))
      price_year_ago = String.to_float(get_kline_field(:open_price, url, 0))

      %Coin{
        id: Ecto.UUID.generate(),
        name: elem(coin, 0),
        short_name: short_name,
        price: price,
        growth: Float.ceil((price - price_year_ago) / price_year_ago * 100, 3)
      }
      |> Repo.insert!()
    end
  end
end

Bones.Repo.Seeds.Coins.seed()
