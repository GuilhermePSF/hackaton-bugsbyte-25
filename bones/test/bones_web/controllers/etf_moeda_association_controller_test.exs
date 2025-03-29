defmodule BonesWeb.EtfMoedaAssociationControllerTest do
  use BonesWeb.ConnCase

  import Bones.AssociationFixtures

  alias Bones.Association.EtfMoedaAssociation

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
    test "lists all etf_moeda_associations", %{conn: conn} do
      conn = get(conn, ~p"/api/etf_moeda_associations")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create etf_moeda_association" do
    test "renders etf_moeda_association when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/etf_moeda_associations", etf_moeda_association: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/etf_moeda_associations/#{id}")

      assert %{
               "id" => ^id,
               "etf_id" => "7488a646-e31f-11e4-aace-600308960662",
               "moeda_id" => "7488a646-e31f-11e4-aace-600308960662"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/etf_moeda_associations", etf_moeda_association: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update etf_moeda_association" do
    setup [:create_etf_moeda_association]

    test "renders etf_moeda_association when data is valid", %{conn: conn, etf_moeda_association: %EtfMoedaAssociation{id: id} = etf_moeda_association} do
      conn = put(conn, ~p"/api/etf_moeda_associations/#{etf_moeda_association}", etf_moeda_association: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/etf_moeda_associations/#{id}")

      assert %{
               "id" => ^id,
               "etf_id" => "7488a646-e31f-11e4-aace-600308960668",
               "moeda_id" => "7488a646-e31f-11e4-aace-600308960668"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, etf_moeda_association: etf_moeda_association} do
      conn = put(conn, ~p"/api/etf_moeda_associations/#{etf_moeda_association}", etf_moeda_association: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete etf_moeda_association" do
    setup [:create_etf_moeda_association]

    test "deletes chosen etf_moeda_association", %{conn: conn, etf_moeda_association: etf_moeda_association} do
      conn = delete(conn, ~p"/api/etf_moeda_associations/#{etf_moeda_association}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/etf_moeda_associations/#{etf_moeda_association}")
      end
    end
  end

  defp create_etf_moeda_association(_) do
    etf_moeda_association = etf_moeda_association_fixture()
    %{etf_moeda_association: etf_moeda_association}
  end
end
