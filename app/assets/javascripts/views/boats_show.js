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
		var view              = this;
		
		if(CURRENT_USER_ID){
			
			var start            = $('#start').val();
			var end              = $('#end').val();
			
			var unavailable      = this.model.blackout();
			
			var reservation      = new WAKEbnb.Models.Reservation({
				boat_id: this.model.id,
				start_date: new Date(start), 
				end_date: new Date(end), 
				user_id: parseInt(CURRENT_USER_ID)
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
		var renderedContent   = this.template({
			boat: this.model
		});
		this.$el.html(renderedContent);
		
		this.initializeDatePicker();
		
		return this;	
	},
	
	initializeDatePicker: function(){
		
		var unavailable       = this.model.blackout()
	
	
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
						endDate =  new Date(element)
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
