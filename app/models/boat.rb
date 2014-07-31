# == Schema Information
#
# Table name: boats
#
#  id                      :integer          not null, primary key
#  user_id                 :integer          not null
#  title                   :string(255)      not null
#  description             :text             default("Write a description")
#  created_at              :datetime
#  updated_at              :datetime
#  boat_photo_file_name    :string(255)
#  boat_photo_content_type :string(255)
#  boat_photo_file_size    :integer
#  boat_photo_updated_at   :datetime
#  latitude                :float            not null
#  longitude               :float            not null
#  price                   :integer
#

class Boat < ActiveRecord::Base
	belongs_to :user
	has_many :reservations
	
	if Rails.env.production?
		has_attached_file :boat_photo, :styles  => {
			:big  => "470X350#"
		}
	else
		has_attached_file :boat_photo
	end
	
	validates_attachment_content_type(
		:boat_photo,
		:content_type => /\Aimage\/.*\Z/ 
	)
	
	def self.filter(bounds)
		query_string = <<-SQL
			SELECT 
				*
			FROM 
				Boats 
			WHERE 
				latitude 
			BETWEEN
				?
			AND 
				? 
			AND 
				longitude
			BETWEEN 
				? 
			AND 
				?
			SQL
			filtered_boats = Boat.find_by_sql([query_string, bounds[:minLat], bounds[:maxLat], bounds[:minLng], bounds[:maxLng]])
			filtered_boats.map{ |boat| puts boat.title }
			return filtered_boats
	end
	
end
