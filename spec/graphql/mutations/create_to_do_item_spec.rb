# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'CreateToDoItem Mutation', type: :request do
  describe 'create_to_do_item' do
    let(:mutation) do
      <<~GQL
        mutation($title: String!, $description: String, $status: String, $dueDate: ISO8601DateTime) {
          createToDoItem(input: {
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

    it 'creates a new to_do_item with valid inputs' do
      variables = { title: 'New Task', description: 'Task description', status: 'pending', dueDate: Time.now.iso8601 }
      post '/graphql', params: { query: mutation, variables: variables }
      json = JSON.parse(response.body)

      expect(json['data']['createToDoItem']['title']).to eq('New Task')
    end

    it 'returns an error when title is missing' do
      variables = { description: 'Task description', status: 'pending', dueDate: Time.now.iso8601 }
      post '/graphql', params: { query: mutation, variables: variables }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end
end
