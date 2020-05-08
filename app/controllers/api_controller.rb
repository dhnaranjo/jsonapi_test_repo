class ApiController < ApplicationController
  include JSONAPI::ActsAsResourceController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session

  def context
    {current_user: current_user}
  end
end
