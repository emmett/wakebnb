$(function(){
	if (!CURRENT_USER_ID){
		loggedOutBtns()
	} else {
		signedInBtns()
	}
			
	$('#signin-form').on('submit', function(event){
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		$.ajax( {
			url: "session",
			type: "post",
			data: formData, 
			success: function(data){
				CURRENT_USER_ID = data.id;	
				signedInBtns();
				hideLogin();
			}
		})
	})
	
	$('#signup-form').on('submit', function(event){
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		$.ajax( {
			url: "users",
			type: "post",
			data: formData, 
			success: function(data){
				CURRENT_USER_ID = data.id;
				signedInBtns();
				hideSignup();		
			}
		})
	})
	
	$('#navbar-buttons').on('click', '#logout-btn', function(){
		event.preventDefault(); 
		$.ajax({ 
			url:"session", 
			type:"delete", 
			success: function(){
				CURRENT_USER_ID = "";
				loggedOutBtns()
			}
		})
	})
	
	$('#navbar-buttons').on('click', '#new-boat', function(){ 
		Backbone.history.navigate("/boats/new", { trigger: true })
	})
	
	$('#navbar-buttons').on('click', '#login-btn', function(){ showLogin() })
	$('#navbar-buttons').on('click', '#signup-btn', function(){ $('#signup-modal').modal('show')})
	$('#navbar-buttons').on('click', '#profile', function(){ Backbone.history.navigate("#/profiles/"+CURRENT_USER_ID, { trigger: true }) })
	
})

var showLogin = function () {
	$('#login-modal').modal('show')
}

var hideLogin = function () {
	$('#login-modal').modal('hide')
}

var hideSignup = function () {
	$('#signup-modal').modal('hide')
}

var signedInBtns = function (){
	$('#navbar-buttons').html('<button class="btn btn-primary navbar-btn navbar-right" id="logout-btn"><span class="glyphicon glyphicon-log-out"></span></button> ')	
	$('#navbar-buttons').append('<button class="btn btn-success navbar-btn navbar-right" id="new-boat"><span class="glyphicon glyphicon-plus"></span> Boat</button> ')
	$('#navbar-buttons').append('<button class="btn btn-primary navbar-btn navbar-right" id="profile"><span class="glyphicon glyphicon-inbox"></span> Requests</button> ')
	$('#navbar-buttons').append('<span class="btn btn-default navbar-btn navbar-right" id="profile"><span class="glyphicon glyphicon-user"></span> ' + CURRENT_USER_NAME+'</button> ')
}

var loggedOutBtns = function (){
	$('#navbar-buttons').html('<button class="btn btn-primary navbar-btn navbar-right" id="login-btn"><span class="glyphicon glyphicon-log-in"></span></button>')
	$('#navbar-buttons').append('<button class="btn btn-success navbar-btn navbar-right" id="signup-btn"><span class="glyphicon glyphicon-edit"></span></button>')
}