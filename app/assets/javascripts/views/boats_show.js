WAKEbnb.Views.BoatsShow = Backbone.View.extend({
	template: JST["boats/show"],
	
	events: {
		"click #reserve-btn": "reserveBoat"
	},
	
	reserveBoat: function(event){
		event.preventDefault();
		console.log(event.target);
		console.log(this.model);
		var start = $('#start_date').val();
		var end = $('#end').val();
		var formData = $(event.currentTarget).serializeJSON();
		console.dir(start);
		
		
		
		
	},
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);	
	},
	
	render: function () {
		var renderedContent = this.template({
			boat: this.model
		});
		
		this.$el.html(renderedContent);
		
		return this;	
	}
})