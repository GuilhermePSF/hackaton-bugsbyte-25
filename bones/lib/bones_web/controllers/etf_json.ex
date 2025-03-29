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
  def show(%{etf: etf}) do
    %{data: data(etf)}
  end

  defp data(%Etf{} = etf) do
    %{
      id: etf.id,
      name: etf.name
    }
  end
end
