window.WAKEbnb = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		
		new WAKEbnb.Routers.AppRouter();		
		
		WAKEbnb.mapView = new WAKEbnb.Views.MapShow();
		

		Backbone.history.start();
  }
};
 
 
 