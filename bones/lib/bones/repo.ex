defmodule Bones.Repo do
  use Ecto.Repo,
    otp_app: :bones,
    adapter: Ecto.Adapters.MyXQL
end
