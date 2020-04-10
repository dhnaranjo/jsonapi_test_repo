class Api::UsersController < ApiController
  def index
    render json: User.all
  end
end