WAKEbnb.Views.SplashShow = Backbone.View.extend({
	template: JST["splash/show"],
	
	
	render: function() {
		var renderedContent = this.template({
			profile: this.model
		});
		
		this.$el.html(renderedContent);
		return this;
	}
})