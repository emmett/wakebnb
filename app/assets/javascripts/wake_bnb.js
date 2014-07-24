window.WAKEbnb = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		
		new WAKEbnb.Routers.AppRouter();
		Backbone.history.start();
  }
};
