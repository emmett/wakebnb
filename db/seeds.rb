# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


u1 = User.create(username: 'BlackBeard', password: 'password')
u2 = User.create(username: 'horatio_nelson', password: 'password')


p1 = u1.create_profile()
	
p2 = u2.create_profile()
	
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
	
r1 = u1.reservations.create(
	boat_id: 2,
	start_date: Date.new(2014,7,26),
	end_date: Date.new(2014,7,28)
	)
	