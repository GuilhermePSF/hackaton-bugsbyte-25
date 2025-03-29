defmodule Bones.FinanceTest do
  use Bones.DataCase

  alias Bones.Finance

  describe "etfs" do
    alias Bones.Finance.ETF

    import Bones.FinanceFixtures

    @invalid_attrs %{name: nil}

    test "list_etfs/0 returns all etfs" do
      etf = etf_fixture()
      assert Finance.list_etfs() == [etf]
    end

    test "get_etf!/1 returns the etf with given id" do
      etf = etf_fixture()
      assert Finance.get_etf!(etf.id) == etf
    end

    test "create_etf/1 with valid data creates a etf" do
      valid_attrs = %{name: "some name"}

      assert {:ok, %ETF{} = etf} = Finance.create_etf(valid_attrs)
      assert etf.name == "some name"
    end

    test "create_etf/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Finance.create_etf(@invalid_attrs)
    end

    test "update_etf/2 with valid data updates the etf" do
      etf = etf_fixture()
      update_attrs = %{name: "some updated name"}

      assert {:ok, %ETF{} = etf} = Finance.update_etf(etf, update_attrs)
      assert etf.name == "some updated name"
    end

    test "update_etf/2 with invalid data returns error changeset" do
      etf = etf_fixture()
      assert {:error, %Ecto.Changeset{}} = Finance.update_etf(etf, @invalid_attrs)
      assert etf == Finance.get_etf!(etf.id)
    end

    test "delete_etf/1 deletes the etf" do
      etf = etf_fixture()
      assert {:ok, %ETF{}} = Finance.delete_etf(etf)
      assert_raise Ecto.NoResultsError, fn -> Finance.get_etf!(etf.id) end
    end

    test "change_etf/1 returns a etf changeset" do
      etf = etf_fixture()
      assert %Ecto.Changeset{} = Finance.change_etf(etf)
    end
  end
end
