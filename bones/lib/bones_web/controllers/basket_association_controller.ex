defmodule BonesWeb.BasketAssociationController do
  use BonesWeb, :controller

  alias Bones.Resources
  alias Bones.Resources.BasketAssociation

  action_fallback BonesWeb.FallbackController

  def index(conn, _params) do
    basket_association = Resources.list_basket_association()
    render(conn, :index, basket_association: basket_association)
  end

  def create(conn, %{"basket_association" => basket_association_params}) do
    with {:ok, %BasketAssociation{} = basket_association} <- Resources.create_basket_association(basket_association_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/basket_association/#{basket_association}")
      |> render(:show, basket_association: basket_association)
    end
  end

  def show(conn, %{"id" => id}) do
    basket_association = Resources.get_basket_association!(id)
    render(conn, :show, basket_association: basket_association)
  end

  def update(conn, %{"id" => id, "basket_association" => basket_association_params}) do
    basket_association = Resources.get_basket_association!(id)

    with {:ok, %BasketAssociation{} = basket_association} <- Resources.update_basket_association(basket_association, basket_association_params) do
      render(conn, :show, basket_association: basket_association)
    end
  end

  def delete(conn, %{"id" => id}) do
    basket_association = Resources.get_basket_association!(id)

    with {:ok, %BasketAssociation{}} <- Resources.delete_basket_association(basket_association) do
      send_resp(conn, :no_content, "")
    end
  end
end
