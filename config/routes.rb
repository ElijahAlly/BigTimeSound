Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show] do 
      resources :playlists, only: [:create, :destroy, :update, :show, :index]
      resources :playlist_inclusions, only: [:index]
      resources :likes, only: [:index, :create, :destroy,]
    end

    resources :search, only: :index
    resources :albums, only: :index
    resources :artists, only: :index
    resources :songs, only: [:show, :index]
    resource :session, only: [:create, :destroy]
  end

  root to: 'static_pages#root'
end
