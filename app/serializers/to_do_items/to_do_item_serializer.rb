# frozen_string_literal: true

module ToDoItems
  class ToDoItemSerializer < ActiveModel::Serializer
      attributes :id, :title, :description, :status, :due_date, :created_at, :updated_at, :formatted_due_date

      def formatted_due_date
        object.due_date.strftime('%B %d, %Y') if object.due_date
      end
  end
end
