module Api
  class ProfilesController < ApiController
   
	  def create
      @profile = current_user.profile.new(profile_params)

      if @profile.save
        render json: @profile
      else
        render json: @profile.errors.full_messages, status: :unprocessable_entity
      end
    end


    def show
    	@profile = Profile.find(params[:id])
			render :show
    end

    private

    def profile_params
      params.require(:profile).permit(:bio, :location)
    end
  end
end


#should only need update not controller