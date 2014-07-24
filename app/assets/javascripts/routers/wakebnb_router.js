WAKEbnb.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "boatsIndex",
		"profiles/:id": "profilesShow",
		"boats/new": "boatsNew",
		"boats/:id": "boatShow"
	},
	
	profilesShow: function(id) {
		var profile = WAKEbnb.Collections.profiles.getOrFetch(id);
		
		var showView = new WAKEbnb.Views.ProfileShow({
			model: profile
		})
		
		this._swapView(showView)
		
	},
	
	boatShow: function (id) {
		
	},
	
	boatsNew: function () {
		
	},
	
	boatsIndex: function() {
		WAKEbnb.Collections.boats.fetch();
		
		var boatIndex = new WAKEbnb.Views.BoatsIndex({
			collection: WAKEbnb.Collections.boats
		})
		
		this._swapView(boatIndex)
	},
	

	_swapView: function(view) {
		this.currentView && this.currentView.remove()
		$('#main').html(view.render().$el);
		
		this.currentView = view;
	}

})