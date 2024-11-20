# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::ToDoItemsController', type: :request do
  let(:valid_attributes) { { title: 'New Task', description: 'Task description', status: 'pending', due_date: Date.tomorrow } }
  let(:invalid_attributes) { { title: nil } }

  describe '#index' do
    before do
      create_list(:to_do_item, 25)
    end

    it 'returns paginated to-do items' do
      get '/api/v1/to_do_items', params: { page: 1, per_page: 10 }

      expect(response).to be_successful
      response_body = JSON.parse(response.body)

      expect(response_body['to_do_items'].size).to eq(10)
      expect(response_body['meta']['total_count']).to eq(25)
      expect(response_body['meta']['total_pages']).to eq(3)
    end

    it 'returns the second page of to-do items' do
      get '/api/v1/to_do_items', params: { page: 2, per_page: 10 }

      expect(response).to be_successful
      response_body = JSON.parse(response.body)

      expect(response_body['to_do_items'].size).to eq(10)
      expect(response_body['meta']['current_page']).to eq(2)
    end
  end

  describe '#show' do
    context 'when the to-do item exists' do
      let!(:to_do_item) { create(:to_do_item) }

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
    let!(:to_do_item) { create(:to_do_item) }

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
    let!(:to_do_item) { create(:to_do_item) }

    it 'deletes the to-do item and returns a no content status' do
      expect {
        delete "/api/v1/to_do_items/#{to_do_item.id}"
      }.to change(ToDoItem, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end

  describe '#filter_by_status' do
    before do
      create_list(:to_do_item, 15, status: 'pending')
      create_list(:to_do_item, 10, status: 'complete')
    end

    context 'with a valid status parameter' do
      it 'returns paginated to-do items with the specified status' do
        get '/api/v1/to_do_items/filter_by_status', params: { status: 'pending', page: 1, per_page: 10 }

        expect(response).to be_successful
        response_body = JSON.parse(response.body)

        expect(response_body['to_do_items'].size).to eq(10)
        expect(response_body['meta']['total_count']).to eq(15)
        expect(response_body['meta']['total_pages']).to eq(2)
      end

      it 'returns the second page of pending to-do items' do
        get '/api/v1/to_do_items/filter_by_status', params: { status: 'pending', page: 2, per_page: 10 }

        expect(response).to be_successful
        response_body = JSON.parse(response.body)

        expect(response_body['to_do_items'].size).to eq(5)
        expect(response_body['meta']['current_page']).to eq(2)
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

  describe '#complete' do
    context 'when the to-do item exists' do
      it 'changes the status to complete' do
        to_do_item = create(:to_do_item)

        put "/api/v1/to_do_items/#{to_do_item.id}/complete"

        expect(to_do_item.reload.status).to eq('complete')
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when the to-do item does not exist' do
      it 'returns not found response' do
        put '/api/v1/to_do_items/-1/complete'

        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
