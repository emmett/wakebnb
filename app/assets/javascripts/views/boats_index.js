WAKEbnb.Views.BoatsIndex = Backbone.CompositeView.extend({
	template: JST["boats/index"],
	
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