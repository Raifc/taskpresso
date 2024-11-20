require 'rails_helper'

RSpec.describe 'GraphQL Queries', type: :request do
  describe 'toDoItems Query' do
    before do
      create_list(:to_do_item, 25)
    end

    it 'returns paginated to-do items with metadata' do
      post '/graphql', params: {
        query: <<~GQL
          query {
            toDoItems(page: 1, perPage: 10) {
              toDoItems {
                id
                title
              }
              currentPage
              nextPage
              prevPage
              totalPages
              totalCount
            }
          }
        GQL
      }

      json = JSON.parse(response.body)
      data = json['data']['toDoItems']

      expect(data['toDoItems'].size).to eq(10)
      expect(data['currentPage']).to eq(1)
      expect(data['nextPage']).to eq(2)
      expect(data['totalPages']).to eq(3)
      expect(data['totalCount']).to eq(25)
    end
  end

  describe 'filterToDoItemsByStatus Query' do
    before do
      create_list(:to_do_item, 15, status: 'pending')
      create_list(:to_do_item, 10, status: 'complete')
    end

    it 'returns paginated filtered to-do items with metadata' do
      post '/graphql', params: {
        query: <<~GQL
          query {
            filterToDoItemsByStatus(status: "pending", page: 1, perPage: 10) {
              toDoItems {
                id
                title
                status
              }
              currentPage
              nextPage
              prevPage
              totalPages
              totalCount
            }
          }
        GQL
      }

      json = JSON.parse(response.body)
      data = json['data']['filterToDoItemsByStatus']

      expect(data['toDoItems'].size).to eq(10)
      expect(data['toDoItems'].all? { |item| item['status'] == 'pending' }).to be true
      expect(data['currentPage']).to eq(1)
      expect(data['totalPages']).to eq(2)
      expect(data['totalCount']).to eq(15)
    end
  end
end
