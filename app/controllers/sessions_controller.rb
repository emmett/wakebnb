class SessionsController < ApplicationController
	def new
	end
	
	def create
		@user = User.find_by_credentials(params[:user])
	
		if @user
			sign_in!(@user)
			render json: @user
		else
			flash.now[:errors] = ["Invalid credentials please try again"]
			render :new
		end
	end
	
	def destroy
		sign_out!
		render json: @user
	end
end
