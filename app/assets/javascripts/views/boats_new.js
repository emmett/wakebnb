WAKEbnb.Views.BoatsNew = Backbone.View.extend({
	template: JST["boats/new"],
	
	events: {
		"click .new_boat": "submit",
		"change .my-photo-upload": "handleFile",
		"click #dropPin": "dropPin"
	},
	
	handleFile: function (event) {
		var file = event.currentTarget.files[0];
		var view = this;
		var reader = new FileReader();
		reader.onload = function(e) {
			// note that this isn't saving
			console.log(this.result)
			view.model.set('boat_photo', this.result);
		}

		reader.readAsDataURL(file);
	},
	
	render: function() {
		var renderedContent = this.template();
		
		this.$el.html(renderedContent);
		
		return this;
	},
	
	dropPin: function() {
		marker = new google.maps.Marker({
			map: map,
			position: map.center,
			draggable: true
		});
		
		google.maps.event.addDomListener(marker, 'dragend', function(evt) {console.log('Lat '+ evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3))});	
	},
	
	submit: function(event) {
		event.preventDefault();
		var that = this;
		var params = $(event.currentTarget).serializeJSON();		
		
		this.model.save(params["boat"], {
			success: function (){
				WAKEbnb.Collections.boats.add(that.model);
				Backbone.history.navigate("/boats/" + that.model.escape('id'), 
				{ trigger: true });
			}
		});
	}
})