Rails.application.routes.draw do


	root 'static_pages#root'
	
  resources :users
	resource :session
	
	namespace :api, defaults: { format: :json } do
		resources :profiles, only: [:show, :update]
	  resources :boats, only: [:show, :index, :create]
		resources :reservations, only: [:create, :update, :destroy]
	end
 end
