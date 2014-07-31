# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


u1 = User.create(username: 'BlackBeard', password: 'password')
u2 = User.create(username: 'horatio_nelson', password: 'password')
u3 = User.create(username: 'guest', password: 'password')

u1.create_profile()
u2.create_profile()
u3.create_profile()


b1 = u1.boats.create(
	title: "Flying Dutchman",
	description: "Scourge of the highseas",
	latitude: 39.236,
	longitude: -120.021,
	price: 10000,
	boat_photo: File.open('public/seeds/Flying_Dutchman.jpg')
	)
	
b2 = u2.boats.create(
	title: "HMS Victory",
	description: "Desperate affairs require desperate measures.",
	latitude: 39.224,
	longitude: -120.059,
	price: 1000,
	boat_photo: File.open('public/seeds/HMS_Victory.jpg')
	)
	
b3 = u3.boats.create(
	title: "Guest Boat",
	description: "This is the guest boat",
	latitude: 39.225,
	longitude: -120.062,
	price: 300,
	boat_photo: File.open('public/seeds/guest_boat.jpg')
	
	)
	
r1 = u1.reservations.create(
	boat_id: 2,
	start_date: Date.new(2014,8,7),
	end_date: Date.new(2014,8,10)
	)
	
r2 = u2.reservations.create(
	boat_id: 3,
	start_date: Date.new(2014,8,15),
	end_date: Date.new(2014,8,17)
	)
	
r3 = u3.reservations.create(
	boat_id: 1,
	start_date: Date.new(2014,8,16),
	end_date: Date.new(2014,8,29)
	)
	
r4 = u3.reservations.create(
	boat_id: 1,
	start_date: Date.new(2014,8,30),
	end_date: Date.new(2014,9,4)
	)
	
r2 = u1.reservations.create(
	boat_id: 3,
	start_date: Date.new(2014,8,14),
	end_date: Date.new(2014,8,18)
	)

