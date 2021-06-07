Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show] do 
      resources :playlists, only: [:create, :destroy, :update, :show]
    end


    resource :session, only: [:create], as: 'new_session'
    resource :session, only: [:destroy]
    # resources :likes, only: [:create, :destroy]

  end

  root to: 'static_pages#root'
end
