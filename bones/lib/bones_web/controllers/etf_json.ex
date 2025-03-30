defmodule BonesWeb.EtfJSON do
  alias Bones.Resources.Etf

  @doc """
  Renders a list of etfs.
  """
  def index(%{etfs: etfs}) do
    %{data: for(etf <- etfs, do: data(etf))}
  end

  @doc """
  Renders a single etf.
  """
  
  defp calculate_etf_growth(etf_uuid) do
    associations = Repo.all(from ass in BasketAssociation, where: ass.etf_id == ^etf_uuid)
    moeda_ids = Enum.map(associations, & &1.moeda_id)
    coins = Repo.all(from coin in Coin, where: coin.id in ^moeda_ids)
  end

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
