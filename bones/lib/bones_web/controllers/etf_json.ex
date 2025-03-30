defmodule BonesWeb.EtfJSON do
  alias Bones.Resources.Etf
  alias Bones.Resources.BasketAssociation
  alias Bones.Resources.Coin

  @doc """
  Renders a list of etfs.
  """
  def index(%{etfs: etfs}) do
    %{data: for(etf <- etfs, do: data(etf))}
  end

  @doc """
  Renders a single etf.
  """

  #def etf_to_coins(etf_uuid) do
  #  BasketAssociation
  #  |> where([a], a.etf_id == ^etf_uuid)
  #  |>Repo.all()
  #end

  def show(%{etf: etf}) do
    %{data: data(etf)}
  end

  defp data(%Etf{} = etf) do
    %{
      id: etf.id,
      name: etf.name,
      short_name: etf.short_name,
      growth: etf.growth
    }
  end
end
