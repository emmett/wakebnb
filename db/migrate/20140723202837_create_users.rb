class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session

      t.timestamps
    end
		
		add_index :users, :username, unique: true
		add_index :users, :session
  end
end
