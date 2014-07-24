WAKEbnb.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "homePage",
		"profiles/:id": "profilesShow"
	},
	
	profilesShow: function(id) {
		var profile = WAKEbnb.Collections.profiles.getOrFetch(id);
		
		var showView = new WAKEbnb.Views.ProfileShow({
			model: profile
		})
		
		this._swapView(showView)
		
	},
	

	_swapView: function(view) {
		this.currentView && this.currentView.remove()
		$('#main').html(view.render().$el);
		
		this.currentView = view;
	}

})