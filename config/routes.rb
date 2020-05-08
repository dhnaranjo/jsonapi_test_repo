Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    get "dumpy_users", to: "users#dumpy_index"
    jsonapi_resources :users
    jsonapi_resources :things
    jsonapi_resources :fears
    get "*path", to: ->(_params) { raise ActionController::RoutingError.new("Not found") }
  end

  root "home#index"

  get "*path", to: "home#index", constraints: {format: "html"}
end
