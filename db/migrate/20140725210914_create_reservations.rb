class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.integer :user_id, null: false
      t.integer :boat_id, null: false
      t.datetime :start_date, null: false
      t.datetime :end_date, null: false
      t.string :status, null: false

      t.timestamps
    end
		
		add_index :reservations, :user_id
		add_index :reservations, :boat_id
		add_index :reservations, :start_date
		add_index :reservations, :status
  end
end
