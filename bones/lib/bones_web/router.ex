defmodule BonesWeb.Router do
  use BonesWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", BonesWeb do
    pipe_through :api
  end

  # Enable Swoosh mailbox preview in development
  if Application.compile_env(:bones, :dev_routes) do

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
