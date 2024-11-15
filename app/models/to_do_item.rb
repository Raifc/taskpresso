# app/models/to_do_item.rb

class ToDoItem < ApplicationRecord
  enum status: { pending: 0, complete: 1 }

  validates :title, presence: true
end
