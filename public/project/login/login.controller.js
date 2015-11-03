(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("LoginController", LoginController);
	    
    function LoginController($scope, $rootScope, $location, UserService) {	
	  $scope.$location = $location
//	  $scope.login = login;
	  	  
			
	  function callback(value) {
            console.log(value);
        }
	  
	  
/*		function login() {
			var possibleUser = UserService.findUserByUsernameAndPassword($scope.userName, $scope.userPassword, callback)
			if (possibleUser != null) {
				$rootScope.user = possibleUser
				console.log("login")
				$location.path("/profile")
			} else {console.log("login not valid")	
			}
		} */
	}   
	
}) ();

