WAKEbnb.Views.BoatsCardShow = Backbone.View.extend({
	className: "col-lg-4 col-md-6 col-sm-12 container boat-profile",
	template: JST["boats/card"],
	
	attributes: function(){
		return 		{ "data-id": this.model.id };
	},
	
	_requireUser: function() {
		if (!CURRENT_USER_ID){
			showLogin();
		}
	},

	initialize: function() {
		this.listenTo(this.model, "sync", this.render);	
	},
	
	render: function () {
		var renderedContent = this.template({
			boat: this.model
		});
		
		WAKEbnb.map.addMarker(new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude')))
		this.$el.html(renderedContent);
		
		this.initializeDatePicker();
		
		return this;	
	},
	
	initializeDatePicker: function(){
		
		var unavailable = this.model.blackout()
	
	
		$('.input-daterange').datepicker({ 
			mindate: new Date(),
			clearBtn: true,
			keyboardNavigation: false, 
			startDate: "today",
			beforeShowDay: function (date){ return ($.inArray(date.getTime(), unavailable) < 0) } 
		});
		

		$('#start').on('changeDate', function(e){
			$('#end').datepicker('setStartDate', e.date)
			var endDate = null
			if (e.date) {
				unavailable.forEach(function(element){
					if (element > e.date.getTime()){
						endDate = new Date(element)
					}
				});
			}
			$('#end').datepicker('setEndDate',endDate);
		}); 
		
		$('#end').on('changeDate', function(e){ 
			$('#start').datepicker('setEndDate', e.date);
			var startDate = null 
			if (e.date){
				unavailable.reverse().forEach(function(element){
					if (element < e.date.getTime()) {
						startDate = new Date(element)
					}	
				});
			}
			$('#start').datepicker('setStartDate', startDate);			
		}); 
		
		$('#end').on('clearDate', function(e){ 
			$('#start').datepicker('setEndDate', null );
		});
		$('#start').on('clearDate', function(e){ 
			$('#end').datepicker('setStartDate', null );
		});
	}
})
