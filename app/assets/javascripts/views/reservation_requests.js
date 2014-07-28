WAKEbnb.Views.ReservationRequestShow = Backbone.View.extend({
	tagName: "tr",
	template: JST["reservations/requests"],
	
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
	
})