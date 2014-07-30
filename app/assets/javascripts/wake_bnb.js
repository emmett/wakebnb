window.WAKEbnb = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		
		new WAKEbnb.Routers.AppRouter();
		// var mapMarkers = new WAKEbnb.Collections.MapMarkers();
		
		
		var map;
		var geocoder;
		var mapView = new WAKEbnb.Views.MapShow();
		
		$('#map-canvas').html(mapView.render().$el)
		Backbone.history.start();
  }
};
 
 
 
