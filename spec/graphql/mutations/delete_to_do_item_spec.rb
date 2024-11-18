# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'DeleteToDoItem Mutation', type: :request do
  describe 'delete_to_do_item' do
    let!(:to_do_item) { create(:to_do_item) }

    let(:mutation) do
      <<~GQL
        mutation($id: ID!) {
          deleteToDoItem(input: {
            id: $id
          }) {
            id
            title
          }
        }
      GQL
    end

    it 'deletes a to_do_item' do
      variables = { id: to_do_item.id }

      post '/graphql', params: { query: mutation, variables: variables }
      json = JSON.parse(response.body)

      expect(json['data']['deleteToDoItem']['id']).to eq(to_do_item.id.to_s)
      expect(ToDoItem.exists?(to_do_item.id)).to be false
    end
  end
end
