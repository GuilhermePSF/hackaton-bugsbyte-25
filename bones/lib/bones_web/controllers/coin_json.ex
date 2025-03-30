defmodule BonesWeb.CoinJSON do
  alias Bones.Resources.Coin

  @doc """
  Renders a list of coins.
  """
  def index(%{coins: coins}) do
    for(coin <- coins, do: show_coin(coin))
  end

  @doc """
  Renders a single coin.
  """
  def show(%{coin: coin}) do
    show_coin(coin)
  end

  def show_coin(%Coin{} = coin) do
    %{
      id: coin.id,
      name: coin.name,
      short_name: coin.short_name,
      price: coin.price,
      growth: coin.growth
    }
  end
end
