WAKEbnb.Views.ProfileShow = Backbone.CompositeView.extend({
	template: JST["profiles/show"],
	
	_requireUser: function(){
		if (!CURRENT_USER_ID){
			showLogin();
		}
	},


	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
		
		this.listenTo(this.model.reservations(), 'add', this.addReservationView)
		this.model.reservations().each(this.addReservationView.bind(this))
		
		this.listenTo(this.model.reservationRequests(), 'add', this.addReservationRequestView)
		this.model.reservationRequests().each(this.addReservationRequestView.bind(this))
	},
	
	
	
	render: function() {
		this._requireUser();
		
		var renderedContent = this.template({
			profile: this.model
		});
		
		if (CURRENT_USER_ID == this.model.get('id')) {
			this.$el.html(renderedContent);	
			this.attachSubviews();
			return this;
	
		} else {
			Backbone.history.navigate("#/profiles/"+CURRENT_USER_ID, { trigger: true });
		}
		
		
	},
	
	addReservationView: function (reservation){
		var reservationShowView = new WAKEbnb.Views.ReservationShow({
			model: reservation
		})
		
		this.addSubview(".reservations", reservationShowView);
		this.listenTo(reservationShowView, "remove", this.removeSubview.bind(this, ".reservations"))
	},
	
	addReservationRequestView: function (reservation){
		var reservationRequestShowView = new WAKEbnb.Views.ReservationRequestShow({
			model: reservation
		})
		
		this.addSubview(".reservations-requests", reservationRequestShowView);
		this.listenTo(reservationRequestShowView, "remove", this.removeSubview.bind(this, ".reservations"))
	}
})