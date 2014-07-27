WAKEbnb.Views.MapShow = Backbone.View.extend({
	template: JST["maps/show"],
	
	events: {
		"click #address-btn": "codeAddress"
	},
	
	initialize: function(){
		var map;
		var geocoder;
		function initialize(){
			geocoder = new google.maps.Geocoder()
			var latlng = new google.maps.LatLng(39.127, -119.8);
			var mapOptions = {
				minzoom: 8,
				maxzoom: 9,
				zoom: 8,
				center: latlng,
				disableDefaultUI: true
			}
			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		
		}
		
		google.maps.event.addDomListener(window, 'load', initialize);
	},
	
	codeAddress: function() {
		var address = document.getElementById('address').value;
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location); // need to offset
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	},
	
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
	
		return this;
	},
    
})