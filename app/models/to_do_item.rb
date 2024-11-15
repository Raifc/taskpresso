# frozen_string_literal: true

class ToDoItem < ApplicationRecord
  enum status: { pending: 0, complete: 1 }

  validates :title, presence: true
end
