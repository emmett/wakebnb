# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  session         :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
	validates :username, :session, presence: true
  validates :password_digest, presence: { message: "Password can't be blank" }
  validates :password, length: { minimum: 6, allow_nil: true }
	
	has_one :profile
	
	attr_reader :password
	after_initialize :ensure_session_token
	
	def self.find_by_credentials(user_params)
		user = User.find_by_username(user_params[:username])
		user.try(:is_password?, user_params[:password])? user :nil 
	end
	
	def password=(password)
		self.password_digest = BCrypt::Password.create(password)
	end
	
	def is_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_token!
		self.session = SecureRandom.urlsafe_base64(16)
		self.save!
		self.session
	end
	
	private 
	def ensure_session_token
		self.session ||= SecureRandom.urlsafe_base64(16)
	end
end


#after_save create profile