defmodule Bones.Resources.Etf do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "etfs" do
    field :name, :string
    field :short_name, :string
    field :growth, :float

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(etf, attrs) do
    etf
    |> cast(attrs, [:name, :short_name, :growth])
    |> validate_required([:name, :short_name, :growth])
  end
end
