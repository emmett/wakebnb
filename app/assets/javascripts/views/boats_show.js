WAKEbnb.Views.BoatsShow = Backbone.View.extend({
	template: JST["boats/show"],
	
	events: {
		"click #reserve-btn": "reserveBoat"
	},
	
	_requireUser: function(){
		if (!CURRENT_USER_ID){
			showLogin();
		}
	},
	
	reserveBoat: function(event){
		event.preventDefault();
		this._requireUser();
		
		if(CURRENT_USER_ID){
			var start = Date.parse($('#start').val());
			var end = Date.parse($('#end').val());
			
			console.log(start);
			console.log(end);
			console.log(this.model)
			
			var formData = $(event.currentTarget).serializeJSON();
		}
	},
	
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