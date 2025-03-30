defmodule Bones.Resources.BasketAssociation do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "basket_association" do
    field :etf_id, Ecto.UUID
    field :moeda_id, Ecto.UUID
    field :percentage, :float

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(basket_association, attrs) do
    basket_association
    |> cast(attrs, [:etf_id, :moeda_id, :percentage])
    |> validate_required([:etf_id, :moeda_id, :percentage])
  end
end
