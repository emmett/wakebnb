WAKEbnb.Views.MapShow = Backbone.View.extend({
	template: JST["maps/show"],
	
	events: {
		"click #address-btn": "codeAddress"
	},
	
	initialize: function(){
		$( "#panel" ).on( "click", "#address-btn", codeAddress)
		
		var map;
		var geocoder;
		
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
		}
		
		function codeAddress() {
			var address = $('#address').val();
			geocoder.geocode( { 'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					results[0].geometry.location.B += .1
					map.setCenter(results[0].geometry.location); // need to offset
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					});
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
		}
		google.maps.event.addDomListener(window, 'load', initialize);
	},
	
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
	
		return this;
	},
    
})