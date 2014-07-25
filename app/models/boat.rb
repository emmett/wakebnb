# == Schema Information
#
# Table name: boats
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  title       :string(255)      not null
#  description :text             default("Write a description")
#  location    :string(255)      not null
#  price       :string(255)      not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Boat < ActiveRecord::Base
	belongs_to :user
	
	has_attached_file :boat_photo, :styles => {
		:big => "350x400>"
		:small => "100x150"
	}
	
	validates_attachment_content_type(
		:boat_photo,
		:content_type => /\Aimage\/.*\Z/ 
	)
	
end
