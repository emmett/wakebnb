WAKEbnb.Views.MapShow = Backbone.View.extend({
	template: JST["maps/show"],
	
	events: {
		"click #address-btn": "codeAddress"
	},
	
	initialize: function(){
		$( "#main" ).on( "click", "#address-btn", codeAddress)
		
		
		function initialize(){
			geocoder = new google.maps.Geocoder()
			var latlng = new google.maps.LatLng(39.127, -119.8);
			var mapOptions = {
				minzoom: 11,
				maxzoom: 11,
				zoom: 11,
				center: latlng,
				disableDefaultUI: true
			}
			
			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		};
		
		function codeAddress() {
			var width = -1 * $( window ).width();
			var address = $('#address').val();
			geocoder.geocode( { 'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					offsetCenter(results[0].geometry.location, .25 * width, 0)
					 // need to offset
					
				
					
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
			
			function offsetCenter(latlng,offsetx,offsety) {

			// latlng is the apparent centre-point
			// offsetx is the distance you want that point to move to the right, in pixels
			// offsety is the distance you want that point to move upwards, in pixels
			// offset can be negative
			// offsetx and offsety are both optional
			var scale = Math.pow(2, map.getZoom());
			var nw = new google.maps.LatLng(
			    map.getBounds().getNorthEast().lat(),
			    map.getBounds().getSouthWest().lng()
			);

			var worldCoordinateCenter = map.getProjection().fromLatLngToPoint(latlng);
			var pixelOffset = new google.maps.Point((offsetx/scale) || 0,(offsety/scale) ||0)

			var worldCoordinateNewCenter = new google.maps.Point(
			    worldCoordinateCenter.x - pixelOffset.x,
			    worldCoordinateCenter.y + pixelOffset.y
			);

			var newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

			map.setCenter(newCenter);

			}
		}
		
		google.maps.event.addDomListener(window, 'load', initialize);
	},
	
	updateCoords: function(event){
		console.log(event)
	},
	
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
	
		return this;
	},
    
})