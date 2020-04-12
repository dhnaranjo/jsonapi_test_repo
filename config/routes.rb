Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    jsonapi_resources :users
    jsonapi_resources :things
    get "*path", to: ->(_params) { raise ActionController::RoutingError.new('Not found') }
  end

  root "home#index"

  get "*path", to: "home#index", constraints: { format: "html" }
end
