# frozen_string_literal: true

module Api
  module V1
    class ToDoItemsController < ApplicationController
      before_action :set_to_do_item, only: [:show, :update, :destroy]

      def index
        @to_do_items = ToDoItem.all
        render json: @to_do_items
      end

      def show
        render json: @to_do_item
      end

      def create
        @to_do_item = ToDoItem.new(to_do_item_params)
        if @to_do_item.save
          render json: @to_do_item, status: :created
        else
          render json: @to_do_item.errors, status: :unprocessable_entity
        end
      end

      def update
        if @to_do_item.update(to_do_item_params)
          render json: @to_do_item
        else
          render json: @to_do_item.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @to_do_item.destroy
        head :no_content
      end

      private

      def set_to_do_item
        @to_do_item = ToDoItem.find(params[:id])
      end

      def to_do_item_params
        params.require(:to_do_item).permit(:title, :description, :status, :due_date)
      end
    end
  end
end
