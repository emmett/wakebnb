WAKEbnb.collections.Reservations = Backbone.Collection.extend({
	model: WAKEbnb.Models.Reservation,
	
	url: "/api/reservations",
	
	getOrFetch: function (id){
		var reservations = this;
		var reservation;
		if (reservation = this.get(id)) {
			reservation.fetch();
		} else {
			reservation = new WAKEbnb.Models.Reservation({ id: id });
			reservation.fetch({
				success: function () { reservations.add(reservation); }
			});
		}
		
		return reservation;
	}
})