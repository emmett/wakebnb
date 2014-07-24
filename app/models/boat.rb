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
end
