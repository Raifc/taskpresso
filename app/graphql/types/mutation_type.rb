# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_to_do_item, mutation: Mutations::CreateToDoItem
    field :update_to_do_item, mutation: Mutations::UpdateToDoItem
    field :delete_to_do_item, mutation: Mutations::DeleteToDoItem
    field :complete_to_do_item, mutation: Mutations::CompleteToDoItem
  end
end
