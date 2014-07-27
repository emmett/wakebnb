# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


u1 = User.create(username: 'BlackBeard', password: 'password')
u2 = User.create(username: 'horatio_nelson', password: 'password')

p1 = u1.create_profile(
	bio: "Hi this is my profile",
	location: "94901",
	review_score: 5
	)
	
p2 = u2.create_profile(
	bio: "I'm a famous British Admiral",
	location: "94901",
	review_score: 5
	)
	
b1 = u1.boats.create(
	title: "Flying Dutchman",
	description: "Scourge of the highseas",
	location: "Davey Jones locker",
	price: "your soul"
	)
	
b2 = u2.boats.create(
	title: "HMS Victory",
	description: "Desperate affairs require desperate measures.",
	location: "Trafalgar",
	price: "1000"
	)
	
r1 = u1.reservations.create(
	boat_id: 2,
	start_date: Date.new(2014,7,26),
	end_date: Date.new(2014,7,28),
	status: "open"
	)