WAKEbnb.Views.BoatsNew = Backbone.View.extend({
	template: JST["boats/new"],
	className: "boats col-lg-4 col-md-4 col-sm-6 col-xs-6",	
	
	events: {
		"click .new_boat": "submit",
		"change .my-photo-upload": "handleFile",
	},
	
	handleFile: function (event) {
		var file = event.currentTarget.files[0];
		var view = this;
		var reader = new FileReader();
		reader.onload = function(e) {
			view.model.set('boat_photo', this.result);
		}

		reader.readAsDataURL(file);
	},
	
	render: function() {
		var renderedContent = this.template();
		
		this.$el.html(renderedContent);
		
		return this;
	},
	
	
	
	submit: function(event) {
		event.preventDefault();
		var that = this;
		var price = parseInt($('#price').val())
		var title = $('#title').val()
		var longitude = parseFloat($('#long').val())
		var latitude = parseFloat($('#lat').val())
		var description = $('#description').val()
		var params = {
			boat: {
				price: price, 
				title: title, 
				longitude: longitude, 
				latitude: latitude,
				description: description
			}
		}		
		
		this.model.save(params["boat"], {
			success: function (){
				WAKEbnb.Collections.boats.add(that.model);
				Backbone.history.navigate("/boats/" + that.model.escape('id'), 
				{ trigger: true });
			}
		});
	}
})