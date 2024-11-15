# frozen_string_literal: true

module ToDoItems
  class FilterService
    attr_reader :status

    def initialize(status)
      @status = status
    end

    def call
      return { error: 'Invalid status', status: :unprocessable_entity } if invalid_status?

      { data: filtered_items, status: :ok }
    end

    private

    def invalid_status?
      ToDoItem.statuses.keys.exclude?(status)
    end

    def filtered_items
      ToDoItem.where(status: status)
    end
  end
end
