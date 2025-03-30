defmodule Bones.Repo.Migrations.CreateEtfs do
  use Ecto.Migration

  def change do
    create table(:etfs, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :short_name, :string
      add :growth, :float

      timestamps(type: :utc_datetime)
    end
  end
end
