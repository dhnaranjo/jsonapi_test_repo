class Api::UsersController < ApiController
  def dumpy_index
    render json: User.all.includes(:fears, :flavors, :things).as_json(include: [:fears, :flavors, :things])
  end
end
