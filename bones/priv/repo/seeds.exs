defmodule Bones.Repo.Seeds do
  # Script for populating the database. You can run it as:
  #
  #     mix run priv/repo/seeds.exs
  #
  # Inside the script, you can read and write to any of your
  # repositories directly:
  #
  #     Bones.Repo.insert!(%Bones.SomeSchema{})
  #
  # We recommend using the bang functions (`insert!`, `update!`
  # and so on) as they will fail if something goes wrong.
  @seeds_dir "priv/repo/seeds"

  def run do
    [
      "coins.exs",
      "association.exs",
      "etfs.exs"
    ]
    |> Enum.each(fn file ->
      Code.require_file("#{@seeds_dir}/#{file}")
    end)
  end
end

Bones.Repo.Seeds.run()
