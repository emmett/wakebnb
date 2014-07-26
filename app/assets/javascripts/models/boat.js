WAKEbnb.Models.Boat = Backbone.Model.extend ({
	urlRoot:"api/boats",
	
	reservations: function () {
		this._reservations = this._reservations ||
			new WAKEbnb.Collections.Reservations([], { boat: this });
		return this._reservations;
	},

	parse: function(payload){
		if(payload.reservations){
			this.reservations().set(payload.reservations, { parse: true });
			delete payload.reservations;
		}
		
		return payload;
	}
})