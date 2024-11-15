# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ToDoItem, type: :model do
  describe 'validations' do
    it 'is valid with a title' do
      todo_item = ToDoItem.new(title: 'Sample Task', status: :pending)
      expect(todo_item).to be_valid
    end

    it 'is invalid without a title' do
      todo_item = ToDoItem.new(title: nil, status: :pending)
      expect(todo_item).not_to be_valid
      expect(todo_item.errors[:title]).to include("can't be blank")
    end
  end

  describe 'status enum' do
    it 'has a pending status by default' do
      todo_item = ToDoItem.new(title: 'Sample Task')
      expect(todo_item.status).to eq('pending')
    end

    it 'can be set to complete' do
      todo_item = ToDoItem.new(title: 'Sample Task', status: :complete)
      expect(todo_item.status).to eq('complete')
    end

    it 'raises an error with an invalid status' do
      expect { ToDoItem.new(title: 'Sample Task', status: :invalid_status) }.to raise_error(ArgumentError)
    end
  end
end
