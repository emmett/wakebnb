json.extract! @profile, :id, :bio, :location, :created_at, :updated_at

json.username @profile.user.username