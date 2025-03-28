defmodule Bones.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      BonesWeb.Telemetry,
      Bones.Repo,
      {DNSCluster, query: Application.get_env(:bones, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Bones.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Bones.Finch},
      # Start a worker by calling: Bones.Worker.start_link(arg)
      # {Bones.Worker, arg},
      # Start to serve requests, typically the last entry
      BonesWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Bones.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    BonesWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
