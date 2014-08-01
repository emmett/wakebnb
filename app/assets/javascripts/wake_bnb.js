window.WAKEbnb = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		
		
		WAKEbnb.mapView = new WAKEbnb.Views.MapShow();
		new WAKEbnb.Routers.AppRouter();		
		
		
		

		Backbone.history.start();
  }
};
 
 
 