# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :to_do_items, [Types::ToDoItemType], null: false
    field :to_do_item, Types::ToDoItemType, null: false do
      argument :id, ID, required: true
    end
    field :filter_to_do_items_by_status, [Types::ToDoItemType], null: true do
      argument :status, String, required: false
    end

    def to_do_items
      ToDoItem.all
    end

    def to_do_item(id:)
      ToDoItem.find(id)
    rescue ActiveRecord::RecordNotFound
      GraphQL::ExecutionError.new("ToDoItem with id #{id} not found")
    end

    def filter_to_do_items_by_status(status:)
      return ToDoItem.all unless status

      to_do_items = ToDoItems::FilterService.new(status).call[:data]
      to_do_items.present? ? to_do_items : []
    end
  end
end
