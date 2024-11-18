# frozen_string_literal: true

module Mutations
  class CreateToDoItem < BaseMutation
    argument :title, String, required: true
    argument :description, String, required: false
    argument :status, String, required: false
    argument :due_date, GraphQL::Types::ISO8601DateTime, required: false

    type Types::ToDoItemType

    def resolve(title:, description: nil, status: nil, due_date: nil)
      ToDoItem.create!(
        title: title,
        description: description,
        status: status,
        due_date: due_date
      )
    end
  end
end
