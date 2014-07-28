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
	
end
