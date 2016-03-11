Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  #STATIC PAGE ROUTES
  root 'page#home'
  get '/filters', to: 'page#filters'
  get '/profile/:user_id', to: 'page#user_profile'
  get '/maps/create', to: 'page#map_create'
  get '/maps/:map_id', to: 'page#map_show'
  get '/maps/:map_id/comments', to: 'page#map_comments'

  #API routes
  namespace :api do
    #LIKE
    resources :likes, only: [:create, :destroy]
    #MAP
    get '/maps/filter', to: 'maps#filter'
    get '/users/maps/', to: 'maps#user_maps'
    resources :maps, only: [:index, :create, :show, :update, :destroy] do
    #COMMENT
      resources :comments, only: [:index, :create, :destroy]
    end

    #PIN
    resources :pins, only: [:create, :update, :destroy]

    #USER
    resources :users, only: [:show] do
      post '/image', to: 'users#image'
    end
  end

end
