class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.integer :user_id, null: false
      t.text :bio, default: "Fill in some info about yourself"
      t.string :location
      t.integer :review_score

      t.timestamps
    end
		
		add_index :profiles, :user_id, unique: true
		add_index :profiles, :location
		add_index :profiles, :review_score
  end
end
