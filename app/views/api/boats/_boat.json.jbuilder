json.(boat, :id, :title, :description, :location, :price, :created_at, :updated_at)

json.username boat.user.username

json.reservations boat.reservations

json.boat_photo_url boat.boat_photo.url