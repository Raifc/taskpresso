class CreateToDoItems < ActiveRecord::Migration[7.2]
  def change
    create_enum :status_enum, %w[pending complete]

    create_table :to_do_items do |t|
      t.string :title
      t.text :description
      t.enum :status, enum_type: :status_enum, default: 'pending'
      t.datetime :due_date

      t.timestamps
    end

    add_index :to_do_items, :status
  end
end
