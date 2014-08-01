WAKEbnb.Views.BoatsIndex = Backbone.CompositeView.extend({
	className: "boats-index col-sm-6 col-xs-offset-8",
	template: JST["boats/index"],
	
	events: {
		"click .boat-profile": "gotoBoat"
	},
	
	gotoBoat: function(event){
		event.preventDefault();
		var id = event.currentTarget.getAttribute('data-id');
		Backbone.history.navigate("#/boats/" + id, { trigger: true });
	},
	
	initialize: function () {
		this.listenTo(this.collection, 'sync', this.render)
		this.listenTo(this.collection, 'add', this.addBoatView)
		this.listenTo(this.collection, 'reset', this.resetBoatView)
		this.collection.each(this.addBoatView.bind(this))
	},
	
	render: function(){
		WAKEbnb.mapView.deleteMarkers()
		var renderedContent = this.template();
		
		this.$el.html(renderedContent);
		this.attachSubviews();
		return this;
	},
	
	addBoatView: function(boat){
		var boatCardView = new WAKEbnb.Views.BoatsCardShow({
			model: boat
		})
		
		this.addSubview(".boats-list", boatCardView);
		this.listenTo(boatCardView, "remove", this.removeBoatView)
	},
	
	removeBoatView: function(boatCardView) {
		boatCardView.addClass("fadeOut")
		this.removeSubview(".boats-list", boatCardView)
	},
	
	resetBoatView: function () {
		var that = this;
		this.$('.boats-list').empty();
		_(this.subviews('.boats-list')).each(function(subview){
			subview.remove();
		});
		this._subviews['.boats-list'] = [];
		this.collection.each(function(boat) { that.addBoatView(boat) })
		this.render();
	},
	
});