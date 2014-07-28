WAKEbnb.Models.Profile = Backbone.Model.extend({
	urlRoot: "/api/profiles",
	
	reservations: function () {
		this._reservations = this._reservations ||
		new WAKEbnb.Collections.Reservations([], { profile: this });
		return this._reservations;
	},
	
	
	reservationRequests: function () {
		this._reservationRequests = this._reservationRequests ||
		new WAKEbnb.Collections.Reservations([], { profile: this });
		return this._reservationRequests;
	},
	
	
	parse: function(payload){
		if(payload.reservations){
			this.reservations().set(payload.reservations, { parse: true });
			delete payload.reservations;
		}
		
		if(payload.reservationRequests){
			this.reservationRequests().set(payload.reservationRequests, { parse: true });
			delete payload.reservationRequests;
		}
		
		return payload;
	}
})