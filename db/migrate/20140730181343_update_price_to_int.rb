class UpdatePriceToInt < ActiveRecord::Migration
  def change
		remove_column :boats, :price, :string
		add_column :boats, :price, :integer
  end
end
