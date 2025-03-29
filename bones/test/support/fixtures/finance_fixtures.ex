defmodule Bones.FinanceFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Bones.Finance` context.
  """

  @doc """
  Generate a etf.
  """
  def etf_fixture(attrs \\ %{}) do
    {:ok, etf} =
      attrs
      |> Enum.into(%{
        name: "some name"
      })
      |> Bones.Finance.create_etf()

    etf
  end
end
