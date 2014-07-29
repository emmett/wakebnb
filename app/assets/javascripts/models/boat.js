WAKEbnb.Models.Boat = Backbone.Model.extend ({
	urlRoot:"api/boats",
	
	reservations: function () {
		this._reservations = this._reservations ||
		new WAKEbnb.Collections.Reservations([], { boat: this });
		return this._reservations;
	},
	
	blackout: function() {
		var blackoutDates = [];
		this.reservations().each(function (el) {			
			if (el.get('approved'))  {
				var start = new Date(el.get('start_date'))
				var end = new Date(el.get('end_date'))
			
				start.setMinutes(start.getMinutes() + start.getTimezoneOffset())
				end.setMinutes(end.getMinutes() + end.getTimezoneOffset())
			
				start = start.getTime() / (1000 * 60 * 60 * 24)
				end = end.getTime()  / (1000 * 60 * 60 * 24)
			
				for (var i = start; i <= end; i++) {
					blackoutDates.push(i)
				}
			}
		});
		
		blackoutDates = blackoutDates.map(function(date){
			return date * (1000 * 60 * 60 * 24)
		})
		
		return blackoutDates;	
	},

	parse: function(payload){
		if(payload.reservations){
			this.reservations().set(payload.reservations, { parse: true });
			delete payload.reservations;
		}
		
		return payload;
	}       
})