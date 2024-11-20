# frozen_string_literal: true

module Types
  class ToDoItemPaginationType < Types::BaseObject
    field :to_do_items, [Types::ToDoItemType], null: false
    field :current_page, Integer, null: false
    field :next_page, Integer, null: true
    field :prev_page, Integer, null: true
    field :total_pages, Integer, null: false
    field :total_count, Integer, null: false
  end
end
