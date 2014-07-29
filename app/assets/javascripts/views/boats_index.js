WAKEbnb.Views.BoatsIndex = Backbone.CompositeView.extend({
	className: "boats col-md-6",
	template: JST["boats/index"],
	
	events: {
		"click .boat-profile": "gotoBoat"
	},
	
	gotoBoat: function(event){
		event.preventDefault();
		console.log($('event.currentTarget'))
	
		Backbone.history.navigate("/boats/" + this.model.get('id'), { trigger: true });
	},
	
	initialize: function () {
		this.listenTo(this.collection, 'sync', this.render)
		this.listenTo(this.collection, 'add', this.addBoatView)
		this.collection.each(this.addBoatView.bind(this))
	},
	
	render: function(){
		var renderedContent = this.template({
			boats: this.collection
		});
		
		this.$el.html(renderedContent);
		this.attachSubviews();
		return this;
	},
	
	addBoatView: function(boat){
		var boatCardView = new WAKEbnb.Views.BoatsCardShow({
			model: boat
		})
		
		this.addSubview(".boats-list", boatCardView);
		this.listenTo(boatCardView, "remove", this.removeSubview.bind(this, ".boats-list"))
	}
});