class UpdateBoats < ActiveRecord::Migration
  def change
		remove_column :boats, :location
		add_column :boats, :latitude, :float
		add_column :boats, :longitude, :float
		
  end
end
