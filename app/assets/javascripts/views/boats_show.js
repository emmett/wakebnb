WAKEbnb.Views.BoatsShow = Backbone.View.extend({
	template: JST["boats/show"],
	
	events: {
		"click #reserve-btn": "reserveBoat"
	},
	
	_requireUser: function() {
		if (!CURRENT_USER_ID){
			showLogin();
		}
	},
	
	reserveBoat: function(event){
		event.preventDefault();
		this._requireUser();
		var view = this;
		
		if(CURRENT_USER_ID){
			
			var start = $('#start').val();
			var end = $('#end').val();
			debugger
			var reservation = new WAKEbnb.Models.Reservation({
				boat_id: this.model.id,
				start_date: new Date(start), 
				end_date: new Date(end), 
				user_id: parseInt(CURRENT_USER_ID),
				status: "Pending"
			});
			
			reservation.save({}, {
				success: function() {
					view.model.reservations().add(reservation)
					view.render();
				}
			})
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
		
		this.initializeDatePicker();
		
		return this;	
	},
	
	initializeDatePicker: function(){
		
		var unavailable = this.model.blackout()
	
	
		$('.input-daterange').datepicker({ 
			keyboardNavigation: false, 
			startDate: "today",
			beforeShowDay: function (date){ return ($.inArray(date.getTime(), unavailable) < 0) } 
		});
		
		
		$('#start').on('changeDate', function(e){ 
			$('#end').datepicker('setStartDate', e.date); 
		}); 
		
		$('#end').on('changeDate', function(e){ 
			$('#start').datepicker('setEndDate', e.date); 
		}); 
		
		$('#end').on('clearDate', function(e){ 
			$('#start').datepicker('setEndDate', null ); 
		}); 
	}
	
})