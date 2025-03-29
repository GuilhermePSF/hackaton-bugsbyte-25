defmodule BonesWeb.EtfController do
  use BonesWeb, :controller

  alias Bones.Resources
  alias Bones.Resources.Etf

  action_fallback BonesWeb.FallbackController

  def index(conn, _params) do
    etfs = Resources.list_etfs()
    render(conn, :index, etfs: etfs)
  end

  def create(conn, %{"etf" => etf_params}) do
    with {:ok, %Etf{} = etf} <- Resources.create_etf(etf_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/etfs/#{etf}")
      |> render(:show, etf: etf)
    end
  end

  def show(conn, %{"id" => id}) do
    etf = Resources.get_etf!(id)
    render(conn, :show, etf: etf)
  end

  def update(conn, %{"id" => id, "etf" => etf_params}) do
    etf = Resources.get_etf!(id)

    with {:ok, %Etf{} = etf} <- Resources.update_etf(etf, etf_params) do
      render(conn, :show, etf: etf)
    end
  end

  def delete(conn, %{"id" => id}) do
    etf = Resources.get_etf!(id)

    with {:ok, %Etf{}} <- Resources.delete_etf(etf) do
      send_resp(conn, :no_content, "")
    end
  end
end
