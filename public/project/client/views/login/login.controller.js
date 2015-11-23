(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("LoginController", LoginController);
	    
    function LoginController($scope, $rootScope, $location, UserService) {	
	  	$scope.$location = $location
		var model = this;
		model.login = login;
	  	  
	    
		function login(username, userPassword) {
			UserService.findUserByUsernameAndPassword(username, userPassword).then(function(response){
				$rootScope.user = response; 
				console.log("user login");
				console.log(response);
				$location.path("/question");
				
			});
	/*		if (possibleUser != null) {
				$rootScope.user = possibleUser
				console.log("login")
				$location.path("/profile")
			} else {console.log("login not valid")	
			}  */
		} 
	}   
	
}) ();

