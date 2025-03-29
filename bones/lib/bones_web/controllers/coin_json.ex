defmodule BonesWeb.CoinJSON do
  alias Bones.Resources.Coin

  @doc """
  Renders a list of coins.
  """
  def index(%{coins: coins}) do
    %{data: for(coin <- coins, do: data(coin))}
  end

  @doc """
  Renders a single coin.
  """
  def show(%{coin: coin}) do
    %{data: data(coin)}
  end

  defp data(%Coin{} = coin) do
    %{
      id: coin.id,
      name: coin.name,
      short_name: coin.short_name
    }
  end
end
