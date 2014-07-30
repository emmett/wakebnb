class UpdateBoatsLocation < ActiveRecord::Migration
  def change
		remove_column :boats, :latitude, :float
		remove_column :boats, :longitude, :float
		
		add_column :boats, :latitude, :float, null: false
		add_column :boats, :longitude, :float, null: false
  end
end
