# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'ToDoItems Query', type: :request do
  describe 'to_do_items query' do
    let!(:to_do_items) { create_list(:to_do_item, 3) }

    let(:query) do
      <<~GQL
        query {
          toDoItems {
            id
            title
            description
            status
            dueDate
            createdAt
            updatedAt
          }
        }
      GQL
    end

    it 'returns all to_do_items' do
      post '/graphql', params: { query: query }

      json = JSON.parse(response.body)

      expect(json['data']['toDoItems'].size).to eq(3)
    end
  end

  describe 'to_do_item query' do
    let!(:to_do_item) { create(:to_do_item) }

    let(:query) do
      <<~GQL
        query($id: ID!) {
          toDoItem(id: $id) {
            id
            title
            description
            status
            dueDate
            createdAt
            updatedAt
          }
        }
      GQL
    end

    it 'returns a to_do_item by id' do
      post '/graphql', params: { query: query, variables: { id: to_do_item.id } }
      json = JSON.parse(response.body)

      expect(json['data']['toDoItem']['id']).to eq(to_do_item.id.to_s)
    end

    it 'returns an error for a non-existing to_do_item id' do
      post '/graphql', params: { query: query, variables: { id: -1 } }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end

  describe 'filter_to_do_items_by_status query' do
    let!(:completed_items) { create_list(:to_do_item, 2, status: 'complete') }
    let!(:pending_items) { create_list(:to_do_item, 2, status: 'pending') }

    let(:query) do
      <<~GQL
        query($status: String!) {
          filterToDoItemsByStatus(status: $status) {
            id
            title
            description
            status
            dueDate
          }
        }
      GQL
    end

    it 'returns to_do_items filtered by valid status' do
      post '/graphql', params: { query: query, variables: { status: 'complete' } }
      json = JSON.parse(response.body)

      expect(json['data']['filterToDoItemsByStatus'].size).to eq(2)
      expect(json['data']['filterToDoItemsByStatus'].all? { |item| item['status'] == 'complete' }).to be true
    end

    it 'returns an empty array for a status with no matching items' do
      post '/graphql', params: { query: query, variables: { status: 'nonexistent' } }

      json = JSON.parse(response.body)

      expect(json['data']['filterToDoItemsByStatus']).to be_empty
    end

    it 'handles invalid status values gracefully' do
      post '/graphql', params: { query: query, variables: { status: nil } }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end
end
