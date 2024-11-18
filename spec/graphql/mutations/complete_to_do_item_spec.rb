# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'CompleteToDoItem Mutation', type: :request do
  describe 'complete_to_do_item' do
    let!(:to_do_item) { create(:to_do_item, status: 'pending') }

    let(:mutation) do
      <<~GQL
        mutation($id: ID!) {
          completeToDoItem(input: {
            id: $id
          }) {
            id
            status
          }
        }
      GQL
    end

    it 'marks a to_do_item as complete with valid id' do
      variables = { id: to_do_item.id }

      post '/graphql', params: { query: mutation, variables: variables }
      json = JSON.parse(response.body)

      expect(json['data']['completeToDoItem']['status']).to eq('complete')
    end

    it 'returns an error for a non-existing to_do_item id' do
      variables = { id: -1 }

      post '/graphql', params: { query: mutation, variables: variables }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end
end
