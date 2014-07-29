WAKEbnb.Views.ReservationShow = Backbone.View.extend({
	tagName: "tr",
	template: JST["reservations/show"],
	
	initialize: function() {
		this.listenTo(this.model, "change sync remove", this.render);
	},
	
	render: function (){
		var renderedContent = this.template({
			reservation: this.model
		})
		
		this.$el.html(renderedContent);
		
		return this;
	}
	
});