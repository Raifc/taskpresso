# frozen_string_literal: true

FactoryBot.define do
  factory :to_do_item do
    title { 'Buy groceries' }
    description { 'Milk, eggs' }
    status { :pending }
    due_date { Date.tomorrow }
  end
end
