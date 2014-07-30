WAKEbnb.Views.MapShow = Backbone.View.extend({
	template: JST["maps/show"],
	
	events: {
		"click #address-btn": "codeAddress"
	},
	
	initialize: function(){
		$("#main").on( "click", "#address-btn", codeAddress)
		$("#main").on("click", "#dropPin", dropPin)
		
		var oldCenter;
		var map;
		var geocoder;
		var markers = [];
		
		function initialize(){
			geocoder = new google.maps.Geocoder()
			var latlng = new google.maps.LatLng(39.120, -120.040);
			
			
			var mapOptions = {
				minzoom: 11,
				maxzoom: 11,
				zoom: 11,
				center: latlng,
				disableDefaultUI: true
			}
			
			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			
			
			google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
				oldCenter = map.center			
				offsetCenter(map.center, (-.25 * $( window ).width()), 0)	
			})
		};
		
		function codeAddress() {
			var width = -1 * $( window ).width();
			var address = $('#address').val();
			deleteMarkers();
			
			geocoder.geocode( { 'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					oldCenter = results[0].geometry.location
					offsetCenter(results[0].geometry.location, .25 * width, 0)
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
		
		}
		
		function offsetCenter(latlng,offsetx,offsety) {

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
		
		function addMarker(location, draggable) {
			var marker = new google.maps.Marker({
				draggable: draggable,
				position: location,
				map: map
			});
			markers.push(marker);
			
			google.maps.event.addDomListener(marker, 'dragend', function(evt) {
				$('#lat').val(evt.latLng.lat().toFixed(3));
				$('#long').val(evt.latLng.lng().toFixed(3));
			});	
		}

		// Sets the map on all markers in the array.
		function setAllMap(map) {
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(map);
			}
		}

		// Removes the markers from the map, but keeps them in the array.
		function clearMarkers() {
			setAllMap(null);
		}

		// Shows any markers currently in the array.
		function showMarkers() {
			setAllMap(map);
		}

		// Deletes all markers in the array by removing references to them.
		function deleteMarkers() {
			clearMarkers();
			markers = [];
		}
		
		function dropPin() {
			deleteMarkers();
			addMarker(oldCenter, true);
		}
		
	
		
		google.maps.event.addDomListener(window, 'load', initialize);
	
	},
	

	
	
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
	
		return this;
	},
	

    
})