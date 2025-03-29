defmodule BonesWeb.EtfControllerTest do
  use BonesWeb.ConnCase

  import Bones.ResourcesFixtures

  alias Bones.Resources.Etf

  @create_attrs %{
    name: "some name"
  }
  @update_attrs %{
    name: "some updated name"
  }
  @invalid_attrs %{name: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all etfs", %{conn: conn} do
      conn = get(conn, ~p"/api/etfs")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create etf" do
    test "renders etf when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/etfs", etf: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/etfs/#{id}")

      assert %{
               "id" => ^id,
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/etfs", etf: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update etf" do
    setup [:create_etf]

    test "renders etf when data is valid", %{conn: conn, etf: %Etf{id: id} = etf} do
      conn = put(conn, ~p"/api/etfs/#{etf}", etf: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/etfs/#{id}")

      assert %{
               "id" => ^id,
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, etf: etf} do
      conn = put(conn, ~p"/api/etfs/#{etf}", etf: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete etf" do
    setup [:create_etf]

    test "deletes chosen etf", %{conn: conn, etf: etf} do
      conn = delete(conn, ~p"/api/etfs/#{etf}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/etfs/#{etf}")
      end
    end
  end

  defp create_etf(_) do
    etf = etf_fixture()
    %{etf: etf}
  end
end
