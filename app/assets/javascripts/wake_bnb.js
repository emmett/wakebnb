window.WAKEbnb = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		
		new WAKEbnb.Routers.AppRouter();
		var mapView = new WAKEbnb.Views.MapShow();
		
		$('#map-canvas').html(mapView.render().$el)
		Backbone.history.start();
  }
};
 