(function() {
	"use strict";
	angular
		.module("FormBuilderApp")
		.controller("LoginController", LoginController);
	    
    function LoginController($scope, $rootScope, $location, UserService) {	
	 	 $scope.$location = $location
	 // $scope.login = login;
	  
	  var model = this;
	  model.login = login;
		   
	  
		function login(userName, userPassword) {
			UserService.findUserByUsernameAndPassword(userName, userPassword).then(function(response){
				if(response == null) {
					alert("invalid username / password combination");
				} else {
					$rootScope.user = response; 
					$location.path("/profile");
				}	
			});
		}	   
		   
	}
	
}) ();

