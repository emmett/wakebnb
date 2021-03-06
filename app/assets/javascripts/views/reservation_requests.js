WAKEbnb.Views.ReservationRequestShow = Backbone.View.extend({
	tagName: "tr",
	template: JST["reservations/requests"],
	
	initialize: function(options) {
		this.listenTo(this.model, "change sync remove", this.render);
		this.user = options.user
	},
	
	events: {
		"click #approve": "approveRequest",
		"click #reject": "rejectRequest"	
	},
	
	approveRequest: function(event) {
		var that = this
		this.model.set("approved", true);
		this.model.save({}, {
			success: function(data){
				that.user.fetch()
			}
		});
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