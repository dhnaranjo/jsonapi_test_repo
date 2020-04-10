Rails.application.routes.draw do
  devise_for :users
  
  namespace :api do
    resources :users, only: [:index]
  end

  root "home#index"

  get "*path", to: "home#index", constraints: { format: "html" }
end
