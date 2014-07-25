# == Schema Information
#
# Table name: reservations
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  boat_id    :integer          not null
#  start_date :datetime         not null
#  end_date   :datetime         not null
#  status     :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class Reservation < ActiveRecord::Base
	
	belongs_to :user
	belongs_to :boat
end
