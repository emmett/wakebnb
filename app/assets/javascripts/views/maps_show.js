WAKEbnb.Views.MapShow = Backbone.View.extend({
	template: JST["maps/show"],
	
	initialize: function(){
		$("#main").on( "click", "#address-btn", this.codeAddress.bind(this))
		$("#main").on("click", "#dropPin", this.dropPin.bind(this))
		this.markers = [];
		
		this.geocoder = new google.maps.Geocoder()
		var latlng = new google.maps.LatLng(39.120, -120.040);
			
			
		var mapOptions = {
			minzoom: 11,
			maxzoom: 11,
			zoom: 11,
			center: latlng,
			disableDefaultUI: true
		}
			
		WAKEbnb.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			
			
		google.maps.event.addListenerOnce(WAKEbnb.map, 'tilesloaded', function(){
			WAKEbnb.mapView.oldCenter = WAKEbnb.map.center;			
			WAKEbnb.mapView.offsetCenter(WAKEbnb.map.center, (-.25 * $( window ).width()), 0)	
		})
	},
		
	codeAddress: function() {
		var that = this
		var width = -1 * $( window ).width();
		var address = $('#address').val();
		if (address) {
			this.geocoder.geocode( { 'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					that.oldCenter = results[0].geometry.location
					WAKEbnb.mapView.offsetCenter(results[0].geometry.location, .25 * width, 0)

					var bounds = WAKEbnb.map.getBounds()
					var NE = bounds.getNorthEast()
					var SW = bounds.getSouthWest()
					var coords = { minLat: SW.k, maxLat: NE.k, minLng: SW.B, maxLng: NE.B}
						
					WAKEbnb.Collections.boats.fetch({
						data: { coords: coords },
						reset: true
					})
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
		}
		
			
		
	},
		
	offsetCenter: function(latlng, offsetx, offsety) {
		var scale = Math.pow(2, WAKEbnb.map.getZoom());
		var nw = new google.maps.LatLng(
			WAKEbnb.map.getBounds().getNorthEast().lat(),
			WAKEbnb.map.getBounds().getSouthWest().lng()
		);

		var worldCoordinateCenter = WAKEbnb.map.getProjection().fromLatLngToPoint(latlng);
		var pixelOffset = new google.maps.Point((offsetx/scale) || 0,(offsety/scale) ||0)

		var worldCoordinateNewCenter = new google.maps.Point(
			worldCoordinateCenter.x - pixelOffset.x,
			worldCoordinateCenter.y + pixelOffset.y
		);

		var newCenter = WAKEbnb.map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

		WAKEbnb.map.setCenter(newCenter);
	},
		
	addMarker: function (location, draggable) {
		var image = '/assets/images/glyphicons/anchor.png'
		var marker = new google.maps.Marker({
			draggable: draggable,
			position: location,
			map: WAKEbnb.map,
			image: image			
		});
		
		this.markers.push(marker);
			
		google.maps.event.addDomListener(marker, 'dragend', function(evt) {
			$('#lat').val(evt.latLng.lat().toFixed(3));
			$('#long').val(evt.latLng.lng().toFixed(3));
		});	
	},

	// Sets the map on all this.markers in the array.
	setAllMap: function (map) {
		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(map);
		}
	},

	// Removes the this.markers from the map, but keeps them in the array.
	clearMarkers: function () {
		this.setAllMap(null);
	},

	// Shows any this.markers currently in the array.
	showMarkers: function () {
		this.setAllMap(map);
	},

	// Deletes all this.markers in the array by removing references to them.
	deleteMarkers: function () {
		this.clearMarkers();
		this.markers = [];
	},
		
	dropPin: function () {
		this.deleteMarkers();
		
		$('#lat').val(this.oldCenter.lat().toFixed(3));
		$('#long').val(this.oldCenter.lng().toFixed(3));
		
		this.addMarker(this.oldCenter, true);
	},
		
	
	
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
	
		return this;
	},

})