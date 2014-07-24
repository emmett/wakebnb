json.extract! @boat, :id, :title, :description, :location, :price, :created_at, :updated_at

json.username @boat.user.username