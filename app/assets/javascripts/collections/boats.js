WAKEbnb.Collections.Boats = Backbone.Collection.extend({
	model: WAKEbnb.Models.Boat,
	
	url: "/api/boats",
	
	getOrFetch: function (id){
		var boats = this;
		var boat;
		if (boat = this.get(id)) {
			boat.fetch();
		} else {
			boat = new WAKEbnb.Models.Boat({ id: id });
			boat.fetch({
				success: function () { boats.add(boat); }
			});
		}
		
		return boat;
	}
});

WAKEbnb.Collections.boats = new WAKEbnb.Collections.Boats();