# frozen_string_literal: true

module Api
  module V1
    class ToDoItemsController < ApplicationController
      before_action :set_to_do_item, only: %i[show update destroy complete]

      def index
        @to_do_items = ToDoItems::PaginationService.paginate(ToDoItem.all, params)
        render_paginated_items(@to_do_items)
      end

      def show
        render json: @to_do_item, serializer: ToDoItems::ToDoItemSerializer
      end

      def create
        @to_do_item = ToDoItem.new(to_do_item_params)
        if @to_do_item.save
          render json: @to_do_item, status: :created, serializer: ToDoItems::ToDoItemSerializer
        else
          render json: @to_do_item.errors, status: :unprocessable_entity
        end
      end

      def update
        if @to_do_item.update(to_do_item_params)
          render json: @to_do_item, serializer: ToDoItems::ToDoItemSerializer
        else
          render json: @to_do_item.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @to_do_item.destroy
        head :no_content
      end

      def filter_by_status
        result = ToDoItems::FilterService.new(filter_params).call

        if result[:error].blank?
          @filtered_items = ToDoItems::PaginationService.paginate(result[:data], params)
          render_paginated_items(@filtered_items)
        else
          render json: { error: result[:error] }, status: result[:status]
        end
      end

      def complete
        if @to_do_item.update(status: 'complete')
          render json: @to_do_item, serializer: ToDoItems::ToDoItemSerializer
        else
          render json: @to_do_item.errors, status: :unprocessable_entity
        end
      end

      private

      def set_to_do_item
        @to_do_item = ToDoItem.find(params[:id])
      end

      def to_do_item_params
        params.require(:to_do_item).permit(:title, :description, :status, :due_date)
      end

      def filter_params
        params.require(:status)
      end

      def render_paginated_items(items)
        render json: {
          to_do_items: ActiveModelSerializers::SerializableResource.new(
            items,
            each_serializer: ToDoItems::ToDoItemSerializer
          ),
          meta: ToDoItems::PaginationService.meta(items)
        }
      end
    end
  end
end
