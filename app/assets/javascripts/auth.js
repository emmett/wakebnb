$(function(){
	if (!CURRENT_USER_ID){
		$('#navbar-buttons').html('<button class="btn btn-primary navbar-btn navbar-right" id="login-btn">Log In</button>')
		$('#navbar-buttons').append('<button class="btn btn-success navbar-btn navbar-right" id="signup-btn">Sign Up</button>')
	} else {
		$('#navbar-buttons').html('<button class="btn btn-primary navbar-btn navbar-right" id="logout-btn">Logout</button>')	
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
				$('#navbar-buttons').html('<button class="btn btn-primary navbar-btn navbar-right" id="logout-btn">Logout</button>')	
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
					$('#navbar-buttons').html('<button class="btn btn-primary navbar-btn navbar-right" id="logout-btn">Logout</button>')	
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
				$('#navbar-buttons').html('<button class="btn btn-primary navbar-btn navbar-right" id="login-btn">Log In</button>')
				$('#navbar-buttons').append('<button class="btn btn-success navbar-btn navbar-right" id="signup-btn">Sign Up</button>')
			}
		})
	})
	
	$('#navbar-buttons').on('click', '#login-btn', function(){ showLogin() })
	$('#navbar-buttons').on('click', '#signup-btn', function(){ $('#signup-modal').modal('show')})
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