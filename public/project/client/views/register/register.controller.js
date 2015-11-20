(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("RegisterController", RegisterController);
	    
    function RegisterController($scope, $rootScope, $location, UserService) {
		$scope.$location = $location
		var model = this;
		model.register = register;
	  
	  
		function register(username, userEmail, userPassword) {
			var newUser = {
				"username" : username,
				"password"  : userPassword,
				"email"  : userEmail,
			}; 
			UserService.createUser(newUser).then(function(response){
				$rootScope.user = response;
				$location.path("/profile");
		});
		}
	}
	
}) ();

