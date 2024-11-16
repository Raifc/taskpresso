# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ToDoItems::ToDoItemSerializer, type: :serializer do
  let(:to_do_item) { create(:to_do_item) }

  subject do
    ActiveModelSerializers::SerializableResource.new(to_do_item, serializer: ToDoItems::ToDoItemSerializer).as_json.deep_symbolize_keys
  end

  let(:expected_result) do
    {
      id: to_do_item.id,
      title: to_do_item.title,
      description: to_do_item.description,
      status: to_do_item.status,
      due_date: to_do_item.due_date,
      created_at: to_do_item.created_at,
      updated_at: to_do_item.updated_at,
      formatted_due_date: to_do_item.due_date.strftime('%B %d, %Y')
    }
  end

  it 'serializes the ToDoItem attributes correctly' do
    expect(subject).to eq(expected_result)
  end
end
