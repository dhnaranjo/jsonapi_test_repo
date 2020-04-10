class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    render component: 'Home', props: { path: params[:path] || '/' }, tag: 'div'
  end
end
