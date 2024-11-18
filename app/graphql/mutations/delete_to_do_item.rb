# frozen_string_literal: true

module Mutations
  class DeleteToDoItem < BaseMutation
    argument :id, ID, required: true

    type Types::ToDoItemType

    def resolve(id:)
      to_do_item = ToDoItem.find(id)
      to_do_item.destroy
      to_do_item
    rescue ActiveRecord::RecordNotFound
      GraphQL::ExecutionError.new("ToDoItem with id #{id} not found")
    end
  end
end
