defmodule Bones.AssociationTest do
  use Bones.DataCase

  alias Bones.Association

  describe "etf_moeda_associations" do
    alias Bones.Association.EtfMoedaAssociation

    import Bones.AssociationFixtures

    @invalid_attrs %{etf_id: nil, moeda_id: nil}

    test "list_etf_moeda_associations/0 returns all etf_moeda_associations" do
      etf_moeda_association = etf_moeda_association_fixture()
      assert Association.list_etf_moeda_associations() == [etf_moeda_association]
    end

    test "get_etf_moeda_association!/1 returns the etf_moeda_association with given id" do
      etf_moeda_association = etf_moeda_association_fixture()

      assert Association.get_etf_moeda_association!(etf_moeda_association.id) ==
               etf_moeda_association
    end

    test "create_etf_moeda_association/1 with valid data creates a etf_moeda_association" do
      valid_attrs = %{
        etf_id: "7488a646-e31f-11e4-aace-600308960662",
        moeda_id: "7488a646-e31f-11e4-aace-600308960662"
      }

      assert {:ok, %EtfMoedaAssociation{} = etf_moeda_association} =
               Association.create_etf_moeda_association(valid_attrs)

      assert etf_moeda_association.etf_id == "7488a646-e31f-11e4-aace-600308960662"
      assert etf_moeda_association.moeda_id == "7488a646-e31f-11e4-aace-600308960662"
    end

    test "create_etf_moeda_association/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} =
               Association.create_etf_moeda_association(@invalid_attrs)
    end

    test "update_etf_moeda_association/2 with valid data updates the etf_moeda_association" do
      etf_moeda_association = etf_moeda_association_fixture()

      update_attrs = %{
        etf_id: "7488a646-e31f-11e4-aace-600308960668",
        moeda_id: "7488a646-e31f-11e4-aace-600308960668"
      }

      assert {:ok, %EtfMoedaAssociation{} = etf_moeda_association} =
               Association.update_etf_moeda_association(etf_moeda_association, update_attrs)

      assert etf_moeda_association.etf_id == "7488a646-e31f-11e4-aace-600308960668"
      assert etf_moeda_association.moeda_id == "7488a646-e31f-11e4-aace-600308960668"
    end

    test "update_etf_moeda_association/2 with invalid data returns error changeset" do
      etf_moeda_association = etf_moeda_association_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Association.update_etf_moeda_association(etf_moeda_association, @invalid_attrs)

      assert etf_moeda_association ==
               Association.get_etf_moeda_association!(etf_moeda_association.id)
    end

    test "delete_etf_moeda_association/1 deletes the etf_moeda_association" do
      etf_moeda_association = etf_moeda_association_fixture()

      assert {:ok, %EtfMoedaAssociation{}} =
               Association.delete_etf_moeda_association(etf_moeda_association)

      assert_raise Ecto.NoResultsError, fn ->
        Association.get_etf_moeda_association!(etf_moeda_association.id)
      end
    end

    test "change_etf_moeda_association/1 returns a etf_moeda_association changeset" do
      etf_moeda_association = etf_moeda_association_fixture()
      assert %Ecto.Changeset{} = Association.change_etf_moeda_association(etf_moeda_association)
    end
  end
end
