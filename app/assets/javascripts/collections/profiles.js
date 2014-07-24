WAKEbnb.Collections.Profiles = Backbone.Collection.extend({
	model: WAKEbnb.Models.Profile,
	
	url: "/api/profiles",
	
	getOrFetch: function (id){
		var profiles = this;
		var profile;
		if (profile = this.get(id)) {
			profile.fetch();
		} else {
			profile = new WAKEbnb.Models.Profile({ id: id });
			profile.fetch({
				success: function () { profiles.add(profile); }
			});
		}
		
		return profile;
	}
});

WAKEbnb.Collections.profiles = new WAKEbnb.Collections.Profiles();
