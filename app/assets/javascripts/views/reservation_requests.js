WAKEbnb.Views.ReservationRequestShow = Backbone.View.extend({
	tagName: "tr",
	template: JST["reservations/requests"],
	
	initialize: function() {
		this.listenTo(this.model, "change sync remove", this.render);
	},
	
	events: {
		"click #approve": "approveRequest",
		"click #reject": "rejectRequest"	
	},
	
	approveRequest: function(event) {
		console.log(this.model);
		this.model.set("approved", true);
		this.model.save();
	},
	
	rejectRequest: function(event) {
		event.preventDefault();
		this.model.destroy();
		this.trigger("remove", this);
	},
	
	
	render: function (){
		var renderedContent = this.template({
			reservation: this.model
		})
		
		this.$el.html(renderedContent);
		
		return this;
	}
	
})