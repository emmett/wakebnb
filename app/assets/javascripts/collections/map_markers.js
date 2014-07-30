WAKEbnb.Collections.MapMarkers = Backbone.Collection.extend({
	initialize: function(options){
		this.listenTo(this, 'all', this.updateEvents)
			this._draggable = options.draggable
		this.dropPin = options.dropPin
	},
	
	updateEvents: function (){
		var that = this;
		
		this.each( function(marker){
			google.maps.listenTo(marker, 'dragend', function(e){
				that.trigger('dragend', e);
			});
		})
	},
	
	draggable: function() {
		return this._draggable
	}
})