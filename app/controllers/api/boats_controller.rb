module Api
	class BoatsController < ApiController
		before_action :set_boat, only: [:show, :edit, :update, :destroy]
	
		def index
			@boats = Boat.all
			
		end

		def show
		end

		def new
			@boat = Boat.new
		end

		def edit
		end

	
		def create
			@boat = current_user.boats.new(boat_params)
		
			if @boat.save
				render json: @boat
			else
				render json: @boat.errors.full_messages, status: :unprocessable_entity
			end
   
		end

		def update
    
		end

		# DELETE /boats/1
		# DELETE /boats/1.json
		def destroy
			@boat = current_user.boats.find(params[:id])
			@boat.try(:destroy)
			
			render json: {}
		end

		private
		# Use callbacks to share common setup or constraints between actions.
		def set_boat
			@boat = Boat.find(params[:id])
		end

		# Never trust parameters from the scary internet, only allow the white list through.
		def boat_params
			params.require(:boat).permit(:user_id, :title, :description, :location, :price)
		end
	end
end
