# == Schema Information
#
# Table name: reservations
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  boat_id    :integer          not null
#  start_date :date             not null
#  end_date   :date             not null
#  created_at :datetime
#  updated_at :datetime
#  approved   :boolean
#

class Reservation < ActiveRecord::Base
	
	belongs_to :user
	belongs_to :boat
	
  def destroy_overlapping
		overlapping = Reservation.find_by_sql([
		 "SELECT
		    *
		  FROM
		    Reservations
		  WHERE
		    (? BETWEEN start_date AND end_date
		  OR
		    ? BETWEEN start_date AND end_date)
		  AND
		    ? = boat_id
		  AND
		    ? != id
		 	AND approved = false
		    ", self.start_date, self.end_date, self.boat_id, self.id
		 ])
	 puts overlapping
	 overlapping.each { |request| request.destroy }
	end
    
	
end
