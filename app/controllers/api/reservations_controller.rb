module Api
  class ReservationsController < ApiController
   
	  def create
      @reservation = current_user.reservations.new(reservation_params)
			
			if @reservation.save
				render json: @reservation
			else
				render json: @reservation.errors.full_messages, status: :unprocessable_entity
			end
		end
		
		def index
			@reservations = current_user.reservations
			render json: @reservations
		end
		
		def destroy
			@reservation = current_user.reservations.find(params[:id])
			@reservation.try(:destroy)
			render json: {}
		end


    def show
    end

    private

    def reservation_params
      params.require(:reservation).permit(:boat_id, :start_date, :end_date, :status)
    end
  end
end