defmodule Bones.Repo.Seeds.Etfs do
  alias Bones.Repo
  alias Bones.Resources
  alias Bones.Resources.Coin
  alias Bones.Resources.BasketAssociation
  import Ecto.Query
  require Logger

  @etfs [
    {"MemeCoin Mayhem", "MMC-MH"},
    {"Shiba & Friends", "SHB-FR"},
    {"The Doge Dynasty", "DOG-DY"},
    {"Top 5 HODLers", "TOP5-HD"},
    {"Memer’s Paradise", "MEM-PR"},
    {"Dogecoin & Friends", "DOG-FR"},
    {"The Meme Rush", "MEM-RS"},
    {"The Meme Machine", "MEM-MC"},
    {"Paws & Coins", "PAW-CN"},
    {"Hodl & LOL", "HDL-LOL"},
    {"The Doge Brigade", "DOG-BR"},
    {"Hodl the Memes", "HDL-MEM"},
    {"To the Moon, Meme Edition", "TTM-ME"},
    {"MemeMarket Madness", "MMM-MS"},
    {"ShibaCoin Squad", "SHB-SQ"},
    {"The Doge Pack", "DOG-PK"},
    {"Top Meme Legion", "TML-ME"},
    {"MemeCoin Frenzy", "MEM-FR"},
    {"Moonshot Memes", "MSH-ME"},
    {"MemeCoin Vault", "MEM-VT"}
  ]

   def etf_to_coins(etf_uuid) do
    associations = Repo.all(from a in BasketAssociation, where: a.etf_id == ^etf_uuid)
    moeda_ids = Enum.map(associations, & &1.moeda_id)
    Repo.all(from coin in Coin, where: coin.id in ^moeda_ids)
  end

  defp calculate_etf_growth(etf_uuid) do
    associations = Repo.all(from a in BasketAssociation, where: a.etf_id == ^etf_uuid)
    moeda_ids = Enum.map(associations, & &1.moeda_id)
    coins = Repo.all(from coin in Coin, where: coin.id in ^moeda_ids)

    IO.inspect(coins)

    associations
    |> Enum.map(fn assoc ->
      case Enum.find(coins, fn coin -> coin.id == assoc.moeda_id end) do
        nil -> 0
        coin -> coin.growth * (assoc.percentage / 100)
      end
    end)
    |> Enum.sum()
  end

  def seed do
    etfs = Resources.list_etfs()

    etfs_with_names = Enum.zip(etfs, @etfs)

    for {etf, {name, short_name}} <- etfs_with_names do
      etf
      |> Resources.change_etf(%{
        name: name,
        short_name: short_name,
        growth: calculate_etf_growth(etf.id)
      })
      |> Repo.update!()
    end
  end
end

Bones.Repo.Seeds.Etfs.seed()
