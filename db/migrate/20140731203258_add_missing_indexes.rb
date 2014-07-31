class AddMissingIndexes < ActiveRecord::Migration
	def change
		add_index :boats, [:price]
		add_index :boats, [:latitude, :longitude]
	end
end
