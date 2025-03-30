defmodule Bones.Resources.Coin do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "coins" do
    field :name, :string
    field :short_name, :string
    field :price, :float
    field :growth, :float

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(coin, attrs) do
    coin
    |> cast(attrs, [:name, :short_name, :price, :growth])
    |> validate_required([:name, :short_name, :price, :growth])
  end
end
