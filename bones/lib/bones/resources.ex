defmodule Bones.Resources do
  @moduledoc """
  The Resources context.
  """

  import Ecto.Query, warn: false
  alias Bones.Repo

  alias Bones.Resources.BasketAssociation

  @doc """
  Returns the list of basket_association.

  ## Examples

      iex> list_basket_association()
      [%BasketAssociation{}, ...]

  """
  def list_basket_association do
    Repo.all(BasketAssociation)
  end

  @doc """
  Gets a single basket_association.

  Raises `Ecto.NoResultsError` if the Basket association does not exist.

  ## Examples

      iex> get_basket_association!(123)
      %BasketAssociation{}

      iex> get_basket_association!(456)
      ** (Ecto.NoResultsError)

  """
  def get_basket_association!(id), do: Repo.get!(BasketAssociation, id)

  @doc """
  Creates a basket_association.

  ## Examples

      iex> create_basket_association(%{field: value})
      {:ok, %BasketAssociation{}}

      iex> create_basket_association(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_basket_association(attrs \\ %{}) do
    %BasketAssociation{}
    |> BasketAssociation.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a basket_association.

  ## Examples

      iex> update_basket_association(basket_association, %{field: new_value})
      {:ok, %BasketAssociation{}}

      iex> update_basket_association(basket_association, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_basket_association(%BasketAssociation{} = basket_association, attrs) do
    basket_association
    |> BasketAssociation.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a basket_association.

  ## Examples

      iex> delete_basket_association(basket_association)
      {:ok, %BasketAssociation{}}

      iex> delete_basket_association(basket_association)
      {:error, %Ecto.Changeset{}}

  """
  def delete_basket_association(%BasketAssociation{} = basket_association) do
    Repo.delete(basket_association)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking basket_association changes.

  ## Examples

      iex> change_basket_association(basket_association)
      %Ecto.Changeset{data: %BasketAssociation{}}

  """
  def change_basket_association(%BasketAssociation{} = basket_association, attrs \\ %{}) do
    BasketAssociation.changeset(basket_association, attrs)
  end

  alias Bones.Resources.Coin

  @doc """
  Returns the list of coins.

  ## Examples

      iex> list_coins()
      [%Coin{}, ...]

  """
  def list_coins do
    Repo.all(Coin)
  end

  @doc """
  Gets a single coin.

  Raises `Ecto.NoResultsError` if the Coin does not exist.

  ## Examples

      iex> get_coin!(123)
      %Coin{}

      iex> get_coin!(456)
      ** (Ecto.NoResultsError)

  """
  def get_coin!(id), do: Repo.get!(Coin, id)

  @doc """
  Creates a coin.

  ## Examples

      iex> create_coin(%{field: value})
      {:ok, %Coin{}}

      iex> create_coin(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_coin(attrs \\ %{}) do
    %Coin{}
    |> Coin.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a coin.

  ## Examples

      iex> update_coin(coin, %{field: new_value})
      {:ok, %Coin{}}

      iex> update_coin(coin, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_coin(%Coin{} = coin, attrs) do
    coin
    |> Coin.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a coin.

  ## Examples

      iex> delete_coin(coin)
      {:ok, %Coin{}}

      iex> delete_coin(coin)
      {:error, %Ecto.Changeset{}}

  """
  def delete_coin(%Coin{} = coin) do
    Repo.delete(coin)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking coin changes.

  ## Examples

      iex> change_coin(coin)
      %Ecto.Changeset{data: %Coin{}}

  """
  def change_coin(%Coin{} = coin, attrs \\ %{}) do
    Coin.changeset(coin, attrs)
  end

  alias Bones.Resources.Etf

  @doc """
  Returns the list of etfs.

  ## Examples

      iex> list_etfs()
      [%Etf{}, ...]

  """
  def list_etfs do
    Repo.all(Etf)
  end

  @doc """
  Gets a single etf.

  Raises `Ecto.NoResultsError` if the Etf does not exist.

  ## Examples

      iex> get_etf!(123)
      %Etf{}

      iex> get_etf!(456)
      ** (Ecto.NoResultsError)

  """
  def get_etf!(id), do: Repo.get!(Etf, id)

  @doc """
  Creates a etf.

  ## Examples

      iex> create_etf(%{field: value})
      {:ok, %Etf{}}

      iex> create_etf(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_etf(attrs \\ %{}) do
    {:ok, etf} =
      %Etf{}
      |> Etf.changeset(attrs)
      |> Repo.insert()

    Enum.filter(:coins, attrs)
    |> Enum.map(fn coin ->
      create_basket_association(%{
        etf_id: etf.id,
        moeda_id: coin
      })
    end)
  end

  @doc """
  Updates a etf.

  ## Examples

      iex> update_etf(etf, %{field: new_value})
      {:ok, %Etf{}}

      iex> update_etf(etf, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_etf(%Etf{} = etf, attrs) do
    etf
    |> Etf.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a etf.

  ## Examples

      iex> delete_etf(etf)
      {:ok, %Etf{}}

      iex> delete_etf(etf)
      {:error, %Ecto.Changeset{}}

  """
  def delete_etf(%Etf{} = etf) do
    Repo.delete(etf)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking etf changes.

  ## Examples

      iex> change_etf(etf)
      %Ecto.Changeset{data: %Etf{}}

  """
  def change_etf(%Etf{} = etf, attrs \\ %{}) do
    Etf.changeset(etf, attrs)
  end
end
