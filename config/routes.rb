# frozen_string_literal: true

Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  namespace :api do
    namespace :v1 do
      resources :to_do_items do
        collection do
          get :filter_by_status
        end

        member do
          put :complete
        end
      end
    end
  end
end
