# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::ToDoItemsController', type: :request do
  let!(:to_do_item) { create(:to_do_item) }
  let(:valid_attributes) { { title: 'New Task', description: 'Task description', status: 'pending', due_date: Date.tomorrow } }
  let(:invalid_attributes) { { title: nil } }

  describe '#index' do
    it 'returns all to-do items' do
      get '/api/v1/to_do_items'

      expect(response).to be_successful
      items = JSON.parse(response.body)
      
      expect(items.size).to eq(ToDoItem.count)
    end
  end

  describe '#show' do
    context 'when the to-do item exists' do
      it 'returns the to-do item' do
        get "/api/v1/to_do_items/#{to_do_item.id}"

        expect(response).to be_successful
        item = JSON.parse(response.body)
        
        expect(item['id']).to eq(to_do_item.id)
      end
    end

    context 'when the to-do item does not exist' do
      it 'retuns not found status' do
        get '/api/v1/to_do_items/-1'

        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe '#create' do
    context 'with valid parameters' do
      it 'creates a new to-do item and returns a created status' do
        expect {
          post '/api/v1/to_do_items', params: { to_do_item: valid_attributes }
        }.to change(ToDoItem, :count).by(1)
        
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new to-do item and returns an unprocessable entity status' do
        expect {
          post '/api/v1/to_do_items', params: { to_do_item: invalid_attributes }
        }.not_to change(ToDoItem, :count)
        
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe '#update' do
    context 'with valid parameters' do
      it 'updates the to-do item and returns a successful response' do
        put "/api/v1/to_do_items/#{to_do_item.id}", params: { to_do_item: { title: 'Updated Task' } }

        to_do_item.reload
        
        expect(to_do_item.title).to eq('Updated Task')
        expect(response).to be_successful
      end
    end

    context 'with invalid parameters' do
      it 'does not update the to-do item and returns an unprocessable entity status' do
        put "/api/v1/to_do_items/#{to_do_item.id}", params: { to_do_item: invalid_attributes }
        
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe '#destroy' do
    it 'deletes the to-do item and returns a no content status' do
      expect {
        delete "/api/v1/to_do_items/#{to_do_item.id}"
      }.to change(ToDoItem, :count).by(-1)
      
      expect(response).to have_http_status(:no_content)
    end
  end

  describe '#filter_by_status' do
    context 'with a valid status parameter' do
      it 'returns to-do items with the specified status' do
        get '/api/v1/to_do_items/filter_by_status', params: { status: 'pending' }

        expect(response).to be_successful
        items = JSON.parse(response.body)

        expect(items.size).to eq(1)
        expect(items.first['status']).to eq('pending')
      end

      it 'returns an empty array if no items match the status' do
        get '/api/v1/to_do_items/filter_by_status', params: { status: 'complete' }

        expect(response).to be_successful
        items = JSON.parse(response.body)

        expect(items).to be_empty
      end
    end

    context 'with an invalid status parameter' do
      it 'returns an error message and unprocessable entity status' do
        get '/api/v1/to_do_items/filter_by_status', params: { status: 'invalid' }

        expect(response).to have_http_status(:unprocessable_entity)
        error_message = JSON.parse(response.body)

        expect(error_message).to include('error' => 'Invalid status')
      end
    end

    context 'without a status parameter' do
      it 'returns an error message and bad request status' do
        get '/api/v1/to_do_items/filter_by_status'

        expect(response).to have_http_status(:bad_request)
      end
    end
  end
end
