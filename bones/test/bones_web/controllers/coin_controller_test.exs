defmodule BonesWeb.CoinControllerTest do
  use BonesWeb.ConnCase

  import Bones.ResourcesFixtures

  alias Bones.Resources.Coin

  @create_attrs %{
    name: "some name",
    short_name: "some short_name"
  }
  @update_attrs %{
    name: "some updated name",
    short_name: "some updated short_name"
  }
  @invalid_attrs %{name: nil, short_name: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all coins", %{conn: conn} do
      conn = get(conn, ~p"/api/coins")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create coin" do
    test "renders coin when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/coins", coin: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/coins/#{id}")

      assert %{
               "id" => ^id,
               "name" => "some name",
               "short_name" => "some short_name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/coins", coin: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update coin" do
    setup [:create_coin]

    test "renders coin when data is valid", %{conn: conn, coin: %Coin{id: id} = coin} do
      conn = put(conn, ~p"/api/coins/#{coin}", coin: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/coins/#{id}")

      assert %{
               "id" => ^id,
               "name" => "some updated name",
               "short_name" => "some updated short_name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, coin: coin} do
      conn = put(conn, ~p"/api/coins/#{coin}", coin: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete coin" do
    setup [:create_coin]

    test "deletes chosen coin", %{conn: conn, coin: coin} do
      conn = delete(conn, ~p"/api/coins/#{coin}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/coins/#{coin}")
      end
    end
  end

  defp create_coin(_) do
    coin = coin_fixture()
    %{coin: coin}
  end
end
