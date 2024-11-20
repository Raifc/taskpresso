# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :to_do_items, Types::ToDoItemPaginationType, null: false do
      argument :page, Integer, required: false, default_value: 1
      argument :per_page, Integer, required: false, default_value: 10
    end

    field :to_do_item, Types::ToDoItemType, null: false do
      argument :id, ID, required: true
    end

    field :filter_to_do_items_by_status, Types::ToDoItemPaginationType, null: false do
      argument :status, String, required: false
      argument :page, Integer, required: false, default_value: 1
      argument :per_page, Integer, required: false, default_value: 10
    end

    def to_do_items(page:, per_page:)
      paginated_items = ToDoItem.page(page).per(per_page)
      generate_pagination_response(paginated_items)
    end

    def to_do_item(id:)
      ToDoItem.find(id)
    rescue ActiveRecord::RecordNotFound
      GraphQL::ExecutionError.new("ToDoItem with id #{id} not found")
    end

    def filter_to_do_items_by_status(status: nil, page:, per_page:)
      items = status.present? ? ToDoItems::FilterService.new(status).call[:data] : ToDoItem.all
      paginated_items = items.page(page).per(per_page)
      generate_pagination_response(paginated_items)
    end

    private

    def generate_pagination_response(paginated_items)
      {
        to_do_items: paginated_items,
        current_page: paginated_items.current_page,
        next_page: paginated_items.next_page,
        prev_page: paginated_items.prev_page,
        total_pages: paginated_items.total_pages,
        total_count: paginated_items.total_count
      }
    end
  end
end
