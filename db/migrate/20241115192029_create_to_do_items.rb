class CreateToDoItems < ActiveRecord::Migration[7.2]
  def change
    create_table :to_do_items do |t|
      t.string :title
      t.text :description
      t.integer :status, default: 0
      t.datetime :due_date

      t.timestamps
    end
  end
end
