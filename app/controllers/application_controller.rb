class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
	
	helper_method :current_user, :signed_in?
	
	private
  def user_params
    params.require(:user).permit(:username, :password, :session, :profile_photo)
  end
	
	def current_user
		return nil unless session[:token]
		@current_user ||= User.find_by_session(session[:token])
	end
	
	def signed_in?
		!!current_user
	end
	
	def sign_in!(user)
		@current_user = user
		session[:token] = user.reset_token!
	end
	
	def sign_out!
		current_user.try(:reset_token!)
		session[:token] = nil
	end
	
	def require_login
		redirect_to root_url unless signed_in?
	end

end
