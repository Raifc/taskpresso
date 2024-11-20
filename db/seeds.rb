# frozen_string_literal: true

require 'faker'
require 'factory_bot_rails'

include FactoryBot::Syntax::Methods

puts 'Seeding ToDoItems...'

if ENV['RAILS_ENV'] != 'test'
  15.times do
    FactoryBot.create(:to_do_item)
    FactoryBot.create(:to_do_item, :complete)
  end
end

puts 'Seeding completed!'
