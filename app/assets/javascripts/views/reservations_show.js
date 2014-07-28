WAKEbnb.Views.ReservationShow = Backbone.View.extend({
	tagName: "tr",
	template: JST["reservations/show"],
	
	events: {
		"click #approve": "approveRequest",
		"click #reject": "rejectRequest"	
	},
	
	approveRequest: function(event) {
		console.log($(event.target))
	},
	
	rejectRequest: function(event) {
		event.preventDefault();
		this.model.destroy();
		this.trigger("remove", this);
	},
	
	initialize: function() {
		this.listenTo(this.model, "sync remove", this.render);
	},
	
	render: function (){
		var renderedContent = this.template({
			reservation: this.model
		})
		
		this.$el.html(renderedContent);
		
		return this;
	}
	
});