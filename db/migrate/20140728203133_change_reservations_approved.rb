class ChangeReservationsApproved < ActiveRecord::Migration
  def change
		remove_column :reservations, :status
		add_column :reservations, :approved, :boolean
  end
end
