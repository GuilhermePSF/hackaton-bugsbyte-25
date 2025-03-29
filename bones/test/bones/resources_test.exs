defmodule Bones.ResourcesTest do
  use Bones.DataCase

  alias Bones.Resources

  describe "basket_association" do
    alias Bones.Resources.BasketAssociation

    import Bones.ResourcesFixtures

    @invalid_attrs %{etf_id: nil, moeda_id: nil}

    test "list_basket_association/0 returns all basket_association" do
      basket_association = basket_association_fixture()
      assert Resources.list_basket_association() == [basket_association]
    end

    test "get_basket_association!/1 returns the basket_association with given id" do
      basket_association = basket_association_fixture()
      assert Resources.get_basket_association!(basket_association.id) == basket_association
    end

    test "create_basket_association/1 with valid data creates a basket_association" do
      valid_attrs = %{etf_id: "7488a646-e31f-11e4-aace-600308960662", moeda_id: "7488a646-e31f-11e4-aace-600308960662"}

      assert {:ok, %BasketAssociation{} = basket_association} = Resources.create_basket_association(valid_attrs)
      assert basket_association.etf_id == "7488a646-e31f-11e4-aace-600308960662"
      assert basket_association.moeda_id == "7488a646-e31f-11e4-aace-600308960662"
    end

    test "create_basket_association/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Resources.create_basket_association(@invalid_attrs)
    end

    test "update_basket_association/2 with valid data updates the basket_association" do
      basket_association = basket_association_fixture()
      update_attrs = %{etf_id: "7488a646-e31f-11e4-aace-600308960668", moeda_id: "7488a646-e31f-11e4-aace-600308960668"}

      assert {:ok, %BasketAssociation{} = basket_association} = Resources.update_basket_association(basket_association, update_attrs)
      assert basket_association.etf_id == "7488a646-e31f-11e4-aace-600308960668"
      assert basket_association.moeda_id == "7488a646-e31f-11e4-aace-600308960668"
    end

    test "update_basket_association/2 with invalid data returns error changeset" do
      basket_association = basket_association_fixture()
      assert {:error, %Ecto.Changeset{}} = Resources.update_basket_association(basket_association, @invalid_attrs)
      assert basket_association == Resources.get_basket_association!(basket_association.id)
    end

    test "delete_basket_association/1 deletes the basket_association" do
      basket_association = basket_association_fixture()
      assert {:ok, %BasketAssociation{}} = Resources.delete_basket_association(basket_association)
      assert_raise Ecto.NoResultsError, fn -> Resources.get_basket_association!(basket_association.id) end
    end

    test "change_basket_association/1 returns a basket_association changeset" do
      basket_association = basket_association_fixture()
      assert %Ecto.Changeset{} = Resources.change_basket_association(basket_association)
    end
  end

  describe "coins" do
    alias Bones.Resources.Coin

    import Bones.ResourcesFixtures

    @invalid_attrs %{name: nil, short_name: nil}

    test "list_coins/0 returns all coins" do
      coin = coin_fixture()
      assert Resources.list_coins() == [coin]
    end

    test "get_coin!/1 returns the coin with given id" do
      coin = coin_fixture()
      assert Resources.get_coin!(coin.id) == coin
    end

    test "create_coin/1 with valid data creates a coin" do
      valid_attrs = %{name: "some name", short_name: "some short_name"}

      assert {:ok, %Coin{} = coin} = Resources.create_coin(valid_attrs)
      assert coin.name == "some name"
      assert coin.short_name == "some short_name"
    end

    test "create_coin/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Resources.create_coin(@invalid_attrs)
    end

    test "update_coin/2 with valid data updates the coin" do
      coin = coin_fixture()
      update_attrs = %{name: "some updated name", short_name: "some updated short_name"}

      assert {:ok, %Coin{} = coin} = Resources.update_coin(coin, update_attrs)
      assert coin.name == "some updated name"
      assert coin.short_name == "some updated short_name"
    end

    test "update_coin/2 with invalid data returns error changeset" do
      coin = coin_fixture()
      assert {:error, %Ecto.Changeset{}} = Resources.update_coin(coin, @invalid_attrs)
      assert coin == Resources.get_coin!(coin.id)
    end

    test "delete_coin/1 deletes the coin" do
      coin = coin_fixture()
      assert {:ok, %Coin{}} = Resources.delete_coin(coin)
      assert_raise Ecto.NoResultsError, fn -> Resources.get_coin!(coin.id) end
    end

    test "change_coin/1 returns a coin changeset" do
      coin = coin_fixture()
      assert %Ecto.Changeset{} = Resources.change_coin(coin)
    end
  end

  describe "etfs" do
    alias Bones.Resources.Etf

    import Bones.ResourcesFixtures

    @invalid_attrs %{name: nil}

    test "list_etfs/0 returns all etfs" do
      etf = etf_fixture()
      assert Resources.list_etfs() == [etf]
    end

    test "get_etf!/1 returns the etf with given id" do
      etf = etf_fixture()
      assert Resources.get_etf!(etf.id) == etf
    end

    test "create_etf/1 with valid data creates a etf" do
      valid_attrs = %{name: "some name"}

      assert {:ok, %Etf{} = etf} = Resources.create_etf(valid_attrs)
      assert etf.name == "some name"
    end

    test "create_etf/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Resources.create_etf(@invalid_attrs)
    end

    test "update_etf/2 with valid data updates the etf" do
      etf = etf_fixture()
      update_attrs = %{name: "some updated name"}

      assert {:ok, %Etf{} = etf} = Resources.update_etf(etf, update_attrs)
      assert etf.name == "some updated name"
    end

    test "update_etf/2 with invalid data returns error changeset" do
      etf = etf_fixture()
      assert {:error, %Ecto.Changeset{}} = Resources.update_etf(etf, @invalid_attrs)
      assert etf == Resources.get_etf!(etf.id)
    end

    test "delete_etf/1 deletes the etf" do
      etf = etf_fixture()
      assert {:ok, %Etf{}} = Resources.delete_etf(etf)
      assert_raise Ecto.NoResultsError, fn -> Resources.get_etf!(etf.id) end
    end

    test "change_etf/1 returns a etf changeset" do
      etf = etf_fixture()
      assert %Ecto.Changeset{} = Resources.change_etf(etf)
    end
  end
end
