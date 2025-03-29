defmodule Bones.Repo.Migrations.CreateBasketAssociation do
  use Ecto.Migration

  def change do
    create table(:basket_association, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :etf_id, :uuid
      add :moeda_id, :uuid

      timestamps(type: :utc_datetime)
    end
  end
end
