WAKEbnb.Views.BoatsShow = Backbone.View.extend({
	template: JST["boats/show"],
	
	
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