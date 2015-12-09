(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("LoginController", LoginController);
	    
    function LoginController($scope, $rootScope, $location, UserService) {	
	  	$scope.$location = $location
		var model = this;
		model.login = login;
		model.googleLogin = googleLogin;
		
			
		function googleLogin(){
			UserService.findGoogleUser().then(function(response){
				console.log("getting googleuser in login controller");
				console.log(response);
				$rootScope.user = response;
			})
		};
			
		function login(username, userPassword) {
			UserService.findUserByUsernameAndPassword(username, userPassword).then(function(response){
				if(response == null) {
					model.loginMessage = "-- Invalid username/password combination. Please try again. --"
					//alert("-- Invalid username / password combination. Please try again. --");
				} else {
					$rootScope.user = response; 
					console.log("user login");
					console.log(response);
					$location.path("/question");
				}
			});
		}   
	}   
	
}) ();

