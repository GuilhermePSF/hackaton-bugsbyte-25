defmodule Bones.Resources.Coin do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "coins" do
    field :name, :string
    field :short_name, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(coin, attrs) do
    coin
    |> cast(attrs, [:name, :short_name])
    |> validate_required([:name, :short_name])
  end
end
