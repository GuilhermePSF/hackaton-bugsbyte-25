defmodule Bones.Repo.Migrations.CreateEtfs do
  use Ecto.Migration

  def change do
    create table(:etfs, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string

      timestamps(type: :utc_datetime)
    end
  end
end
