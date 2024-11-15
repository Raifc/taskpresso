# frozen_string_literal: true

class ToDoItem < ApplicationRecord
  enum status: { pending: 'pending', complete: 'complete' }

  validates :title, presence: true
end
