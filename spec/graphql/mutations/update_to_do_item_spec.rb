# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'UpdateToDoItem Mutation', type: :request do
  describe 'update_to_do_item' do
    let!(:to_do_item) { create(:to_do_item, title: 'Original Task', status: 'pending') }

    let(:mutation) do
      <<~GQL
        mutation($id: ID!, $title: String, $description: String, $status: String, $dueDate: ISO8601DateTime) {
          updateToDoItem(input: {
            id: $id,
            title: $title,
            description: $description,
            status: $status,
            dueDate: $dueDate
          }) {
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

    it 'updates an existing to_do_item with valid inputs' do
      variables = { id: to_do_item.id, title: 'Updated Task', status: 'complete' }
      post '/graphql', params: { query: mutation, variables: variables }
      json = JSON.parse(response.body)

      expect(json['data']['updateToDoItem']['title']).to eq('Updated Task')
      expect(json['data']['updateToDoItem']['status']).to eq('complete')
    end

    it 'returns an error for a non-existing to_do_item id' do
      variables = { id: -1, title: 'Nonexistent Task' }
      post '/graphql', params: { query: mutation, variables: variables }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end
end
