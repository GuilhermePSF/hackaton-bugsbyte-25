defmodule Bones.Repo.Seeds.Association do
  alias Bones.Repo
  alias Bones.Resources.Coin
  alias Bones.Resources.Etf
  alias Bones.Resources.BasketAssociation
  import Ecto.Query, warn: false
  require Logger

  def get_kline_field(field, url, index \\ 0) do
    {:ok, body} = HTTPoison.get!(url).body |> Jason.decode()

    # Get the kline data based on the index
    kline = Enum.at(body, index)

    # Extract the fields from the selected kline
    [open_time, open_price, high_price, low_price, close_price, _volume | _] = kline

    case field do
      :open_time -> open_time
      :open_price -> open_price
      :high_price -> high_price
      :low_price -> low_price
      :close_price -> close_price
      _ -> {:error, "Invalid field"}
    end
  end

  defp distribute_percentage(num_coins) do
    case num_coins do
      2 -> [50.0, 50.0]
      3 -> [50.0, 25.0, 25.0]
      4 -> [50.0, 25.0, 12.5, 12.5]
      5 -> [50.0, 20.0, 12.5, 8.75, 8.75]
      _ -> {:error, "Invalid number of coins"}
    end
  end

  def seed do
    # Create 20 ETFs and insert them into the database
    etf_uuids = for _i <- 1..20 do
      %Etf{id: Ecto.UUID.generate()}
      |> Repo.insert!()
      |> Map.get(:id) # Get the generated UUID of each ETF
    end
    # Get all coins from the database
    coins = Repo.all(Coin)

    # Create 20 BasketAssociations
    for etf <- etf_uuids do
      etf_uuid = etf

      # Pick between 2 and 5 random Coins (without repetition)
      num_coins = Enum.random(2..5)
      selected_coins = Enum.take_random(coins, num_coins)

      # Calculate the percentages for the coins (sum should be 100)
      percentages = distribute_percentage(num_coins)

      # Create the associations
      Enum.each(Enum.zip(selected_coins, percentages), fn {coin, percentage} ->
        %BasketAssociation{
          id: Ecto.UUID.generate(),
          etf_id: etf_uuid,
          moeda_id: coin.id,
          percentage: percentage
        }
        |> Repo.insert!()
      end)
    end
  end
end

Bones.Repo.Seeds.Association.seed()
