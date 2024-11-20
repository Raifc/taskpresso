# frozen_string_literal: true

module ToDoItems
  class PaginationService
    def self.paginate(collection, params)
      collection.page(params[:page]).per(params[:per_page] || 10)
    end

    def self.meta(collection)
      {
        current_page: collection.current_page,
        next_page: collection.next_page,
        prev_page: collection.prev_page,
        total_pages: collection.total_pages,
        total_count: collection.total_count
      }
    end
  end
end
