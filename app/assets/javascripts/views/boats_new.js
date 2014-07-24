WAKEbnb.Views.BoatsNew = Backbone.View.extend({
	template: JST["boats/new"],
	
	events: {
		"submit form": "submit"
	},
	
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		
		return this;
	},
	
	submit: function(event) {
		event.preventDefault();
		
		var params = $(event.currentTarget).serializeJSON();
		var newBoat = new WAKEbnb.Models.Boat(params["boat"]);
		
		newBoat.save({}, {
			success: function (){
				WAKEbnb.Collections.boats.add(newBoat);
				Backbone.history.navigate("/boards/" + newBoard.escape('id'), 
				{ trigger: true });
			}
		});
	}
})