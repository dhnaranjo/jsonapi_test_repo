class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    render component: "App", props: {path: params[:path] || "/"}, tag: "div", prerender: false
  end
end
