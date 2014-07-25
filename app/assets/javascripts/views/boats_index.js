WAKEbnb.Views.BoatsIndex = Backbone.View.extend({
	template: JST["boats/index"],
	events: {
		"click button#reserve-btn": 'boatReserve'
	},
	
	boatReserve: function(event){
		event.preventDefault();
		console.log(event.target)
	},
	
	initialize: function () {
		this.listenTo(this.collection, 'sync', this.render)
	},
	
	render: function(){
		var renderedContent = this.template({
			boats: this.collection
		});
		
		this.$el.html(renderedContent);
		return this;
	}
});