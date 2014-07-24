# == Schema Information
#
# Table name: profiles
#
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  bio          :text             default("Fill in some info about yourself")
#  location     :string(255)
#  review_score :integer
#  created_at   :datetime
#  updated_at   :datetime
#

class Profile < ActiveRecord::Base
	validates :user_id, uniqueness: true
	
	belongs_to :user
	
end
