defmodule BonesWeb.CoinJSON do
  alias Bones.Repo
  alias Bones.Resources
  alias Bones.Resources.Coin
  alias Bones.Resources.BasketAssociation

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
