Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :to_do_items do
        collection do
          get :filter_by_status
        end
      end
    end
  end
end
