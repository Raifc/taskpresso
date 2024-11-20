# frozen_string_literal: true

FactoryBot.define do
  factory :to_do_item do
    title { Faker::Lorem.sentence(word_count: 2) }
    description { Faker::Lorem.paragraph(sentence_count: 2) }
    status { :pending }
    due_date { Date.tomorrow }

    trait :complete do
      status { :complete }
    end
  end
end
