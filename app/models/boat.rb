# == Schema Information
#
# Table name: boats
#
#  id                      :integer          not null, primary key
#  user_id                 :integer          not null
#  title                   :string(255)      not null
#  description             :text             default("Write a description")
#  location                :string(255)      not null
#  price                   :string(255)      not null
#  created_at              :datetime
#  updated_at              :datetime
#  boat_photo_file_name    :string(255)
#  boat_photo_content_type :string(255)
#  boat_photo_file_size    :integer
#  boat_photo_updated_at   :datetime
#

class Boat < ActiveRecord::Base
	belongs_to :user
	has_many :reservations
	
	if Rails.env.production?
		has_attached_file :boat_photo, styles: { big: "100x100>" }
	else
		has_attached_file :boat_photo
	end
	
	validates_attachment_content_type(
		:boat_photo,
		:content_type => /\Aimage\/.*\Z/ 
	)
	
	def filter(bounds)
		
	end
	
end
