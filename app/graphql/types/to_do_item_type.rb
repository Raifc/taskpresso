# frozen_string_literal: true

module Types
  class ToDoItemType < Types::BaseObject
    field :id, String, null: false
    field :title, String, null: false
    field :description, String, null: true
    field :status, String, null: true
    field :due_date, GraphQL::Types::ISO8601DateTime, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
