defmodule Bones.ResourcesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Bones.Resources` context.
  """

  @doc """
  Generate a basket_association.
  """
  def basket_association_fixture(attrs \\ %{}) do
    {:ok, basket_association} =
      attrs
      |> Enum.into(%{
        etf_id: "7488a646-e31f-11e4-aace-600308960662",
        moeda_id: "7488a646-e31f-11e4-aace-600308960662"
      })
      |> Bones.Resources.create_basket_association()

    basket_association
  end

  @doc """
  Generate a coin.
  """
  def coin_fixture(attrs \\ %{}) do
    {:ok, coin} =
      attrs
      |> Enum.into(%{
        name: "some name",
        short_name: "some short_name"
      })
      |> Bones.Resources.create_coin()

    coin
  end

  @doc """
  Generate a etf.
  """
  def etf_fixture(attrs \\ %{}) do
    {:ok, etf} =
      attrs
      |> Enum.into(%{
        name: "some name"
      })
      |> Bones.Resources.create_etf()

    etf
  end
end
