# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ToDoItems::FilterService do
  let!(:pending_item) { create(:to_do_item, status: 'pending') }

  describe '#call' do
    context 'with a valid status' do
      it 'returns items with the specified status' do
        service = described_class.new('pending')
        result = service.call

        expect(result[:status]).to eq(:ok)
        expect(result[:data].size).to eq(1)
        expect(result[:data].first.status).to eq('pending')
      end

      it 'returns an empty array if no items match the status' do
        service = described_class.new('complete')
        result = service.call

        expect(result[:status]).to eq(:ok)
        expect(result[:data]).to be_empty
      end
    end

    context 'with an invalid status' do
      it 'returns an error message and unprocessable entity status' do
        service = described_class.new('invalid_status')
        result = service.call

        expect(result[:status]).to eq(:unprocessable_entity)
        expect(result[:error]).to eq('Invalid status')
      end
    end
  end
end
