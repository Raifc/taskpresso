# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ToDoItemsController, type: :controller do
  let!(:to_do_item) { create(:to_do_item) }
  let(:valid_attributes) { { title: 'New Task', description: 'Task description', status: 'pending', due_date: Date.tomorrow } }
  let(:invalid_attributes) { { title: nil } }

  describe 'Listing to-do items' do
    it 'returns all to-do items' do
      get :index

      expect(response).to be_successful
      items = JSON.parse(response.body)
      
      expect(items.size).to eq(ToDoItem.count)
    end
  end

  describe 'Showing a to-do item' do
    context 'when the to-do item exists' do
      it 'returns the to-do item' do
        get :show, params: { id: to_do_item.id }

        expect(response).to be_successful
        item = JSON.parse(response.body)
        
        expect(item['id']).to eq(to_do_item.id)
      end
    end

    context 'when the to-do item does not exist' do
      it 'raises an ActiveRecord::RecordNotFound error' do
        expect { get :show, params: { id: -1 } }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  describe 'Creating a to-do item' do
    context 'with valid parameters' do
      it 'creates a new to-do item and returns a created status' do
        expect {
          post :create, params: { to_do_item: valid_attributes }
        }.to change(ToDoItem, :count).by(1)
        
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new to-do item and returns an unprocessable entity status' do
        expect {
          post :create, params: { to_do_item: invalid_attributes }
        }.not_to change(ToDoItem, :count)
        
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'Updating a to-do item' do
    context 'with valid parameters' do
      it 'updates the to-do item and returns a successful response' do
        patch :update, params: { id: to_do_item.id, to_do_item: { title: 'Updated Task' } }

        to_do_item.reload
        
        expect(to_do_item.title).to eq('Updated Task')
        expect(response).to be_successful
      end
    end

    context 'with invalid parameters' do
      it 'does not update the to-do item and returns an unprocessable entity status' do
        patch :update, params: { id: to_do_item.id, to_do_item: invalid_attributes }
        
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'Deleting a to-do item' do
    it 'deletes the to-do item and returns a no content status' do
      expect {
        delete :destroy, params: { id: to_do_item.id }
      }.to change(ToDoItem, :count).by(-1)
      
      expect(response).to have_http_status(:no_content)
    end
  end
end
