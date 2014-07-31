json.(boat, :id, :title, :description, :longitude, :latitude, :price, :created_at, :updated_at)

json.username boat.user.username

json.reservations boat.reservations


if Rails.env.production?
	json.boat_photo_url boat.boat_photo.url(:big)
else
	json.boat_photo_url boat.boat_photo.url
end