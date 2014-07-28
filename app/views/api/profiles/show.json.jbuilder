json.extract! @profile, :id, :bio, :location, :created_at, :updated_at

json.username @profile.user.username

json.reservations @profile.reservations do |reservation|
	json.extract! reservation, :id, :start_date, :end_date, :user_id, :boat_id, :status
	json.boat reservation.boat.title
	json.renter reservation.user.username
end


json.reservationRequests @profile.reservation_requests do |request|
	json.extract! request, :id, :start_date, :end_date, :user_id, :boat_id, :status
	json.boat request.boat.title
	json.renter request.user.username
end
