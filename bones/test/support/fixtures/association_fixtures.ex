defmodule Bones.AssociationFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Bones.Association` context.
  """

  @doc """
  Generate a etf_moeda_association.
  """
  def etf_moeda_association_fixture(attrs \\ %{}) do
    {:ok, etf_moeda_association} =
      attrs
      |> Enum.into(%{
        etf_id: "7488a646-e31f-11e4-aace-600308960662",
        moeda_id: "7488a646-e31f-11e4-aace-600308960662"
      })
      |> Bones.Association.create_etf_moeda_association()

    etf_moeda_association
  end
end
