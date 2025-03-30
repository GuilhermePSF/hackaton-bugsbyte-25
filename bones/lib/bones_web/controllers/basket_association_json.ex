defmodule BonesWeb.BasketAssociationJSON do
  alias Bones.Resources.BasketAssociation

  @doc """
  Renders a list of basket_association.
  """
  def index(%{basket_association: basket_association}) do
    %{data: for(basket_association <- basket_association, do: data(basket_association))}
  end

  @doc """
  Renders a single basket_association.
  """
  def show(%{basket_association: basket_association}) do
    %{data: data(basket_association)}
  end

  defp data(%BasketAssociation{} = basket_association) do
    %{
      id: basket_association.id,
      etf_id: basket_association.etf_id,
      moeda_id: basket_association.moeda_id,
      percentage: basket_association.percentage
    }
  end
end
