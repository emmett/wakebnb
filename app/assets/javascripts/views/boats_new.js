WAKEbnb.Views.BoatsNew = Backbone.View.extend({
	template: JST["boats/new"],
	
	events: {
		"submit form": "submit",
		"change .my-photo-upload": "handleFile"
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