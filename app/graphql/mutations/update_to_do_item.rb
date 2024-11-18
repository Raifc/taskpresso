# frozen_string_literal: true

module Mutations
  class UpdateToDoItem < BaseMutation
    argument :id, ID, required: true
    argument :title, String, required: false
    argument :description, String, required: false
    argument :status, String, required: false
    argument :due_date, GraphQL::Types::ISO8601DateTime, required: false

    type Types::ToDoItemType

    def resolve(id:, **attributes)
      to_do_item = ToDoItem.find(id)
      to_do_item.update!(attributes)
      to_do_item
    rescue ActiveRecord::RecordNotFound
      GraphQL::ExecutionError.new("ToDoItem with id #{id} not found")
    end
  end
end
