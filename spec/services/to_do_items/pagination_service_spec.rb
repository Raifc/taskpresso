# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ToDoItems::PaginationService, type: :service do
  let!(:to_do_items) { create_list(:to_do_item, 25) }

  describe '.paginate' do
    context 'with default per_page' do
      it 'returns the first 10 items for page 1' do
        result = ToDoItems::PaginationService.paginate(ToDoItem.all, { page: 1 })
        expect(result.size).to eq(10)
        expect(result.first).to eq(to_do_items.first)
      end

      it 'returns the next 10 items for page 2' do
        result = ToDoItems::PaginationService.paginate(ToDoItem.all, { page: 2 })
        expect(result.size).to eq(10)
        expect(result.first).to eq(to_do_items[10])
      end
    end

    context 'with custom per_page' do
      it 'returns the correct number of items per page' do
        result = ToDoItems::PaginationService.paginate(ToDoItem.all, { page: 1, per_page: 5 })
        expect(result.size).to eq(5)
      end
    end

    context 'with no results' do
      it 'returns an empty collection for a non-existent page' do
        result = ToDoItems::PaginationService.paginate(ToDoItem.all, { page: 999 })
        expect(result.size).to eq(0)
      end
    end
  end

  describe '.meta' do
    it 'returns the correct metadata for the collection' do
      paginated_collection = ToDoItems::PaginationService.paginate(ToDoItem.all, { page: 1 })
      meta = ToDoItems::PaginationService.meta(paginated_collection)

      expect(meta[:current_page]).to eq(1)
      expect(meta[:next_page]).to eq(2)
      expect(meta[:prev_page]).to eq(nil)
      expect(meta[:total_pages]).to eq(3)
      expect(meta[:total_count]).to eq(25)
    end
  end
end
