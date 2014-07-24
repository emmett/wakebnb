WAKEbnb.Views.BoatsIndex = Backbone.View.extend({
	template: JST["boats/index"],
	
	intialize: function () {
		this.listenTo(this.collection, "sync", this.render)
	},
	
	render: function(){
		var renderedContent = this.template({
			boats: this.collection
		});
		
			debugger
		this.$el.html(renderedContent);
		return this;
	}
});