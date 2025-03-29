defmodule BonesWeb.CoinController do
  use BonesWeb, :controller

  alias Bones.Resources
  alias Bones.Resources.Coin

  action_fallback BonesWeb.FallbackController

  def index(conn, _params) do
    coins = Resources.list_coins()
    render(conn, :index, coins: coins)
  end

  def create(conn, %{"coin" => coin_params}) do
    with {:ok, %Coin{} = coin} <- Resources.create_coin(coin_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/coins/#{coin}")
      |> render(:show, coin: coin)
    end
  end

  def show(conn, %{"id" => id}) do
    coin = Resources.get_coin!(id)
    render(conn, :show, coin: coin)
  end

  def update(conn, %{"id" => id, "coin" => coin_params}) do
    coin = Resources.get_coin!(id)

    with {:ok, %Coin{} = coin} <- Resources.update_coin(coin, coin_params) do
      render(conn, :show, coin: coin)
    end
  end

  def delete(conn, %{"id" => id}) do
    coin = Resources.get_coin!(id)

    with {:ok, %Coin{}} <- Resources.delete_coin(coin) do
      send_resp(conn, :no_content, "")
    end
  end
end
