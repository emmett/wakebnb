class CreateBoats < ActiveRecord::Migration
  def change
    create_table :boats do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.text :description, default: "Write a description"
      t.string :location, null: false
      t.string :price, null: false

      t.timestamps
    end
		
		add_index :boats, :user_id
		add_index :boats, :title
		add_index :boats, :location
		add_index :boats, :price
  end
end
