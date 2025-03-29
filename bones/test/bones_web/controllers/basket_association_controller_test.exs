defmodule BonesWeb.BasketAssociationControllerTest do
  use BonesWeb.ConnCase

  import Bones.ResourcesFixtures

  alias Bones.Resources.BasketAssociation

  @create_attrs %{
    etf_id: "7488a646-e31f-11e4-aace-600308960662",
    moeda_id: "7488a646-e31f-11e4-aace-600308960662"
  }
  @update_attrs %{
    etf_id: "7488a646-e31f-11e4-aace-600308960668",
    moeda_id: "7488a646-e31f-11e4-aace-600308960668"
  }
  @invalid_attrs %{etf_id: nil, moeda_id: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all basket_association", %{conn: conn} do
      conn = get(conn, ~p"/api/basket_association")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create basket_association" do
    test "renders basket_association when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/basket_association", basket_association: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/basket_association/#{id}")

      assert %{
               "id" => ^id,
               "etf_id" => "7488a646-e31f-11e4-aace-600308960662",
               "moeda_id" => "7488a646-e31f-11e4-aace-600308960662"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/basket_association", basket_association: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update basket_association" do
    setup [:create_basket_association]

    test "renders basket_association when data is valid", %{conn: conn, basket_association: %BasketAssociation{id: id} = basket_association} do
      conn = put(conn, ~p"/api/basket_association/#{basket_association}", basket_association: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/basket_association/#{id}")

      assert %{
               "id" => ^id,
               "etf_id" => "7488a646-e31f-11e4-aace-600308960668",
               "moeda_id" => "7488a646-e31f-11e4-aace-600308960668"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, basket_association: basket_association} do
      conn = put(conn, ~p"/api/basket_association/#{basket_association}", basket_association: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete basket_association" do
    setup [:create_basket_association]

    test "deletes chosen basket_association", %{conn: conn, basket_association: basket_association} do
      conn = delete(conn, ~p"/api/basket_association/#{basket_association}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/basket_association/#{basket_association}")
      end
    end
  end

  defp create_basket_association(_) do
    basket_association = basket_association_fixture()
    %{basket_association: basket_association}
  end
end
